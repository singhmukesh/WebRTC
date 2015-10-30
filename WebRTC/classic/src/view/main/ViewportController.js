Ext.define('WebRTC.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',

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

       // seems loading the store breaks the bind.
       Ext.StoreManager.lookup('rooms').reload();
    }

});
