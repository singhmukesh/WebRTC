
Ext.define('WebRTC.Application', {
    extend: 'Ext.app.Application',
    name: 'WebRTC',

    requires: ['WebRTC.*'],

    defaultToken : 'home',

    //Global Controllers
    controllers:[
        'opentok.controller.OpenTok',
        'soundlibrary.controller.SoundLibrary',
        'Auth',
        'Routes'
    ],

    //Global Stores
    stores:[
        'NavigationTree',
        'WebRTC.store.chat.Rooms',
        'Settings',
        'SecurityRoles',
        'Users'
    ],

    //Startup view for Classic
    mainView: 'WebRTC.view.main.Viewport',

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
