module.exports = function(io, nconf){

    var firebase = require('./../firebase.db.js')(nconf),
        wrap = require('./../wrapjsonresponse.js'),
        rooms = {
            _collection : [],

            bindChanges: function(){
                var me = this;
                if(!io._collection) {

                    io._collection = firebase.child('/feedback');

                    io._collection.on('child_added', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/feedback').emit('child_added', wrap(data));
                        }
                    });
                    io._collection.on('child_removed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/feedback').emit('child_removed',wrap(data));
                        }
                    });
                    io._collection.on('child_changed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/feedback').emit('child_changed', wrap(data));
                        }
                    });
                    io._collection.on('child_moved', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/feedback').emit('child_moved', wrap(data));
                        }
                    });
                }
            },

            read: function(config,callback){
                firebase.child('feedback/').once('value', function(childSnapshot, prevChildName) {
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
                        firebase.child('feedback/' + item.id).update(item, function(err){
                            if(err){
                                callback(err,null);
                            }else{
                                callback(null,[item.records]);
                            }
                        });

                    });
                }else{
                    firebase.child('feedback/' + config.records.id).update(config.records, function(err){
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
                        firebase.child('feedback/' + item.id).update(item, function(err){
                            if(err){
                                callback(err,null);
                            }else{
                                callback(null,[item.records]);
                            }
                        });
                    });
                }else{
                    if (!!config.records.id) {
                        firebase.child('feedback/' + config.records.id).update(config.records, function (err) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, [config.records]);
                            }
                        });
                    }
                }
            },

            delete: function(config,callback){
                var me = this,
                    records = config.records;

                console.log('DELETE ROOM');
                callback(null,null);
                return;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('feedback/' + item.id).remove(function(err){
                            if(err){
                                callback(err,null);
                            }else{
                                callback(null,item);
                            }
                        });

                    });
                }else {
                   if (!!config.records.id) {
                        firebase.child('feedback/' + config.records.id).remove(function (err) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, records);
                            }
                        });
                   }
                }
            }
        };

    return rooms;
};