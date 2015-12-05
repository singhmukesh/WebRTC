Ext.define('videochat.view.chat.PresenseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatpresense',

    listen: {
        controller: {
            '*': {
                closeroom: 'onCloseRoom',
                joinroom: 'onJoinRoom'
            }
        }
    },

    onCloseRoom: function(tab, room, user){
        var auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            // user = this.getViewModel().get('user'),
            usersRef = auth.firebaseRef.child('users/' + user['id']);

        usersRef.update({
            status: 'online',
            id: user['id'],
            name: user['fn'],
            statusOrder: 100
        });

        WebRTC.util.Logger.log('presense | room closed')
    },

    onJoinRoom: function(tab, room, user){
        var auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            // user = this.getViewModel().get('user'),
            usersRef = auth.firebaseRef.child('users/' + user['id']);

        usersRef.update({
            status: 'online',
            id: user['id'],
            name: user['fn'],
            statusOrder: 100
        });

        WebRTC.util.Logger.log('presense | room joined')
    },

    onDblClick: function(list, record ){
        var userId = this.getViewModel().get('user')['id'];
        if(userId == record.get('id')){
            this.fireEvent('openUser');
        }
    }
});