Ext.define('videochat.view.chat.RoomShareForm', {
    extend: 'Ext.form.Panel',
    xtype: 'chatroomshareform',

    bodyPadding: 10,
    autoScroll: true,

    controller: 'chatroomshareform',
    ui: 'soft-green',

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
            bind:{
                title: '{theRoom.name}'

            },
            defaults:{ anchor: '100%'},
            items: [{
                    xtype:'label',
                    label: 'Room Link',
                    bind: '{theMessage}'
            }]
        },
        {
            xtype: 'fieldset',
            title: 'Invite Person',
            items: [
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[

                        {
                            xtype:'textfield',
                            fieldLabel: 'Email',
                            allowBlank: false,
                            emptyText: 'user@example.com',
                            vtype: 'email',
                            flex:1,
                            name: 'email',
                            triggers: {
                                glyphed: {
                                    cls: 'trigger-glyph-noop auth-email-trigger'
                                }
                            }
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-exchange',
                            ui: 'bright-blue',
                            reference: 'inviteButton',
                            action:'ok',
                            formBind: true,
                            handler: 'onInviteClick',
                            text:'Invite'
                        }

                    ]
                }
            ]
        },
        {
            xtype: 'label',
            reference: 'statusLabel',
            cls: 'status-top-label',
            style: 'margin-left: 18px;',
            hidden: true,
            text: 'An error has occurred'
        },
        {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                iconCls: 'x-fa fa-arrow-left',
                action:'onCancelTap',
                handler: 'onCancelTap'
            },
            {
                xtype: 'spacer'
            }]
        }
    ]



});
