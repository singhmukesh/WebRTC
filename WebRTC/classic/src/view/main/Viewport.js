Ext.define('WebRTC.view.main.Viewport', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',
    layout: 'border',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox'
    ],
    controller: 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },
    items: [{
        // title: 'Online',
        // collapsable: true,
        // iconCls: 'x-fa fa-group fa-lg',
        title: 'All Users',
        xtype: 'chatpresense',
        region:'west',
        collapsable: true,
        collasped: true,
        bind: {
            hidden: '{!isAdmin}'
        },
        split:true,
       // minWidth: 200,
        flex: 1
    },{
        xtype:'chatroomscontainer',
        region:'center',
        hidden: true,
        flex:5,
        bind: {
            title: 'Sencha Communicator  | {user.fn}'
        },
        reference: 'roomtabs'
    },{
        xtype:'uxiframe',
        src: "/static/cms/",
        region:'north',
        layout:'fit',
        flex:1000,
        reference: 'cms'
    }]
});
