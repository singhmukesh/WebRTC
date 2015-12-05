Ext.define('videochat.view.chat.RoomForm', {
    extend: 'Ext.form.Panel',
    xtype: 'chatroomform',

    controller: 'chatroomform',

    title: 'Room Info',
    ui: 'soft-green',
    bodyPadding: 10,
    autoScroll: true,


    defaultFocus: 'textfield [name=name]',
    defaultButton: 'okButton',

    defaults:{
        anchor: '100%',
        labelWidth: 200
    },
    items: [
        {
            // xtype: 'fieldset',
            defaults:{
                anchor: '100%',
                plugins: 'responsive',
                style: 'margin-bottom: 20px;',
                responsiveConfig: {
                    'phone || width < 600': {
                        labelAlign: 'top'
                    },
                    'width >= 600': {
                        labelAlign: 'left'
                    }
                }
            },
            items: [
                {
                    xtype:'hiddenfield',
                    name: 'id',
                    bind: '{theRoom.id}'
                },{
                    xtype:'textfield',
                    label: 'Room Name',
                    name: 'name',
                    bind: '{theRoom.name}'
                },{
                    xtype:'textfield',
                    label: 'Topic',
                    name: 'topic',
                    bind: '{theRoom.topic}'
                },
                {
                    xtype:'checkboxfield',
                    label  : 'Private',
                    name      : 'private',
                    bind: '{theRoom.isPrivate}',
                    inputValue: '1'
                },
                {
                    xtype:'textfield',
                    fieldLabel: 'OpenTok SessionId',
                    name: 'sessionId',
                    disabled: true,
                    bind: {
                        value: '{theRoom.id}',
                        hidden: '{!theRoom.id}'
                    }
                }
            ]
        },{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                iconCls: 'x-fa fa-arrow-left',
                action:'onCancelTap',
                // text:'Cancel',
                handler: 'onCancelTap'
            },
                {
                    xtype: 'spacer'
                },{
                    iconCls: 'x-fa fa-check-circle',
                    reference: 'okButton',
                    // text:'OK',
                    action:'onOkTap',
                    handler: 'onOkTap',
                    formBind: true
                }]
        }
    ]

});
