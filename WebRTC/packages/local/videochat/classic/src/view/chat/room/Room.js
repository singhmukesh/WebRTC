Ext.define('videochat.view.chat.room.Room', {
    extend: 'Ext.Panel',
    xtype: 'chatroom',
    requires: [
        'videochat.view.chat.room.layout.Chat',
        'videochat.view.chat.room.layout.Video'
    ],
    layout: 'card',
    controller: 'chatroom',
    viewModel: {
        type: 'chatroom'
    },
    items: [
        {
            xtype: 'chatlayout',
            reference: 'chatcard'
        },
        {
            xtype: 'videolayout',
            reference: 'videocard'
        }
    ],
    getVideoBox: function(){
        var activeItem = this.getLayout().getActiveItem();
        return activeItem.down('container[isMyVideoBox=true]');
    },
    getRemoteStreams: function(){
        var activeItem = this.getLayout().getActiveItem();
        return activeItem.down('#remotestreams');
    }
});