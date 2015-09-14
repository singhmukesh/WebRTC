Ext.define('auth.view.authentication.Login', {
    extend: 'auth.view.authentication.LockingWindow',
    // extend: 'Ext.form.Panel',
    xtype: 'login',

    requires: [
        'auth.view.authentication.Dialog'
    ],

    requires: [
        'auth.view.authentication.AuthenticationController',
        'auth.view.authentication.AuthenticationModel'
    ],

    controller: 'authentication',
    viewModel: {
        type: 'authentication'
    },

    layout: 'fit',
    
    // defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well

    cls: 'user-login-register-container',

    items: [
        {
            xtype: 'authdialog',
            bodyPadding: '20 20',
            defaults : {
                margin : '5 0'
            },

            items: [
                {
                    xtype: 'titlebar',
                    docked: 'top',
                    title: 'Let\'s Log In'
                },
                {
                    xtype: 'fieldset',
                    title: 'Sign into your account',
                    items: [
                        {
                            xtype: 'textfield',
                            label: 'User',
                            name: 'userid',
                            bind: '{userid}'
                        },
                        {
                            xtype: 'passwordfield',
                            label: 'Password',
                            name: 'password',
                            bind: '{password}'
                        },
                        {
                            xtype: 'checkboxfield',
                            cls: 'form-panel-font-color rememberMeCheckbox',
                            height: 30,
                            bind: '{persist}',
                            label: 'Remember me'
                        }                
                    ]            
                },
                {
                    xtype: 'container',
                    html: '<a href="#passwordreset" class="link-forgot-password"> Forgot Password ?</a>'
                },
                {
                    xtype: 'button',
                    reference: 'loginButton',
                    scale: 'large',
                    // ui: 'soft-green',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Login',
                    formBind: true,
                    listeners: {
                        tap: 'onLoginButton'
                    }
                },
                // {
                //     xtype: 'box',
                //     html: '<div class="outer-div"><div class="seperator">OR</div></div>',
                //     margin: '10 0'
                // },
                {
                    xtype: 'button',
                    scale: 'large',
                    hidden: true,
                    // ui: 'facebook',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-facebook',
                    text: 'Login with Facebook',
                    listeners: {
                        tap: 'onFaceBookLogin'
                    }
                },
                // {
                //     html: '<div class="outer-div"><div class="seperator">OR</div></div>',
                //     margin: '10 0'
                // },
                {
                    xtype: 'button',
                    scale: 'large',
                    hidden: true,
                    // ui: 'facebook',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-github',
                    text: 'Login with GitHub',
                    listeners: {
                        tap: 'onGitHubLogin'
                    }
                },
                {
                    html: '<div class="outer-div"><div class="seperator">OR</div></div>',
                    margin: '10 0'
                },
                {
                    xtype: 'button',
                    scale: 'large',
                    // ui: 'gray',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-user-plus',
                    text: 'Create Account',
                    listeners: {
                        tap: 'onNewAccount'
                    }
                }
            ]            
        }
    ]

});
