Ext.define('WebRTC.view.settings.User', {
    extend: 'Ext.form.Panel',
    xtype: 'settingsuser',
    title: 'User Settings',

    controller: 'settingsuser',
    ui: 'soft-green',
    scrollable: true,
    items:[
        {

        items:[
            {
                xtype: 'fieldset',
                title: 'Status',

                items: [{
                    xtype: 'textfield',
                    allowBlank: false,
                    label: 'Mood',
                    placeHolder: 'out to lunch... back later',
                    name: 'status_msg',
                    bind: '{user.status_msg}'
                }]
            },
            {
                xtype: 'fieldset',
                title: 'Info',

                items: [{
                    xtype: 'textfield',
                    allowBlank: false,
                    label: 'Name',
                    placeHolder: 'Fullname',
                    name: 'fn',
                    bind: '{user.fn}'
                }, {
                    xtype: 'textfield',
                    label: 'Company',
                    placeHolder: 'Sencha, Inc.',
                    name: 'company',
                    bind: '{user.company}'
                }, {
                    xtype: 'textfield',
                    label: 'Title',
                    placeHolder: 'VP of mojo enhancement.',
                    name: 'title',
                    bind: '{user.title}'
                }]
            },


            {
                xtype: 'fieldset',
                title: 'Location',

                items: [{
                    xtype: 'textfield',
                    label: 'Country',
                    placeHolder: 'United States',
                    name: 'country',
                    bind: '{user.country}'
                }, {
                    xtype: 'textfield',
                    label: 'State',
                    placeHolder: 'California',
                    name: 'state',
                    bind: '{user.state}'
                }, {
                    xtype: 'textfield',
                    label: 'Location',
                    placeHolder: 'Country, state, city or metro area.',
                    name: 'location',
                    bind: '{user.location}'
                }]
            },
            {
                xtype: 'fieldset',
                title: 'Voice',

                items: [{
                    xtype: 'textfield',
                    label: 'Work',
                    placeHolder: '(xxx) xxx-xxxx',
                    name: 'tel_work',
                    bind: '{user.tel_work}'
                }, {
                    xtype: 'textfield',
                    label: 'Cell',
                    placeHolder: '(xxx) xxx-xxxx',
                    name: 'tel_cell',
                    bind: '{user.tel_cell}'
                }]
            },

            {
                xtype: 'fieldset',
                title: 'Sounds',
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
                items: [
                    {
                        xtype: 'radiofield',
                        name: 'videolayout',
                        label: 'Chat',
                        bind: '{user.chat}',
                        value: 'chat'
                    },{
                        xtype: 'radiofield',
                        name: 'videolayout',
                        label: 'Video Feeds',
                        bind: '{user.chat}',
                        value: 'videofeeds'
                    }
                ]
            },

            {
                xtype: 'fieldset',
                title: 'Account',
                items: [
                    {
                        xtype: 'button',
                        reference: 'changePassword',
                        scale: 'large',
                        // ui: 'soft-blue',
                        iconAlign: 'right',
                        iconCls: 'x-fa fa-lock',
                        text: 'Change Password',
                        listeners: {
                            tap: 'onChangePassword'
                        }
                    }, {
                        xtype: 'spacer'
                    }, {
                        xtype: 'button',
                        reference: 'changeEmail',
                        scale: 'large',
                        // ui: 'soft-blue',
                        iconAlign: 'right',
                        iconCls: 'x-fa fa-envelope',
                        text: 'Change Email',
                        listeners: {
                            tap: 'onChangeEmail'
                        }
                    }
                ]
            },
            {
                xtype: 'fieldset',
               // title: 'Account',
                items: [
                   {
                        xtype:'textfield',
                        label: '#UN',
                        name: 'id',
                        disabled: true,
                        bind: {
                            value: '{user.id}'
                        }
                    }
                ]
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
    }]
});
