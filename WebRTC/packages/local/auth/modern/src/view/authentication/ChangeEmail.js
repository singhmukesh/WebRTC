Ext.define('auth.view.authentication.ChangeEmail', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'changemail',

    viewModel: {
        type: 'authentication'
    },

    items: [{
        xtype: 'panel',
        minWidth: 250,  //keeps sceen from jumping when x is added inside field

        items: [{
            padding: '20 0 0 20',
            html: 'Change Email'
        }, {
            xtype: 'container',
            padding: 20,
            defaults: {
                margin: '0 0 10 0'
            },
            items:[
                {
                    xtype: 'label',
                    cls: 'lock-screen-top-label',
                    text: 'Enter your current email address and new preferred email'
                },
                {
                    xtype: 'label',
                    reference: 'statusLabel',
                    cls: 'status-top-label',
                    hidden: true,
                    text: 'An error has occurred'
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    userCls: 'text-border',
                    name: 'email',
                    bind: '{email}',
                    hideLabel: true,
                    allowBlank: false,
                    placeHolder: 'current email',
                    vtype: 'email',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    userCls: 'text-border',
                    name: 'newemail',
                    bind: '{newemail}',
                    hideLabel: true,
                    allowBlank: false,
                    placeHolder: 'user@example.com',
                    vtype: 'email',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    userCls: 'text-border',
                    hideLabel: true,
                    allowBlank : false,
                    placeHolder: 'Password',
                    name: 'password',
                    inputType: 'password',
                    bind: '{password}',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-password-trigger'
                        }
                    }
                },
                {
                    xtype: 'button',
                    reference: 'changeEmail',
                    scale: 'large',
                    // ui: 'soft-blue',
                    formBind: true,
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Change Email',
                    listeners: {
                        tap: 'onChangeEmail'
                    }
                },
                {
                    xtype: 'button',
                    // scale: 'large',
                    // ui: 'soft-blue',
                    iconAlign: 'right',
                    //iconCls: 'x-fa fa-check',
                    text: 'Done',
                    listeners: {
                        tap: 'onDone'
                    }
                }
            ]
        }]
    }]

});
