Ext.define('opentok.OpenTokMixin', {
    extend: 'Ext.Mixin',
    mixinConfig: {
        id: 'opentok',
        after: {
            destroy: 'clearListeners'
        }
    },

    getRoomBySessionId: function(sessionId){
        var roomtabs = Ext.first('[reference=roomtabs]'),
            tab = roomtabs.child('chatroom[sessionId="' + sessionId + '"]');

        return tab;
    },

    getSafeStreamCmpId:function(streamId){
        return 'stream' + streamId.replace(/-/g,'');
    },

    onOTConnectionCreated: function(event){
        var data = event.connection.data,
            sessionId = event.target.sessionId,
            tab = this.getRoomBySessionId(sessionId),
            chunks = data.split('='),
            name = chunks[1];

        if(tab){

            var member = Ext.create('WebRTC.model.chat.RoomMember',{
                name: name,
                user_id: event.connection.connectionId,
                id: event.connection.connectionId
            });

           tab.getController().roomMemberAdd(member);
        }
    },

    onOTConnectionDestroyed: function(event){
        var id = event.connection.connectionId,
            tab = this.getRoomBySessionId(event.target.sessionId);

        tab.getController().roomMemberRemove(id);
    },



    onOTStreamCreated: function (event) {
          var OT = WebRTC.app.getController('opentok.controller.OpenTok'),
            session = OT.getSessionById(event.target.sessionId),
            tab = this.getRoomBySessionId(event.target.sessionId),
            // view = this.getView(),
            them = tab.down('#them'),
            streamUser = event.stream.connection.data.split('=')[1],
            remotestreams;

        tab.getController().switchToVideoMeetingLayout(true);
        remotestreams = tab.getRemoteStreams();

        if(Ext.first('[reference=roomtabs]').items.items[0].sessionId == tab.sessionId ){
            if( tab.getViewModel().get('showStreams') ){
                tab.getViewModel().set('isStreams',true);

                remotestreams.show()
            }
        }

        var newly = remotestreams.add({
            xtype: 'panel',
            connectionId: event.stream.connection.connectionId,
            username: streamUser,
            itemId: this.getSafeStreamCmpId(event.stream.id),
            html:'<div id="' + event.stream.id + '"></div>',
            width: 200,
            height: 200,
            margin: 10
        });

        var subscription = session.subscribe(event.stream, event.stream.id , {
            //insertMode: 'append',
            style: {
                audioLevelDisplayMode: 'auto'
            },
            // fitMode:'contain',
            width: '100%',
            height: '100%',
            showControls: true
        });

        // put all the subsriptions into an array for us to walk-through and manipulate if needed
        // for example when changing rooms, mute all...
        session.localSubscriptions.push(subscription);


    },

    onOTStreamDestroyed: function (event) {
        var OT = WebRTC.app.getController('opentok.controller.OpenTok'),
            session = OT.getSessionById(event.target.sessionId),
            deadCmp = this.getView().down('#' + this.getSafeStreamCmpId(event.stream.id)),
            tab = this.getRoomBySessionId(event.target.sessionId),
            viewModel = tab.getViewModel(),
            // view = this.getView(),
            remotestreams = tab.getRemoteStreams();

        // console.log(deadCmp);

        if(  Ext.first('[reference=roomtabs]').items.items[0].sessionId == tab.sessionId ){
            if(deadCmp){
                deadCmp.destroy();

                if(!remotestreams.items.length){
                    viewModel.set('isStreams',false);
                    remotestreams.hide();

                    if(!viewModel.get('inVideoCall')) {
                        tab.getController().switchToVideoMeetingLayout(false);
                    }
                }
            }
        }

        // find the subscription and remove it.
        var index = session.localSubscriptions.map(function(e) { return e.id; }).indexOf(event.stream.id);
        if(index || index == 0 ){
            session.localSubscriptions.splice(index, 1);
        }
    },


    onOTSessionConnected: function(event){},

    onOTSessionDestroyed: function(event){
        var type = event.type;

        if(type == 'sessionDisconnected'){
            var tab = this.getRoomBySessionId(event.target.sessionId);

            if(tab){
                tab.getController().roomMemberRemove(id);
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


    onOTChatReceived: function(event){
        var tab = this.getRoomBySessionId(event.target.sessionId);

        tab.getController().chatReceived(event.data.chat);
    },

    onOTAudioLevelUpdate: function(session, audioLevel){
        var me = this,
            sessionId = session.id,
            tab = this.getRoomBySessionId(sessionId);

        if(tab){
            tab.getController().updateAudioLevel(audioLevel);
        }
    }
});