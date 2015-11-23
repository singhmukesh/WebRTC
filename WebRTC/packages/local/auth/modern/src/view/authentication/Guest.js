Ext.define('auth.view.authentication.Guest', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'guest',



    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well
    viewModel: {
        type: 'authentication'
    },

    items: [{
        xtype: 'panel',
        minWidth: 250,  //keeps sceen from jumping when x is added inside field
        items: [{
            padding: '20 0 0 20',
            html: 'What should we call you?'
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
                userCls: 'text-border',
                name: 'fullName',
                bind: '{fullName}',
                hideLabel: true,
                allowBlank : false,
                placeHolder: 'nickname',
                triggers: {
                    glyphed: {
                        cls: 'trigger-glyph-noop auth-email-trigger'
                    }
                }
            },
            {
                xtype: 'button',
                reference: 'loginButton',
                scale: 'large',
                // ui: 'soft-green',
                iconAlign: 'right',
                iconCls: 'x-fa fa-angle-right',
                text: 'Enter',
                formBind: true,
                listeners: {
                    tap: 'onEnterButton'
                }
            }]
        }]
    }]
});
