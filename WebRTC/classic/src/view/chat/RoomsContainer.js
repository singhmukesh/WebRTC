Ext.define('WebRTC.view.chat.RoomsContainer', {
    extend: 'Ext.panel.Panel',
    xtype: 'chatroomscontainer',
    viewModel: {
        type: 'chatroomslist'
    },
    controller: 'chatroomscontainer',
    dockedItems: [{
        xtype: 'toolbar',
        cls: 'colored-menu',
        dock: 'top',
        items: [
            {
                iconCls: 'x-fa fa-plus-square',
                plain: true,
                bind:{
                    disabled: '{!isUser}'
                },
                listeners: {
                    click: 'onRoomAdd'
                }
            },{
                iconCls: 'x-fa fa-pencil',
                plain: true,
                bind:{
                    disabled: '{!isRoomSelectedByOwner}'
                },
                listeners: {
                    click: 'onRoomEdit'
                }
            },{
                xtype: 'combobox',
                reference: 'roomscombo',
                bind:{
                    store: '{myrooms}'
                },
                queryMode: 'local',
                displayField: 'name',
                valueNotFoundText: '',
                emptyText: 'select a room...',
                valueField: 'id',
                listeners: {
                    select: 'onRoomSelect'
                }
            },{
                iconCls: 'x-fa fa-share',
                plain: true,
                bind:{
                    hidden: '{!isRoomSharingEnabled}',
                    disabled: '{!isRoomSelected}'
                },
                listeners: {
                    click: 'onRoomShareClick'
                }
            },{
                iconCls: 'x-fa fa-trash-o',
                plain: true,
                bind:{
                    disabled: '{!isRoomSelectedByOwner}'
                },
                listeners: {
                    click: 'onRoomRemove'
                }
            }
            ,'->',
            {
                iconCls: 'x-fa fa-user',
                hidden: true,
                bind:{
                    text: '{name}'
                },
                handler: 'onUserClick'
            },
            {
                iconCls: 'x-fa fa-expand',
                hidden: true,
                handler: 'onToggleFullScreen'
            },{
                iconCls: 'x-fa fa-gear',
                bind:{
                    hidden: '{!isAdmin}'
                },
                handler: 'onGearClick'
            }
        ]
    }],

    tabPosition: 'bottom',
    layout:'fit',
    tools: [
        {
            type: 'gear',
            bind:{
                tooltip: '{user.name} Settings'
            },
            callback: 'onUserClick'
        },{
            type: 'save',
            bind:{
                hidden: '{!isAdmin}'
            },
            handler: 'onGearClick'
        }, {
            type: 'maximize',
            tooltip: 'Full Screen',
            callback: 'onToggleFullScreen'
        },{
            type: 'help',
            // bind:{
            //    hidden: '{!isAdmin}'
            //},
            callback: 'onHelpClick'
        }
    ],
    items: [
    {
        defaultContent: true,
        ui: 'defaultContentWrapper',
        layout:{
            type: 'vbox',
            pack: 'middle',
            align: 'middle'
        },
        items:[{
            bodyStyle: 'background: transparent;',
            html:'<div class="defaultContent"><h1>Welcome</h1><p>Please select a room</p></div>'
        }]
    }
    ]

});
