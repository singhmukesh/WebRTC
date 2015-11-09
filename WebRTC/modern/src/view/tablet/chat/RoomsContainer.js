Ext.define('WebRTC.view.chat.RoomsContainer', {
    extend: 'Ext.Container',
    xtype: 'chatroomscontainer',

    viewModel: {
        type: 'chatroomscontainer'
    },
    controller: 'chatroomscontainer',

    layout: 'fit',

    items: [
        {
            xtype: 'button',
            iconCls:'x-fa fa-plus',
            ui: 'bright-blue round',
            userCls: 'pop-out',
            bind: {
                hidden: '{composing}'
            },
            width: 50,
            height: 50,

            // These cause the button to be floated / absolute positioned
            bottom: 10,
            right: 10,

            handler: 'onRoomAdd',
            listeners: {
                scope: 'controller',
                element: 'element',
                longpress: 'onLongPressCompose'
            }
        },
        {
            xtype: 'dataview',
            title: 'Rooms',
            disableSelection: true,
            reference: 'roomsgrid',
            itemSelector: 'div.room-wrap',
            itemTpl: [
                '<div class="room-wrap">',
                '<span class="x-fa fa-comments fa-lg" title="{name}"> </span>{name}',
                '</div>'
            ],
            bind:{
                store: '{rooms}'
            },
            listeners: {
               itemtap: 'onRoomSelect'
            }
        }
    ]


});
