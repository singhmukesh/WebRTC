Ext.define('WebRTC.view.main.Viewport', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'WebRTC.model.User',
        'WebRTC.view.main.ViewportController',
        'WebRTC.view.main.ViewportModel'
        //'Material.container.plugin.FlexibleToolbar'
    ],

    //plugins: [
    //    'materialflexibletoolbar'
    //],

    controller: 'mainviewport',

    viewModel: { 
        type: 'mainviewport'
    },

    tbar: {
        height: 64,
        items: [
        {
            iconCls: 'md-add',
            plain: true,
            listeners: {
                click: 'onRoomAdd'
            }
        },//{
        //    iconCls: 'x-fa fa-pencil',
        //    plain: true,
        //    bind:{
        //        disabled: '{!isRoomSelected}'
        //    },
        //    listeners: {
        //        click: 'onRoomEdit'
        //    }
        //},{
        //    xtype: 'combobox',
        //    reference: 'roomscombo',
        //    bind:{
        //        store: '{rooms}'
        //    },
        //    queryMode: 'local',
        //    displayField: 'name',
        //    valueNotFoundText: '',
        //    emptyText: 'select a room...',
        //    valueField: 'id',
        //    listeners: {
        //        select: 'onRoomSelect'
        //    }
        //},{
        //    iconCls: 'x-fa fa-trash-o',
        //    plain: true,
        //    bind:{
        //        disabled: '{!isRoomSelected}'
        //    },
        //    listeners: {
        //        click: 'onRoomRemove'
        //    }
        //}
        '->',
        {
            iconCls: 'md-settings',
            //bind:{
            //    text: '{name}'
            //},
            handler: 'onSettingsUserSelect'
        },
        {
            iconCls: 'md-fullscreen',
            handler: 'onToggleFullScreen'
        },{
            iconCls: 'x-fa fa-gear',
            bind:{
                hidden: '{isAdmin}'
            },
            handler: 'onSettingsAdminSelect'
        }
        //,{
        //    style:'background-image: url(/static/images/TokBoxIcon.png) !important; background-size: 29px 29px; background-repeat: no-repeat; ',
        //    plain: true,
        //    listeners: {
        //        click: 'onLogoClick'
        //    }
        //}

        ]
    },

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'panel',
            width: 350,
            tbar: [
                {
                    text: 'Add'
                }
            ],
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    reference: 'roomslist',
                    //width: 350,
                    //flex: 1,
                    padding: '32 0 0 32',
                    bind: '{rooms}',
                    columns: [
                        {
                            xtype: 'templatecolumn',
                            tpl: '{name}'
                        }
                    ],
                    listeners: {
                        rowclick: 'onRoomSelect'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            reference: 'roomtabs',
            flex: 1,
            layout: 'card'
        }

        //{
        //    flex: 1,
        //    hidden: true, // todo: not implemented
        //    layout: {
        //        type: 'vbox',
        //        align: 'stretch'
        //    },
        //    items:[
        //        {
        //            xtype: 'tabpanel',
        //            flex:3,
        //            deferredRender: true,
        //            items:[
        //            {
        //                title: 'Rooms',
        //                xtype: 'chatrooms',
        //                iconCls: 'x-fa fa-home',
        //                flex: 1,
        //                reference: 'homerooms'
        //            },{
        //                title: 'Users',
        //                xtype: 'chatmembers',
        //                reference: 'homeusers',
        //                hidden: true,
        //                iconCls: 'x-fa fa-home',
        //                flex: 1
        //            }]
        //        },
        //        {
        //            xtype: 'tabpanel',
        //            flex:1,
        //            items:[{
        //                title: '1:1 Chat',
        //                xtype: 'chatmembers',
        //                reference: 'privateusers',
        //                iconCls: 'x-fa fa-shield',
        //                flex: 1
        //            }]
        //        }
        //    ]
        //},
        //{
        //    xtype: 'tabpanel',
        //    tabPosition: 'bottom',
        //    reference: 'roomtabs',
        //    flex:4,
        //    items:[]
        //}
    ]
});
