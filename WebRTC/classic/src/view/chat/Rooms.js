Ext.define('WebRTC.view.chat.Rooms', {
    extend: 'Ext.Panel',
    xtype: 'chatrooms',
    autoScroll: true,
    bodyPadding: 10,

    items:[{
        xtype: 'dataview',
        itemSelector: 'div.room-wrap',
        tpl: [
            '<tpl for=".">',
            '<div style="margin-bottom: 10px;" class="room-wrap">',
            '{name}',
            '<br/><span>{description}</span>',
            '</div>',
            '</tpl>'
        ],

        viewModel : {
            stores: {
                rooms: {
                    model: 'WebRTC.model.Room',
                    autoLoad: true,
                    listeners:{
                        load: 'selectFirstRoom'
                    }
                }
            }
        },
        bind:{
            store: '{rooms}'
        },
        listeners: {
            select : 'onRoomSelect'
        }
    }],

    tbar:[{
        iconCls: 'x-fa fa-pencil',
        plain: true,
        hidden: true,
        listeners: {
            click: 'onRoomMenu'
        }
    },'->',{
        iconCls: 'x-fa fa-plus-square',
        plain: true,
        hidden: true,
        listeners: {
            click: 'onRoomMenu'
        }
    }]




});
