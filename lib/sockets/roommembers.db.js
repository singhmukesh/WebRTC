module.exports = function(io, nconf){

    var firebase = require('./../firebase.db.js')(nconf),
        wrap = require('./../wrapjsonresponse.js'),
        roommembers = {
            _roommembers: [],

            bindChanges: function(io, config, socket){
                var me = this,
                    room = config.params.room;

                socket.join(room);

                if(!io.roommembers[room]) {


                    io.roommembers[room] = firebase.child('roommembers/' + room);

                    io.roommembers[room].on('child_added', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();
                            io.of('/roommembers').to(room).emit('child_added', wrap(data));
                        }
                    });

                    io.roommembers[room].on('child_removed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();
                            io.of('/roommembers').to(room).emit('child_removed', wrap(data));
                        }
                    });

                    io.roommembers[room].on('child_changed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();
                            io.of('/roommembers').to(room).emit('child_changed', wrap(data));
                        }
                    });

                    io.roommembers[room].on('child_moved', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();
                            io.of('/roommembers').to(room).emit('child_moved', wrap(data));
                        }
                    });
                }
            },

            read: function(config,callback){
                var me = this;

                firebase.child('roommembers/' + config.params.room ).once('value', function(childSnapshot, prevChildName) {
                    if (childSnapshot.val() && childSnapshot.val() != undefined){
                        var data = childSnapshot.val(),
                            myarray = Object.keys(data).map(function(k) { return data[k] });
                        callback(null,myarray);
                    }else{
                        callback(null,[]);
                    }
                });

            },

            create: function(config,callback){
                var me = this,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('roommembers/' + config.params.room + '/' + item.id).update(item, function(err){
                            if(err){
                                callback(err,null);
                            }else{
                                callback(null,[item.records]);
                            }
                        });

                    });
                }else{
                    firebase.child('roommembers/' + config.params.room + '/' + config.records.id).update(config.records, function(err){
                        if(err){
                            callback(err,null);
                        }else{
                            callback(null, [config.records]);
                        }
                    });

                }

            },

            update: function(config,callback){
                var me = this,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('roommembers/' + config.params.room + '/' + item.id).update(item, function(err){
                            if(err){
                                callback(err,null);
                            }else{
                                callback(null,[item.records]);
                            }
                        });

                    });
                }else{
                    firebase.child('roommembers/' + config.params.room + '/' + config.records.id).update(config.records, function(err){
                        if(err){
                            callback(err,null);
                        }else{
                            callback(null, [config.records]);
                        }
                    });
                }
            },

            delete: function(config,callback){
                var me = this,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('roommembers/'  + config.params.room + '/' + item.id).remove(function(err){
                            if(err){
                                callback(err,null);
                            }else{
                                callback(null,item);
                            }
                        });

                    });
                }else{
                    if (!!config.params.room) {
                        firebase.child('roommembers/' + config.params.room + '/' + config.records.id).remove(function (err) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, records);
                            }
                        });
                    }
                }
            },

            onMemberDisconnect: function(socket, event) {
                console.log('Socket Disconnection:' + socket.id + ' remove roommember:');
                firebase.child('roommembers/').once('value', function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        // key will be "room"
                        var key = childSnapshot.key();
                        // childData will be the list of room members
                        var childData = childSnapshot.val();
                        if(childData){
                            for (i = 0; i < Object.keys(childData).length; i++) {
                                //for each room member see if the socket matches the disconnected one.
                                if(childData[Object.keys(childData)[i]]['socketId'] == socket.id){
                                    firebase.child('roommembers/' + key + '/' + Object.keys(childData)[0]).remove();
                                }
                            }

                        }
                    });
                });
            }
};

    return roommembers;

};