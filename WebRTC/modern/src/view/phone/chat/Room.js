Ext.define('WebRTC.view.phone.chat.Room', {
    extend: 'Ext.Panel',

    layout: {
        type: 'box',
        orient: 'vertical',
        align: 'stretch'
    },

    controller: 'chatroom',

    viewModel: {
        type: 'chatroom'
    },

    header:{
        itemPosition: 0,
        titleAlign: 'center',
        items:[{
            xtype: 'button',
            top: -10,
            left: 0,
            userCls: 'subHeaderIcon',
            iconCls: 'x-fa fa-arrow-left',
            // text:'Back',
            listeners:{
                tap: 'onBackTap'
            }
        }]
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
