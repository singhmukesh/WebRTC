Ext.define('auth.view.authentication.Login', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'login',



    viewModel: {
        type: 'authentication'
    },

    items: [{
        xtype: 'panel',

        items: [{
            padding: '20 0 0 20',
            html: 'Sign into your account'
        }, {
            xtype: 'container',
            padding: 20,
            defaults: {
                margin: '0 0 10 0'
            },
            items: [{
                xtype: 'label',
                reference: 'statusLabel',
                cls: 'status-top-label',
                hidden: true,
                text: 'An error has occurred'
            }, {
                xtype: 'textfield',
                placeHolder: 'Email',
                name: 'userid',
                bind: '{userid}',
                userCls: 'text-border'
            }, {
                xtype: 'passwordfield',
                placeHolder: 'Password',
                name: 'password',
                bind: '{password}',
                userCls: 'text-border'
            }, {
                layout: 'hbox',
                items: [{
                    xtype: 'checkboxfield',
                    bind: '{persist}'
                }, {
                    html: 'Remember Me',
                    cls: 'checkbox-text-adjustment',
                    style: 'marginRight:20px'
                }, {
                    html: '<a href="#passwordreset">Forgot Password</a>',
                    cls: 'checkbox-text-adjustment'
                }]
            }, {
                xtype: 'button',
                scale: 'large',
                text: 'Login',
                iconAlign: 'right',
                iconCls: 'x-fa fa-angle-right',
                ui: 'soft-green',
                listeners: {
                    tap: 'onLoginButton'
                }
            },

            {
                xtype: 'button',
                scale: 'large',
                // ui: 'gray',
                iconAlign: 'right',
                iconCls: 'x-fa fa-right',
                text: 'Guest Access',
                listeners: {
                    tap: 'onGuestShow'
                }
            }, {
                xtype: 'button',
                scale: 'large',
                text: 'Login with Facebook',
                hidden: true,
                iconAlign: 'right',
                iconCls: 'x-fa fa-facebook',
                ui: 'facebook',
                listeners: {
                    tap: 'onFaceBookLogin'
                }
            }, {
                xtype: 'button',
                scale: 'large',
                text: 'Create Account',
                ui: 'gray-button',
                iconAlign: 'right',
                iconCls: 'x-fa fa-user-plus',
                listeners: {
                    tap: 'onNewAccount'
                }
            }]
        }]
    }]

});
