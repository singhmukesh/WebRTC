/**
 * This is the base class for all Authentication related Form dialogs. It optionally
 * enables autoComplete support to any child textfield so that browsers or their plugins
 * may restore/persist username, password and other attributes to/from such forms.
 */
Ext.define('auth.view.authentication.Dialog', {
    extend: 'Ext.form.Panel',
    xtype: 'authdialog',

    requires: [
        'auth.view.authentication.AuthenticationController',
        'auth.view.authentication.AuthenticationModel'
    ],

    controller: 'authentication',
    viewModel: {
        type: 'authentication'
    },

    cls: 'auth-dialog'

});
