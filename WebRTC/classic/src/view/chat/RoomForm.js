Ext.define('WebRTC.view.chat.RoomForm', {
    extend: 'Ext.form.Panel',
    xtype: 'chatroomform',

    bodyPadding: 10,
    autoScroll: true,

    /*
     * Seek out the first enabled, focusable, empty textfield when the form is focused
     */
    defaultFocus: 'textfield:focusable:not([hidden]):not([disabled]):not([value])',

    defaultButton: 'okButton',
    defaults:{
        anchor: '100%',
        labelWidth: 200
    },

    items: [
        {
            xtype: 'fieldset',
            title: 'Info',
            defaults:{
                anchor: '100%'
            },
            items: [
                {
                    xtype:'hiddenfield',
                    name: 'id',
                    bind: '{theRoom.id}'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Room Name',
                    name: 'name',
                    bind: '{theRoom.name}'
                },
                {
                    xtype:'checkboxfield',
                    boxLabel  : 'Private',
                    name      : 'isPrivate',
                    bind: '{theRoom.isPrivate}',
                    checked: false,
                    inputValue: true
                },{
                    xtype:'textfield',
                    fieldLabel: 'Room Password',
                    name: 'password',
                    bind: {
                        value: '{theRoom.password}',
                        hidden: '{!theRoom.isPrivate}'
                    }
                }
            ]
        },{
            xtype:'textfield',
            fieldLabel: 'OpenTok SessionId',
            name: 'sessionId',
            disabled: true,
            bind: {
                value: '{theRoom.id}',
                hidden: '{!theRoom.id}'
            }
        }
    ],

    bbar:[
        {
            iconCls: 'x-fa fa-thumbs-o-down',
            action:'cancel',
            hidden: true,
            text:'Cancel'
        }
        ,'->',
        {
            iconCls: 'x-fa fa-thumbs-o-up',
            reference: 'okButton',
            action:'ok',
            formBind: true,
            text:'OK'
        }
    ]

});
