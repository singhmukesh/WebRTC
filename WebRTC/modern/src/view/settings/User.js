Ext.define('WebRTC.view.settings.User', {
    extend: 'Ext.form.Panel',
    xtype: 'settingsuser',
    title: 'User Settings',
    requires: [
        'WebRTC.view.settings.UserController'
    ],

    controller: 'settingsuser',
    bodyPadding: 10,
    ui: 'soft-green',
    scrollable: true,

    items: [
        {
            xtype: 'fieldset',
            title: 'Sounds',
            defaults:{
                anchor: '100%',
                labelWidth: 180
            },
            items: [
                {
                    xtype: 'selectfield',
                    store: 'Sounds',
                    label: 'Chat Sound',
                    queryMode: 'local',
                    displayField: 'id',
                    valueField: 'id',
                    name: 'chat-sound'
                },{
                    xtype: 'selectfield',
                    store: 'Sounds',
                    label: 'Enter Room Sound',
                    queryMode: 'local',
                    displayField: 'id',
                    valueField: 'id',
                    name: 'enter-sound'
                },{
                    xtype: 'selectfield',
                    store: 'Sounds',
                    label: 'Leave Room Sound',
                    queryMode: 'local',
                    displayField: 'id',
                    valueField: 'id',
                    name: 'leave-sound'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Room Preferences',
            defaults:{
                anchor: '100%',
                labelWidth: 180
            },
            items: [{
                xtype: 'selectfield',
                label: 'Launch Room',
                store: 'rooms',
                queryMode: 'local',
                displayField: 'name',
                valueNotFoundText: 'Room No Longer Found',
                valueField: 'id',
                name: 'launchroom'

            }]
        },
        {
            xtype: 'fieldset',
            title: 'Video Meetings',
            defaults: {
                anchor: '100%',
                labelWidth: 180
            },
            items: [
                {
                    xtype: 'radiofield',
                    name: 'videolayout',
                    label: 'Chat',
                    bind: '{chat}',
                    value: 'chat'
                },{
                    xtype: 'radiofield',
                    name: 'videolayout',
                    label: 'Video Feeds',
                    bind: '{chat}',
                    value: 'videofeeds'
                }
            ]
        },{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                iconCls: 'x-fa fa-sign-out',
                ui: 'header',
                action:'cancel',
                text:'Sign Out',
                handler: 'signOut'
            },{
                    xtype: 'spacer'
            },{
                    iconCls: 'x-fa fa-check-circle',
                    ui: 'header',
                    action:'ok',
                   // text:'OK',
                    handler: 'saveSettings'
            }
            ]
        }

    ]

});
