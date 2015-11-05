/**
 * This class provides the modal Ext.Window support for all Authentication forms.
 * It's layout is structured to center any Authentication dialog within it's center,
 * and provides a backGround image during such operations.
 */
Ext.define('auth.view.authentication.LockingWindow', {
    extend: 'Ext.Panel',
    xtype: 'lockingwindow',

    requires: [
        'auth.view.authentication.AuthenticationController'
    ],

    baseCls: 'auth-locked-window',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    controller: 'authentication',

    updateStatus: function(text){
       var statusLabel =  this.down('[reference=statusLabel]');
       if(statusLabel){
           statusLabel.setHtml(text);
           statusLabel.show();
       }
    }
});
