module.exports = function(io, nconf) {

    var DB = require('./roommembers.db.js')(io, nconf),
        wrap = require('./../wrapjsonresponse.js'),
        collection;

    collection = io.of('/roommembers');

    //handle incoming requests
    collection.on('connection', function(socket) {

        socket.on('read', function(config,callback) {

            //once a read is started we can bind changes to push to it.
            DB.bindChanges(io,config, socket);

            DB.read(config,function(err, data) {
                if (err) throw err;
                callback(null,true, wrap(data) );  //options, success, response
            });
        });

        socket.on('create', function(config,callback) {
            DB.create(config,function(err, data) {
                if (err) throw err;
                callback(null,true, wrap(data) );
            });
        });

        socket.on('update', function(config,callback) {
            DB.update(config,function(err, data) {
                if (err) throw err;
                callback(null,true, wrap(data));
            });
        });

        socket.on('destroy', function(config,callback) {
            DB.delete(config,function(err, data) {
                if (err) throw err;
                callback(null,true, wrap(data));
            });
        });

        socket.on('disconnect', function(event) {
            DB.onMemberDisconnect(socket,event);
        });

    });


    return collection;

};