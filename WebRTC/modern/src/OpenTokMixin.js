Ext.define('WebRTC.OpenTokMixin', {
    extend: 'Ext.Mixin',
    mixinConfig: {
        id: 'opentok',
        after: {
            destroy: 'clearListeners'
        }
    },


    getRoomBySessionId: function(sessionId){
        var room = this.getView().child('chatroom[sessionId="' + sessionId + '"]');
        return room;
    },

    getSafeStreamCmpId:function(streamId){
        return 'stream' + streamId.replace(/-/g,'');
    },

    onOTConnectionCreated: function(event, session){
        var data = event.connection.data,
            sessionId = session.sessionId,
            room = this.getRoomBySessionId(sessionId),
            chunks = data.split('='),
            name = chunks[1];

        if(room){
            var member = Ext.create('WebRTC.model.chat.RoomMember',{
                name: name,
                id: event.connection.connectionId
            });

            room.getController().roomMemberAdd(member);
        }
    },

    onOTConnectionDestroyed: function(event, session){      
        var id = event.connection.connectionId,
            sessionId = session.sessionId,
            room = this.getRoomBySessionId(sessionId);

        room.getController().roomMemberRemove(id);
    },



    onOTStreamCreated: function (event, session) {
        var OT = WebRTC.app.getController('WebRTC.controller.OpenTok'),
            sessionId = session.sessionId,
            session = OT.getSessionById(sessionId),
            room = this.getRoomBySessionId(sessionId),
            remotestreams = room.down('#remotestreams'),
            them = room.down('#them');

        if(remotestreams.isHidden()){
            remotestreams.show()
        }

        var newly = remotestreams.add({
            xtype: 'panel',
            bodyPadding: 3,
            itemId: this.getSafeStreamCmpId(event.stream.streamId),
            html:'<div id="' + event.stream.streamId + '"></div>',
            flex: 1,
            height: 250,
            width: 400
            // minHeight: 250,
            // maxWidth: 400
        });

        var subscription = session.subscribe(event.stream, event.stream.streamId , {
            /// insertMode: 'append',
            style: {
                audioLevelDisplayMode: 'auto'
                //   backgroundImageURI : '/resources/images/BlankAvatar.png'
            },
            fitMode:'contain',
            width: '100%',
            height: 250,
            showControls: true
        });

        // put all the subsriptions into an array for us to walk-through and manipulate if needed
        // for example when changing rooms, mute all...
        session.localSubscriptions.push(subscription);


    },

    onOTStreamDestroyed: function (event, session) {
        var OT = WebRTC.app.getController('WebRTC.controller.OpenTok'),
            sessionId = session.sessionId,
            session = OT.getSessionById(sessionId),
            deadCmp = this.getView().down('#' + this.getSafeStreamCmpId(event.stream.streamId)),
            room = this.getRoomBySessionId(sessionId),
            remotestreams =  this.getView().down('#remotestreams');

        if(deadCmp){
            deadCmp.destroy();
            if(!remotestreams.items.length){
                remotestreams.hide();
            }
        }

        // find the subscription and remove it.
        var index = session.localSubscriptions.map(function(e) { return e.id; }).indexOf(event.stream.streamId);
        if(index || index == 0 ){
            session.localSubscriptions.splice(index, 1);
        }
    },


    onOTSessionConnected: function(event){},

    onOTSessionDestroyed: function(event, session){
        var type = event.type,
            sessionId = session.sessionId;

        if(type == 'sessionDisconnected'){
            var room = this.getRoomBySessionId(sessionId);

            if(room){
                room.getController().roomMemberRemove(id);
            }

            if (event.reason == "networkDisconnected") {
                Ext.toast({
                    html: 'Your network connection terminated.',
                    title: 'Offline',
                    width: 400,
                    align: 't'
                });
            }
        }

    },

    onOTChatReceived: function(event, session){
        var sessionId = session.sessionId,
            room = this.getRoomBySessionId(sessionId);
        room.getController().chatReceived(event.data.chat);
    }

});