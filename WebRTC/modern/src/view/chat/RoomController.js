Ext.define('WebRTC.view.chat.RoomController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroom',


    roomMemberAdd: function(member){
        var store = this.getViewModel().getStore('members');
        store.add(member);
        this.fireEvent('playsound','enter-sound');
    },

    roomMemberRemove: function(id){
        var store = this.getViewModel().getStore('members'),
            idx = store.find('id',id);

        if(idx){
            store.removeAt(idx);
            this.fireEvent('playsound','leave-sound');
        }

    },


    onSpecialKey: function(f,e){
        if (e.getKey() == e.ENTER && !e.shiftKey ) {
            this.chatSend();
        }
        if (e.getKey() == e.UP) {
            alert('edit last')
        }
    },

    chatReceived: function(chat){
        var store = this.getViewModel().getStore('messages');

        store.add(chat);

        me.scrollList();

        this.fireEvent('playsound','chat-sound');
    },

    chatSend: function(){
        var me = this,
            chat,
            store = this.getViewModel().getStore('messages'),
            timestamp = new Date().toISOString(),
            name = me.getView().parent.getViewModel().get('name'),
            roomId = me.getViewModel().get('id'),
            sessionId = this.getViewModel().get('room.sessionId'),
            message = me.lookupReference('chattext'),
            text = message.getValue();

        if (text) {
            chat = Ext.create('WebRTC.model.chat.Message',{
                message: text,
                roomid: roomId,
                mine: true,
                from: name,
                date: timestamp
            });

            // message.focus(false, 200);
            message.setValue('');
            message.blur();

            store.add(chat);

            me.fireEvent('chatmessage', sessionId, chat.data);
            me.scrollList();
        }

    },

    scrollList: function () {
        var list = this.lookupReference('historylist'),
            scroll = list.getScrollable();

        if (scroll) {
            scroll.scrollTo(null, Infinity);
        }
        
    },


    onAudioCallRoom: function(button){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( !this.getViewModel().get('inAudioCall') ){
            this.getViewModel().set('inAudioCall', true);
            this.getViewModel().set('showingCamera', false);

            this.fireEvent('callroom', {sessionId: sessionId, element: you, video: false} );
        }else{
            this.onEndAudioCall(button);
        }

    },

    onVideoCallRoom: function(button){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( !this.getViewModel().get('inVideoCall') ){
            this.getViewModel().set('inVideoCall', true);
            this.getViewModel().set('showingCamera', true);

            this.fireEvent('callroom',  {sessionId: sessionId, element: you.id, video: true} );
        }else{
            this.onEndVideoCall(button);
        }
    },


    onEndAudioCall: function(button){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        this.getViewModel().set('inAudioCall', false);
        this.getViewModel().set('useCamera', true);
        this.getViewModel().set('useMic',true);

        this.fireEvent('endcall', sessionId, you.id );

    },

    onEndVideoCall: function(button){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        this.getViewModel().set('inVideoCall', false);
        this.getViewModel().set('useCamera', true);
        this.getViewModel().set('useMic',true);

        this.fireEvent('endcall', sessionId, you.id );

    },


    onPublishAudioToggle: function(button){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( this.getViewModel().get('useMic') ){
            this.getViewModel().set('useMic',false);
            this.fireEvent('hidePublisherAudio', sessionId);
        }else{
            this.getViewModel().set('useMic',true);
            this.fireEvent('showPublisherAudio', sessionId);
        }

    },

    onPublishVideoToggle: function(button){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( this.getViewModel().get('useCamera') ){
            this.getViewModel().set('useCamera',false);
            this.fireEvent('hidePublisherVideo', sessionId);
        }else{
            this.getViewModel().set('useCamera',true);
            this.fireEvent('showPublisherVideo', sessionId);
        }

    }

});
