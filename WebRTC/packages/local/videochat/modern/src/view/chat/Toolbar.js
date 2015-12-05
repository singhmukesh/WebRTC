Ext.define('videochat.view.chat.Toolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'chattoolbar',
    items:[

        {
            iconCls: 'x-fa fa-pencil',
            xtype: 'button',
            plain: true,
            bind:{
                hidden: '{!isRoomSelected}',
                disabled: '{!isRoomSelected}'
            },
            listeners: {
                tap: 'onRoomEdit'
            }
        },{
            xtype: 'spacer'
        },{
            iconCls: 'x-fa fa-trash-o',
            xtype: 'button',
            plain: true,
            bind:{
                hidden: '{!isRoomSelected}',
                disabled: '{!isRoomSelected}'
            },
            listeners: {
                tap: 'onRoomRemove'
            }
        }
    ]
});