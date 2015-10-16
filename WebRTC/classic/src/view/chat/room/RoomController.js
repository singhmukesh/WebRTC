Ext.define('WebRTC.view.chat.room.RoomController', {
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
        var you = this.lookupReference('you'),
            auth = WebRTC.app.getController('Auth'),
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
            this.fireEvent('callroom', {sessionId: sessionId, element: you.id, video: false} );
        }else{
            this.onEndAudioCall(button);
        }

    },

    onVideoCallRoom: function(button){
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            auth = WebRTC.app.getController('Auth'),
            sessionId = viewModel.get('room').get('sessionId'),
            inVideoCall = viewModel.get('inVideoCall'),
            videoBox;

        if(!inVideoCall){

            me.switchToVideoMeetingLayout(true);

            videoBox = view.getVideoBox();

            viewModel.set('inVideoCall', true);
            viewModel.set('showingCamera', true);

            me.setMemberCallStatus({callStatus:'video'});

            auth.setPresenseStatus({
                status: 'busy',
                statusOrder: 60,
                lastActivity: null
            });

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
        var you = this.lookupReference('you'),
            auth = WebRTC.app.getController('Auth'),
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

        this.fireEvent('endcall', sessionId, you.id );

    },

    onEndVideoCall: function(button){
        var me = this,
            view = me.getView(),
            videoBox = view.getVideoBox(),
            viewModel = me.getViewModel(),
            auth = WebRTC.app.getController('Auth'),
            sessionId = this.getViewModel().get('room.sessionId'),
            streams = view.getRemoteStreams();

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

        if(!streams.items.length){
            me.switchToVideoMeetingLayout(false);
        }

        me.fireEvent('endcall', sessionId, videoBox.id );
    },

    setMemberCallStatus: function(status){
        var auth = WebRTC.app.getController('Auth'),
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
                    interval: 1000
                });
            }
        }
    },

    onUpdateCurrentSpeaker: function(){
        var me = this,
            view = me.getView();

        /* If the user switch chat room the view is no longe available
         * so end its realated current speaker task. */
        if(!view){
            Ext.TaskManager.stop(me.currentSpeakerTask);
            delete me.currentSpeakerTask;
            return false;
        }

        var remoteStreams = view.getRemoteStreams(),
            speaker = me.getCurrentSpeaker(),
            speakerBox = me.lookupReference('speakervideobox'),
            partecipantBox = remoteStreams.down('container[username=' + speaker.get('name') + ']'),
            lastCurrentSpeaker = me.lastCurrentSpeaker,
            lastCurrentSpeakerBox;

        if(speaker !== lastCurrentSpeaker) {

            if (!partecipantBox) {
                partecipantBox = view.getVideoBox();
            }

            Ext.suspendLayouts();

            lastCurrentSpeakerBox = speakerBox.removeAll(false);
            if(lastCurrentSpeakerBox.length){
                remoteStreams.add(lastCurrentSpeakerBox[0]);
            }

            remoteStreams.remove(partecipantBox, false);
            speakerBox.add(partecipantBox);

            Ext.resumeLayouts();
            view.updateLayout();

            me.lastCurrentSpeaker = speaker;

        }
    },

    updateAudioLevel: function(audioLevel){
        var me = this,
            viewModel = me.getViewModel(),
            user = viewModel.get('user'),
            userId = user.id,
            members = me.getStore('members'),
            record = members.getById(userId);

        record.set('audio_level', audioLevel);
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

        return speaker;
    }
});
