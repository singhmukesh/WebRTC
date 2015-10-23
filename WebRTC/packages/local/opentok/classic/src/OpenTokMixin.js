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
            viewModel = tab.getViewModel(),
            videoConnections = viewModel.get('videoConnections') + 1,
            isVideoLayout = viewModel.get('isVideoLayout'),
            inVideoCall = viewModel.get('inVideoCall'),
            imFullscreen = viewModel.get('imFullscreen'),
            streamUser = event.stream.connection.data.split('=')[1],
            remotestreams, myVideoBox, fullscreenBox, newly;

        tab.getController().switchToVideoMeetingLayout(true);
        remotestreams = tab.getRemoteStreams();
        myVideoBox = tab.getVideoBox();

        //<debug>
        console.log('- Video Connections: ', videoConnections);
        //</debug>

        newly = {
            xtype: 'panel',
            connectionId: event.stream.connection.connectionId,
            username: streamUser,
            isMyVideoBox: false,
            itemId: this.getSafeStreamCmpId(event.stream.id),
            html:'<div id="' + event.stream.id + '"></div>',
            width: 200,
            height: 200,
            margin: 10
        };

        if(!isVideoLayout) {
            if (Ext.first('[reference=roomtabs]').items.items[0].sessionId == tab.sessionId) {
                if (tab.getViewModel().get('showStreams')) {
                    tab.getViewModel().set('isStreams', true);

                    remotestreams.show()
                }
            }

            remotestreams.add(newly);
        }
        else {

            if(videoConnections > 1 || inVideoCall){
                remotestreams.show();
                remotestreams.add(newly);
            }
            else {
                /* We need to unplug my hidden video box from the fullscreen panel,
                 * add it to the remote streams and put this new incoming remote
                 * video feed as the fullscreen one. */
                fullscreenBox = tab.lookupReference('fullscreenvideobox');

                Ext.suspendLayouts();

                fullscreenBox.remove(myVideoBox, false);
                remotestreams.add(myVideoBox);

                fullscreenBox.add(newly);

                Ext.resumeLayouts();
                tab.updateLayout();

                viewModel.set('imFullscreen', false);
             }

        }

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

        // Update the number of Video Connections
        viewModel.set('videoConnections', videoConnections);
    },

    onOTStreamDestroyed: function (event) {
        var OT = WebRTC.app.getController('opentok.controller.OpenTok'),
            session = OT.getSessionById(event.target.sessionId),
            deadCmp = this.getView().down('#' + this.getSafeStreamCmpId(event.stream.id)),
            tab = this.getRoomBySessionId(event.target.sessionId),
            fullscreenBox = tab.lookupReference('fullscreenvideobox'),
            viewModel = tab.getViewModel(),
            videoConnections = viewModel.get('videoConnections') - 1,
            isVideoLayout = viewModel.get('isVideoLayout'),
            myVideoEnabled = viewModel.get('inVideoCall'),
            imFullscreen = viewModel.get('imFullscreen'),
            myVideoBox = tab.getVideoBox(),
            remotestreams = tab.getRemoteStreams(),
            fullscreenBox, otherVideoBox;

        //<debug>
        console.log('- Video Connections: ', videoConnections);
        //</debug>

        // console.log(deadCmp);

        if(Ext.first('[reference=roomtabs]').items.items[0].sessionId == tab.sessionId ){
            if(deadCmp){
                deadCmp.destroy();

                if(!remotestreams.items.length){
                    viewModel.set('isStreams',false);
                    remotestreams.hide();
                }
            }
        }


        // find the subscription and remove it.
        var index = session.localSubscriptions.map(function(e) { return e.id; }).indexOf(event.stream.id);
        if(index || index == 0 ){
            session.localSubscriptions.splice(index, 1);
        }

        // If there are no another  video connections switch back to the regular chat layout.
        if(videoConnections === 0) {
            tab.getController().switchToVideoMeetingLayout(false);
        }
        else if(videoConnections === 1) {
            if(isVideoLayout) {

                Ext.suspendLayouts();

                debugger;

                if (myVideoEnabled && !imFullscreen) {

                    // Set myself as fullscreen
                    remotestreams.remove(myVideoBox, false);
                    fullscreenBox.add(myVideoBox);

                }
                else if(!myVideoEnabled){

                    // Set the remaining user as fullscreen
                    otherVideoBox = remotestreams.query('container[isMyVideoBox=false]')[0];
                    remotestreams.remove(otherVideoBox, false);
                    fullscreenBox.add(otherVideoBox);

                }

                Ext.resumeLayouts();
                tab.updateLayout();
            }

            remotestreams.hide();
        }
        /* If there are still two or more video connections open, the video layout is active,
         * and there is no more a fullscreen user, let's pick the first remote video
         * available from the streams panel and set it as the fullscreen one. */
        else if (videoConnections > 1 && isVideoLayout){

            if(!fullscreenBox.items.length) {

                otherVideoBox = remotestreams.query('container[isMyVideoBox=false]')[0];

                Ext.suspendLayouts();

                remotestreams.remove(otherVideoBox, false);
                fullscreenBox.add(otherVideoBox);

                Ext.resumeLayouts();
                tab.updateLayout();
            }

        }

        // Update the number of Video Connections
        viewModel.set('videoConnections', videoConnections);
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