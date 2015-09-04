/**
 * @class auth.controller.Auth
 * @extend Ext.app.Controller
 *
 *  Description: This controller will only react to a valid authorize request from another controller's request to authorize.
 *
 */
Ext.define('auth.controller.Auth', {
    extend: 'Ext.app.Controller',
    id: 'auth',

    routes : {
        'passwordreset' : {
             action  : 'setCurrentView'
        },
        'login' : {
            action  : 'setCurrentView'
        },
        'register' : {
            action  : 'setCurrentView'
        },
        'lock' : {
            action  : 'setCurrentView'
        },
        'denied' : {
            action  : 'setCurrentView'
        }
    },

    listen: {
        /*
         * Any controller that fires authorize needs us to handle it and then run the next steps
         * passed in to the request.
         */
        controller: {
            '*': {
                authorize: 'onAuthorize'
            },
            'authentication': {
                login: 'login',
                loginAs: 'loginAs',
                reset: 'reset',
                register: 'register'
            }
        }
    },

    validViews: {
        'login': {view: 'Login'},
        'register': {view: 'Register'},
        'lock': {view: 'LockScreen'},
        'denied': {view: 'DeniedScreen'},
        'passwordreset': {view: 'PasswordReset'}
    },

    /*
    * used to manage state for routes while authenticating
    */
    isAuthenticating: false,

    /*
     * the original route prior to auth changes
     */
    originalRoute: null,

    /*
     * the view passed in by the authorize request to place the auth items into typically the viewport.
     */
    authView: null,

    /*
     * the currently showing authorization view
     */
    currentView: null,

    /*
     * a function passed into the request on run after success
     */
    onSuccess: Ext.emptyFn,

    /*
     * a function passed into the request on run after failure
     */
    onFailure: Ext.emptyFn,

    /*
    * this request object needs : viewport , success function, failure function
    * any route is saved to this singleton controller and restored once a auth determination is made
    */
    onAuthorize: function(request){
         var me = this;

         if(me.isAuthenticating) return;

         me.isAuthenticating = true;
         me.originalRoute = window.location.hash;
         me.authView =request.view;
         me.onSuccess = request.success;
         me.onFailure = request.failure;

         me.redirectTo('login');

    },

    ensureAuthenticating: function(){
        if(!this.isAuthenticating){
            if(this.currentAuthView) {
                this.currentAuthView.destroy();
            }
            console.warn('Authorization : No Operation Performed - No valid authorizing request');
            return false;
        }
        //uses the current hash as the route and then load it into view
        this.setCurrentView();
        return true;
    },

    cleanupAuth: function(request){
        var me = this;
        me.isAuthenticating = false;

        if(me.currentView) {
            me.currentView.destroy();
        }

        me.authView = null;

        me.redirectTo(me.originalRoute);
        me.originalRoute = null;

    },

    setCurrentView: function(hashtag, is_popup) {
        var me=this,
            hash = hashtag || window.location.hash.substring(1);

        if(me.currentView) {
            me.currentView.destroy();
        }

        if(hash in me.validViews) {
            me.currentView = Ext.create("auth.view.authentication."+ me.validViews[hash].view);
        }

    },

    /*
    *
    *   THESE ARE STUB FUNCTIONS THAT SHOULD BE OVERRIDDEN BY YOUR APPLICATION LOGIC
    *
    */

    login: function(data){
        /*
         * Stub function meant to be overridden by application specific logic
         */
        var me = this;

        /*
         * Dummy logic tests for data and succeeds otherwise fails
         *
         */
        me.cleanupAuth();
        if(data){
            if (Ext.isFunction(me.onSuccess))
                me.onSuccess();
        }else{
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    loginAs: function(data){
        /*
         * Stub function meant to be overridden by application specific logic
         */
        var me = this;

        /*
         * Dummy logic tests for data and succeeds otherwise fails
         *
         */
        me.cleanupAuth();
        if(data){
            if (Ext.isFunction(me.onSuccess))
                me.onSuccess();
        }else{
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    reset: function(data){
        /*
         * Stub function meant to be overridden by application specific logic
         */
        var me = this;

        /*
         * Dummy logic tests for data and succeeds otherwise fails
         *
         */
        me.cleanupAuth();
        if(data){
            if (Ext.isFunction(me.onSuccess))
                me.onSuccess();
        }else{
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    register: function(data){
        /*
         * Stub function meant to be overridden by application specific logic
         */
        var me = this;

        /*
         * Dummy logic tests for data and succeeds otherwise fails
         *
         */
        me.cleanupAuth();
        if(data){
            if (Ext.isFunction(me.onSuccess))
                me.onSuccess();
        }else{
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    }
});