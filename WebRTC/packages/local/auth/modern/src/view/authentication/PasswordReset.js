Ext.define('auth.view.authentication.PasswordReset', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'passwordreset',

    requires: [
        'auth.view.authentication.Dialog'
    ],

    cls: 'auth-dialog-login',

    viewModel: {
        type: 'authentication'
    },

    items: [{
        xtype: 'panel',

        items: [{
            padding: '20 0 0 20',
            html: 'Enter your email address for further reset instructions'
        }, {
            xtype: 'container',
            padding: 20,
            defaults: {
                margin: '0 0 10 0'
            },
            items: [
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
                    height: 55,
                    name: 'email',
                    bind: '{email}',
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
                    xtype: 'button',
                    reference: 'resetPassword',
                    scale: 'large',
                    // ui: 'soft-blue',
                    formBind: true,
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Reset Password',
                    listeners: {
                        tap: 'onResetClick'
                    }
                },
                {
                    xtype: 'component',
                    html: '<div style="text-align:right">' +
                    '<a href="#login" class="link-forgot-password">' +
                    'Back to Log In</a>' +
                    '</div>'
                }
            ]
        }]
    }]

});
