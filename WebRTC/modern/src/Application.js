/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('WebRTC.Application', {
    extend: 'Ext.app.Application',
    
    name: 'WebRTC',

    requires: [
        'WebRTC.*',
        'Ext.Toast'
    ],

    defaultToken : 'home',

    controllers: [
        'Navigation',
        'Auth',
        'OpenTok'
    ],

    stores:[
        'WebRTC.store.chat.Rooms',
        'SecurityRoles',
        'Settings',
        'Users'
    ],

    init: function(){
        WebRTC.util.Logger.init();
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});




