Ext.define('auth.view.authentication.Register', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'register',


    viewModel: {
        type: 'authentication'
    },

    items: [{
        xtype: 'panel',

        items: [{
            padding: '20 0 0 20',
            html: 'Create an account'
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
            },{
                xtype: 'textfield',
                cls: 'auth-textbox',
                height: 55,
                hideLabel: true,
                allowBlank : false,
                placeHolder: 'Fullname',
                name: 'fullName',
                bind: '{fullName}',
                triggers: {
                    glyphed: {
                        cls: 'trigger-glyph-noop auth-email-trigger'
                    }
                }
            },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    disabled: true,
                    hidden: true,
                    name: 'userid',
                    bind: '{userid}',
                    placeHolder: 'Username',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'email',
                    placeHolder: 'user@example.com',
                    vtype: 'email',
                    bind: '{email}',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-envelope-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
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
                    layout: 'hbox',
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'agrees',
                        cls: 'form-panel-font-color rememberMeCheckbox',
                        allowBlank : false,
                        bind: '{agrees}',
                        // In this case, the form operation is not VALID unless Terms are agreed upon
                        isValid: function() {
                            var me = this;
                            return me.checked || me.disabled;
                        }
                    }, {
                        html: 'I agree with the Terms/Conditions',
                        cls: 'checkbox-text-adjustment',
                        style: 'marginRight:20px'
                    }]
                },
                {
                    xtype: 'button',
                    scale: 'large',
                    ui: 'soft-blue',
                    formBind: true,
                    reference: 'submitButton',
                    bind: false,
                    margin: '5 0',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Signup',
                    listeners: {
                        tap: 'onSignupClick'
                    }
                },
                {
                    xtype: 'label',
                    hidden: true,
                    html: '<div class="outer-div"><div class="seperator">OR</div></div>'
                },
                {
                    xtype: 'button',
                    scale: 'large',
                    ui: 'facebook',
                    margin: '5 0',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-facebook',
                    text: 'Login with Facebook',
                    hidden: true,
                    listeners: {
                        tap: 'onFaceBookLogin'
                    }
                },
                {
                    xtype: 'component',
                    html: '<div style="text-align:right">' +
                    '<a href="#login" class="link-forgot-password">'+
                    'Back to Log In</a>' +
                    '</div>'
                }
            ]
        }]
    }]

});
