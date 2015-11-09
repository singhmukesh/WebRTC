Ext.define('WebRTC.view.phone.chat.Room', {
    extend: 'Ext.Panel',
    // xtype: 'chatroom',

    layout: {
        type: 'box',
        orient: 'vertical',
        align: 'stretch'
    },

    controller: 'chatroom',

    viewModel: {
        type: 'chatroom'
    },

    items: [
        {
            xtype: 'chathistory',
            reference: 'chathistory',
            flex: 2
        }
    ]

    // updateTitle: function (title) {
    //     var nav = this.up('navigationview');
    //     if (nav) {
    //         nav.updateTitleContainerTitle(title);
    //     }
    // } 

});
