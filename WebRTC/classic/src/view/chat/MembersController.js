Ext.define('WebRTC.view.chat.MembersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatmembers',
    listen: {
        controller: {
            'auth': {
                visibilityChanged: 'onVisibilityChanged',
                idle: 'onIdle',
                active: 'onActive'
            },
            '*': {
                closeroom: 'onCloseRoom',
                joinroom: 'onJoinRoom'
            }
        }
    },

    onCloseRoom: function(tab,room, user){
        var auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            membersRef = auth.firebaseRef.child('roommembers/' + room['id'] + '/' + user['id']);

        // remove member from room
        membersRef.remove();

        WebRTC.util.Logger.log('members | room closed')
    },

    onJoinRoom: function(tab, room, user){
        var auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            membersRef = auth.firebaseRef.child('roommembers/' + room['id'] + '/' + user['id']),
            socketId = '';

        if(room.store.getProxy()['socket']){
            socketId =  room.store.getProxy().socket.id;
        }

        membersRef.update({
            id: user['id'],
            callStatus:'idle',
            micStatus:'',
            socketId: socketId,
            name: user['fn']
        });
        // when I disconnect, remove this member
        membersRef.onDisconnect().remove();
        WebRTC.util.Logger.log('members | room joined')
    },



    onDblClick: function(list,record){
        var auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            user = this.getViewModel().get('user'),
            member = record.get('id'),
            userroomsRef = auth.firebaseRef.child('userrooms/' + user['id']+ '/' + member);

        if(user['id'] == record.get('id')){
            this.fireEvent('openUser');
        }else{
            userroomsRef.once("value", function (snap) {
                if ( snap.val() ) {
                    WebRTC.util.Logger.log('foundroom');
                }else{
                    WebRTC.util.Logger.log('createrooms');
                    //userroomsRef.update({private:true})
                }
            }, function (err) {
                    WebRTC.util.Logger.log(err);
            });
        }

    },

    onVisibilityChanged: function(){
        //var me=this;
        if(!document.hidden) {
            //me.unread = 0;
        }
        //me.setUnreadTitle();
    },

    onIdle: function(lastActivity){
        var me=this,
            user = this.getViewModel().get('user');
        if(me.isIdle){return}
        me.isIdle = true;
        me.setPresenseStatus({
            status: 'idle',
            id: user['id'],
            name: user['fn'],
            lastActivity: lastActivity
        });
        // WebRTC.util.Logger.log('idle');
    },

    onActive: function(){
        var me=this,
            user = this.getViewModel().get('user');
        if(me.isIdle){
            me.isIdle = false;
            me.setPresenseStatus({
                status: 'online',
                id: user['id'],
                name: user['fn'],
                lastActivity: null
            });
        }
        // WebRTC.util.Logger.log('active');
    },

    setPresenseStatus: function(status){
        var auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            userId = auth.user['id'],
            membersRef = auth.firebaseRef.child('roommembers/' + id + '/' + userId);

      //  WebRTC.util.Logger.log('room members status : ' + status);
      membersRef = auth.firebaseRef.child('roommembers/' + id + '/' + userId);
    }


});
