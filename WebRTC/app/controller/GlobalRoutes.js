Ext.define('WebRTC.controller.GlobalRoutes', {
    extend: 'Ext.app.Controller',

    routes : {
        'home' : {
            action  : 'onRouteHome'
        },
        'room' : {
            before  : 'onRouteBeforeRoom',
            action  : 'onRouteRoom'
        },
        'room/:id' : {
            before  : 'onRouteBeforeRoomId',
            action  : 'onRouteRoom'
        },
        'token/:id' : {
            before  : 'onRouteBeforeToken',
            action  : 'onRouteToken',
            conditions : {
                ':id' : '(.*)'
            }
        },
        'logout' : {
            action  : 'onRouteLogout'
        },
        'settings' : {
            before  : 'onRouteBeforeSettings',
            action  : 'onRouteSettings'
        },
        ':node': 'onRouteChange'
    },

    //These are routes that are handled by their own packages and should be ignored
    knownRoutes: [
        'home',
        'room',
        'room/:id',
        'token/:id',
        'settings',
        'login',
        'logout',
        'register',
        'lock',
        'newpassword',
        'guest',
        'denied',
        'newemail'
    ],

    listen: {
        controller: {
            'auth':{
                // configure: 'onAdminSetup',
                // initDone: 'onAuthInit',
                islogin: 'onAuthIsLogin',
                islogout: 'onAuthIsLogout',
                login: 'onAuthLogin'
            },
            '#' : {
                unmatchedroute : 'onRouteUnmatched'
            }
        }
    },

    //empty object that will contain route to continue with if authorized
    _authorizingRoute: null,

    //Hide everything on the viewport except our route.
    clearViewport: function (doRemove){
        var viewport = Ext.ComponentQuery.query('app-main')[0];
        Ext.each(viewport.items.items, function(childPanel) {
            if(!!doRemove){
                viewport.remove(childPanel, true);
            }else{
                childPanel.hide();
            }
        });
    },

    //add or show a new component based on the route
    onRouteViewportComponent: function (xtype, params) {
        this.clearViewport();
        if(Ext.ComponentQuery.query(xtype)[0]){
            Ext.ComponentQuery.query(xtype)[0].show();
        }else{
            Ext.ComponentQuery.query('app-main')[0].add(params)
        }
    },



    onRouteUnmatched: function(route) {
        if(!!route){
            WebRTC.util.Logger.log('unmatched route' + route);
            window.location = '/cms/';
        }
    },

    onRouteHome: function() {
        var user = Ext.ComponentQuery.query('app-main')[0].getViewModel().get('user');
        if(user){
            window.location.hash = '#room';
        }else{
            window.location = '/cms/';
        }
    },



    onRouteBeforeRoom : function(action) {
        var me = this;
        WebRTC.util.Logger.log('Before Route Room');

        me.fireEvent('isAuthReady',function(isReady) {
            me._authorizingRoute = {
                action: action
            };
            me.fireEvent('authorize');
        });
    },

    onRouteBeforeRoomId : function(id, action) {
        this.onRouteBeforeRoom(action);
    },

    onRouteRoom: function(id){
        var vm = Ext.ComponentQuery.query('app-main')[0].getViewModel();

        //Chat rooms into center
        this.onRouteViewportComponent('chatroomscontainer',{
            xtype:'chatroomscontainer',
            region:'center',
            flex:5,
            layout:'fit',
            startupRoom: id,
            bind: {
                title: 'Sencha Communicator  | {user.fn}'
            },
            reference: 'roomtabs'
        });

        if(1==0){ //!vm.isAdmin(vm)
            this.onRouteViewportComponent('chatpresense',{
                title: 'All Users',
                xtype: 'chatpresense',
                region:'west',
                collapsable: true,
                collasped: true,
                /*bind: {
                 hidden: '{!isAdmin}'
                 },*/
                split:true,
                flex: 1
            });
        }

    },

    // this will be used when we implment more room security
    onRouteRoomSetup: function(room, action){
        /*
         var me= this,
         userCookie = Ext.util.Cookies.get('user');


         if( room.get('isPublic') ){
         action.resume();
         }else{
         if( room.get('isPrivate') ){
         this.redirectTo('denied');
         }else{
         action.resume();
         }
         }
         */
    },


    onRouteBeforeToken : function(id, action) {
        var me=this,
            qs= Ext.Object.fromQueryString(location.search);

        if(qs['pwd']){
            Ext.Ajax.request({
                url     : '/data/jwtdecode/' + id +'?pwd=' + qs['pwd'],
                success : function(response) {
                    var store = Ext.StoreManager.lookup('rooms');
                    me.tokenInfo = JSON.parse(response.responseText);
                    //add the private room to the store.
                    store.add(me.tokenInfo);
                    action.resume();
                },
                failure : function(response) {
                    // var error = JSON.parse(response.responseText);
                    Ext.Msg.alert('Denied', 'The token for this room is no longer valid');
                    action.stop();
                }
            });
        }else{
            Ext.Msg.prompt('Password','Please enter password for this room',function(buttonId,value){
                if(value) {
                    Ext.Ajax.request({
                        url     : '/data/jwtdecode/' + id +'?pwd=' + value,
                        success : function(response) {
                            var store = Ext.StoreManager.lookup('rooms');
                            me.tokenInfo = JSON.parse(response.responseText);
                            //add the private room to the store.
                            store.add(me.tokenInfo);
                            action.resume();
                        },
                        failure : function(response) {
                            // var error = JSON.parse(response.responseText);
                            Ext.Msg.alert('Denied', 'The password entered is no longer valid');
                            action.stop();
                        }
                    });
                }else{
                    me.redirectTo('')
                }
            });
        }



    },

    onRouteToken: function(){
        var id = this.tokenInfo.id;
        this.onRouteRoom(id)
    },


    onRouteLogout: function (){
        this.redirectTo('home');
    },

    //user was already logged in
    onAuthIsLogin: function(){
        if(this._authorizingRoute){
            this._authorizingRoute.action.resume();
        }
    },

    //login successful
    onAuthLogin: function(authData){
        if(this._authorizingRoute){
            this._authorizingRoute.action.resume();
        }
    },

    //user was not logged in - so log them in
    onAuthIsLogout: function(){
        this.redirectTo('login');
    },

    //any change in route that isn't specifically fired defaults to this
    onRouteChange: function (hashTag) {

        WebRTC.util.Logger.log('Route Change');

        // let other known routes process
        if(Ext.Array.contains(this.knownRoutes, hashTag) ){
            WebRTC.util.Logger.log('Ignore known route');
            return false;
        }

        this.setCurrentView(hashTag);
    },

    // this is mainly for modern viewport card stack
    // it makes the hashtag the current active card
    setCurrentView: function (hashTag) {
        WebRTC.util.Logger.log('Setting Current View');
        hashTag = (hashTag || '').toLowerCase();

        var appMain = Ext.ComponentQuery.query('app-main')[0],
            vc = appMain.getController(),
            mainCard = Ext.ComponentQuery.query('navigationview[reference=mainCard]')[0],
            refs = vc.getReferences(),
            navigationTree = vc.navigationTree,
            store = navigationTree.getStore(),
            node = store.findNode('routeId', hashTag) ||
                store.findNode('viewType', hashTag),
            item = mainCard.child('component[routeId=' + hashTag + ']');

        if(!node){
            this.onRouteUnmatched(hashTag)
        }

        if (!item) {
            item = mainCard.add({
                xtype: node.get('viewType'),
                routeId: hashTag
            });
        }

        mainCard.setActiveItem(item);

        navigationTree.setSelection(node);



        //if (newView.isFocusable(true)) {
        //    newView.focus();
        //}
    }
});
