Ext.define('WebRTC.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'Ext.window.Toast'
    ],

    listen: {
        controller: {
            'auth':{
                userData: 'onAuthUserData'
            }
        }
    },

    //something in the user data changed
    onAuthUserData: function(user){
        WebRTC.util.Logger.log('user data changed');
        this.getViewModel().set('user', user);
        this.getViewModel().set('userid', user['id']);
        this.getViewModel().set('name', user['fn']);
    }

});
