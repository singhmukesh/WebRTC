module.exports = function(io, nconf, firebase) {

    var collection,
        // DB = require('./securityroles.db.js')(io, nconf,firebase),
        wrap = require('./../wrapjsonresponse.js');


    collection = io.of('/navigation');


    collection.on('connection', function(socket) {

        socket.on('read', function(config,callback) {

            //try hardcoded to match working AJAX
            var data = {
                expanded: true,
                children:[{
                    text: 'User',
                    iconCls: 'x-fa fa-user',
                    viewType: 'settingsuser',
                    routeId: 'user',
                    leaf: true
                },
                {
                    text: 'Chat Rooms',
                    iconCls: 'x-fa fa-comments',
                    viewType: 'chatroomcontainer',
                    routeId: 'room',
                    isHidden: true,
                    leaf: true
                    }]
            };
            callback(null,true, data );  //options, success, response



            /*
            //once a read is started we can bind changes to push to it.
            DB.bindChanges(io,config, socket);

            DB.read(config,function(err, data) {
                if (err) throw err;
                callback(null,true, wrap(data) );  //options, success, response
            });
            */
        });

        socket.on('update', function(config,callback) {
            DB.update(config,function(err, data) {
                if (err) throw err;
                callback(null,true, wrap(data));
            });
        });

      /*
      socket.on('create', function(config,callback) {
            DB.create(config,function(err, data) {
                if (err) throw err;
                callback(null,true, wrap(data) );
            });
        });


        socket.on('destroy', function(config,callback) {
            DB.delete(config,function(err, data) {
                if (err) throw err;
                callback(null,true, wrap(data));
            });
        });
        */

    });


    return collection;

};