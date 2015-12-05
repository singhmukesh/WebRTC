Ext.define('videochat.view.chat.room.RoomController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroom',

    unread: 0,

    listen: {
        /*
         * Any controller that fires authorize needs us to handle it and then run the next steps
         * passed in to the request.
         */
        controller: {
            'auth': {
                visibilityChanged: 'onVisibilityChanged'
            }
        }
    },

    init: function(){
        this.user = Ext.decode(Ext.util.Cookies.get('user'));
    },

    roomMemberAdd: function(member){
       // var store = this.getViewModel().getStore('members');
       // store.add(member);

       this.fireEvent('playsound','enter-sound');
    },

    roomMemberRemove: function(id){
        var store = this.getViewModel().getStore('members'),
            idx = store.find('id',id);

        if(idx >= 0){
            // store.removeAt(idx);
            this.fireEvent('playsound','leave-sound');
        }

    },


    chatReceived: function(chat){
        var me = this,
            list = this.getView().down('dataview[reference=historylist]'),
            store = this.getViewModel().getStore('messages');

        store.add(chat);

        if(list){
            list.scrollBy(0, 999999, true);
        }

        me.unread++;
        me.setUnreadTitle();

        this.fireEvent('playsound','chat-sound');
    },

    onVisibilityChanged: function(){
        var me=this;
        if(!document.hidden) {
            me.unread = 0;
        }
        me.setUnreadTitle();
    },

    setUnreadTitle: function(){
        var me=this;
        if(!me.orginalTitle){
            me.orginalTitle = window.document.title;
        }
        if( document.hidden && me.unread != 0  ){
            window.document.title = '(' + me.unread + ') Unread Chat | ' + me.orginalTitle;
        }else{
            window.document.title = me.orginalTitle;
        }
    },


    onAudioCallRoom: function(button){
        var me=this,
            view = me.getView(),
            videoBox = view.getVideoBox(),
            auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( !this.getViewModel().get('inAudioCall') ){
            this.getViewModel().set('inAudioCall', true);
            this.getViewModel().set('showingCamera', false);
            this.setMemberCallStatus({callStatus:'audio'});
            auth.setPresenseStatus({
                status: 'busy',
                statusOrder: 60,
                lastActivity: null
            });
            this.fireEvent('callroom', {sessionId: sessionId, element: videoBox.id, video: false} );
        }else{
            this.onEndAudioCall(button);
        }

    },

    onVideoCallRoom: function(button){
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            videoConnections = viewModel.get('videoConnections'),
            auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            sessionId = viewModel.get('room').get('sessionId'),
            inVideoCall = viewModel.get('inVideoCall'),
            enableVideoCall = !inVideoCall,
            videoBox, streams;

        // Update the number of enabled video connections
        videoConnections += enableVideoCall ? 1 : -1;
        viewModel.set('videoConnections', videoConnections);

        //<debug>
        console.log('- Video Connections: ', videoConnections);
        //</debug>

        if(enableVideoCall){

            me.switchToVideoMeetingLayout(true);

            videoBox = view.getVideoBox();
            streams = view.getRemoteStreams();

            viewModel.set('inVideoCall', true);
            viewModel.set('showingCamera', true);


            me.setMemberCallStatus({callStatus:'video'});


           auth.setPresenseStatus({
                status: 'busy',
                statusOrder: 60,
                lastActivity: null
            });


            // Show the streams only if there is more than one video connection
            if(videoConnections > 1){
                streams.show();
            }

            me.fireEvent('callroom',  {sessionId: sessionId, element: videoBox.id, video: true });

        }
        else {
            me.onEndVideoCall(button);
        }

        if(videoBox) {
            videoBox[!inVideoCall ? 'show' : 'hide']();
        }

    },

    onEndAudioCall: function(button){
        var me=this,
            view = me.getView(),
            videoBox = view.getVideoBox(),
            auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            sessionId = this.getViewModel().get('room.sessionId');

        this.getViewModel().set('inAudioCall', false);
        this.getViewModel().set('useCamera', true);
        this.getViewModel().set('useMic',true);

        this.setMemberCallStatus({
            callStatus:'idle',
            micStatus:''
        });

        // this.setMemberCallStatus({micStatus:''});

        auth.setPresenseStatus({
            status: 'online',
            statusOrder: 100,
            lastActivity: null
        });

        this.fireEvent('endcall', sessionId, videoBox.id );

    },

    onEndVideoCall: function(button){
        var me = this,
            view = me.getView(),
            videoBox = view.getVideoBox(),
            viewModel = me.getViewModel(),
            auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            sessionId = viewModel.get('room.sessionId'),
            isVideoLayout = viewModel.get('isVideoLayout'),
            videoConnections = viewModel.get('videoConnections'),
            imFullscreen = viewModel.get('imFullscreen'),
            streams = view.getRemoteStreams(),
            fullscreenBox, myVideoBox;

        viewModel.set('inVideoCall', false);
        viewModel.set('useCamera', true);
        viewModel.set('useMic', true);

        me.setMemberCallStatus({
            callStatus: 'idle',
            micStatus: ''
        });

        // this.setMemberCallStatus({micStatus:''});
        auth.setPresenseStatus({
            status: 'online',
            statusOrder: 100,
            lastActivity: null
        });

        if(videoConnections === 0){
            me.switchToVideoMeetingLayout(false);
        }
        else if(videoConnections === 1) {
            streams.hide();
        }

        /* If I was the fullscreen user I need to pick the first remote video box
         * from the streams container and make him fullscreen.
         * My video box will be then added to the streams container.
         */
        else if(imFullscreen && isVideoLayout){

            fullscreenBox = view.lookupReference('fullscreenvideobox');
            myVideoBox = view.getVideoBox();
            otherVideoBox = streams.query('container')[0];

            Ext.suspendLayouts();

            fullscreenBox.remove(myVideoBox, false);
            streams.add(myVideoBox);

            streams.remove(otherVideoBox, false);
            fullscreenBox.add(otherVideoBox);

            Ext.resumeLayouts();
            view.updateLayout();

            viewModel.set('imFullscreen', false);
        }

        me.fireEvent('endcall', sessionId, videoBox.id );
    },

    setMemberCallStatus: function(status){
        var auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            id = this.getViewModel().get('room')['id'],
            user = this.getViewModel().get('user');

        if(user){
            var userId = user['id'],
                membersRef = auth.firebaseRef.child('roommembers/' + id + '/' + userId);
            membersRef.update(status);
        }
    },

    onPublishAudioToggle: function(button){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( this.getViewModel().get('useMic') ){
            this.getViewModel().set('useMic',false);
            this.setMemberCallStatus({micStatus:'mute'});
            this.fireEvent('hidePublisherAudio', sessionId);
        }else{
            this.getViewModel().set('useMic',true);
            this.setMemberCallStatus({micStatus:''});
            this.fireEvent('showPublisherAudio', sessionId);
        }

    },

    onPublishVideoToggle: function(button){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( this.getViewModel().get('useCamera') ){
            this.getViewModel().set('useCamera',false);
            this.setMemberCallStatus({callStatus:'video-hide'});
            this.fireEvent('hidePublisherVideo', sessionId);
        }else{
            this.getViewModel().set('useCamera',true);
            this.setMemberCallStatus({callStatus:'video'});
            this.fireEvent('showPublisherVideo', sessionId);
        }

    },

    onShowSelfToggle: function(button){
        var me = this,
            viewModel = me.getViewModel(),
            view = me.getView(),
            you = view.getVideoBox(),
            showSelf = viewModel.get('showSelf');

        viewModel.set('showSelf', !showSelf);
        you[showSelf ? 'hide' : 'show']();
    },

    onVideoWallToggle: function(button){
        var you = this.lookupReference('videowall'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( this.getViewModel().get('showStreams') ){
            this.getViewModel().set('showStreams',false);
            // this.setMemberCallStatus({callStatus:'video-hide'});
            // this.fireEvent('hidePublisherVideo', sessionId);
        }else{
            this.getViewModel().set('showStreams',true);
            // this.setMemberCallStatus({callStatus:'video'});
            // this.fireEvent('showPublisherVideo', sessionId);
        }

    },

    onWallHide: function(button){
        this.getViewModel().set('showStreams',false);
    },

    onMessagesLoad: function(){
        this.fireEvent('playsound','chat-sound');
    },

    switchToVideoMeetingLayout: function(videoCallEnabled){
        var me = this,
            view = me.getView(),
            settings = Ext.getStore('Settings'),
            layout = settings.getById('videolayout').get('value'),
            speakerTask = me.currentSpeakerTask;

        if(!videoCallEnabled && speakerTask){
            Ext.TaskManager.stop(speakerTask);
        }

        if(layout === 'videofeeds'){
            view.setActiveItem(videoCallEnabled ? 1 : 0);

            if(videoCallEnabled) {
                me.currentSpeakerTask = Ext.TaskManager.start({
                    run: me.onUpdateCurrentSpeaker,
                    scope: me,
                    interval: 5000
                });
            }
        }
    },

    onUpdateCurrentSpeaker: function(){
        var me = this,
            user = me.user,
            view = me.getView(),
            viewModel = view.getViewModel(),
            videoConnections = viewModel.get('videoConnections'),
            imFullscreen = viewModel.get('imFullscreen'),
            tolerance = 0.4;

        /* If the user switch chat room the view is no longer available
         * so end its related current speaker task. */
        if(!view){
            Ext.TaskManager.stop(me.currentSpeakerTask);
            delete me.currentSpeakerTask;
            return false;
        }

        /* Proceed with the current speaker detection only if there are more
         * than a single video connections. */
        if(videoConnections > 1) {

            var myVideoBox = view.getVideoBox(),
                streams = view.getRemoteStreams(),
                speaker = me.getCurrentSpeaker(),
                speakerName = speaker.user.get('name'),
                fullscreenBox = me.lookupReference('fullscreenvideobox'),
                speakerBox = streams.down('container[username=' + speakerName + ']'),
                imFullscreen = speakerName === user.name,
                lastCurrentSpeaker = me.lastCurrentSpeaker,
                lastCurrentSpeakerBox;

            // If the Speaker Box was not found, it means I'm the speaker.
            viewModel.set('imFullscreen', imFullscreen);

            if(!speakerBox){
                speakerBox = myVideoBox;
            }

            if ((speaker.user !== lastCurrentSpeaker) && (speaker.audioLevel > tolerance)) {

                Ext.suspendLayouts();

                lastCurrentSpeakerBox = fullscreenBox.removeAll(false);
                if (lastCurrentSpeakerBox.length) {
                    streams.add(lastCurrentSpeakerBox[0]);
                }

                streams.remove(speakerBox, false);
                fullscreenBox.add(speakerBox);

                Ext.resumeLayouts();
                view.updateLayout();

                me.lastCurrentSpeaker = speaker.user;
            }

        }
    },

    updateAudioLevel: function(audioLevel){
        var me = this,
            viewModel = me.getViewModel(),
            user = viewModel.get('user'),
            userId = user.id,
            members = me.getStore('members'),
            record = members.getById(userId);

        if(record) {
            record.set('audio_level', audioLevel);
        }
    },

    getCurrentSpeaker: function(){
        var me = this,
            members = me.getStore('members'),
            records = members.getRange(),
            length = records.length,
            higherAudioLevel = -1,
            i = 0, speaker, user, audioLevel;

        for(; i< length; i++){
            user = records[i];
            audioLevel = user.get('audio_level');

            if(audioLevel > higherAudioLevel){
                speaker = user;
                higherAudioLevel = audioLevel;
            }
        }

        return {
            user: speaker,
            audioLevel: higherAudioLevel
        };
    }
});
