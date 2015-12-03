Ext.define('auth.view.authentication.ChangePassword', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'changepassword',

    viewModel: {
        type: 'authentication'
    },

    items: [{
        xtype: 'panel',
        minWidth: 250,  //keeps sceen from jumping when x is added inside field

        items: [{
            padding: '20 0 0 20',
            html: 'Change Password'
        }, {
            xtype: 'container',
            padding: 20,
            defaults: {
                margin: '0 0 10 0'
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'lock-screen-top-label',
                    text: 'Enter your old password and select a new password'
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
                    userCls: 'text-border',
                    cls: 'auth-textbox',
                    hideLabel: true,
                    allowBlank : false,
                    placeHolder: 'Old Password',
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
                    xtype: 'textfield',
                    userCls: 'text-border',
                    cls: 'auth-textbox',
                    hideLabel: true,
                    allowBlank : false,
                    placeHolder: 'New Password',
                    name: 'newpassword',
                    inputType: 'password',
                    bind: '{newpassword}',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-password-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    userCls: 'text-border',
                    cls: 'auth-textbox',
                    hideLabel: true,
                    allowBlank : false,
                    placeHolder: 'Verify new Password',
                    name: 'verifynewpassword',
                    inputType: 'password',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-password-trigger'
                        }
                    }
                },
                {
                    xtype: 'button',
                    reference: 'changePassword',
                    scale: 'large',
                    // ui: 'soft-blue',
                    formBind: true,
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Change Password',
                    listeners: {
                        tap: 'onChangePassword'
                    }
                },
                {
                    xtype: 'button',
                    // scale: 'large',
                    // ui: 'soft-blue',
                    iconAlign: 'right',
                    // iconCls: 'x-fa fa-check',
                    text: 'Done',
                    listeners: {
                        tap: 'onDone'
                    }
                }
            ]
        }]
    }]

});
