Ext.define('WebRTC.Application', {
    extend: 'Ext.app.Application',
    name: 'WebRTC',

    requires: [
        'WebRTC.*'
    ],


    defaultToken : 'home',

    //Global Controllers
    controllers:[
        'opentok.controller.OpenTok',
        'soundlibrary.controller.SoundLibrary',
        'help.controller.Help',
        'Auth',
        'Routes'
    ],


    //Startup view for classic
    mainView: 'WebRTC.view.main.Main',


    stores:[
        'WebRTC.store.chat.Rooms',
        'NavigationTree',
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
