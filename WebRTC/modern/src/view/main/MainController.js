Ext.define('WebRTC.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen: {
        component: {
            'app-main': {
                back: 'onNavigationPop'
            }
        },
        controller: {
            'auth':{
                userData: 'onUserDataChanged'
            }
        }
    },

    config: {
        showNavigation: true
    },

    collapsedCls: 'main-nav-collapsed',

    init: function (view) {
        var me = this,
            refs = me.getReferences();

        me.callParent([ view ]);

        me.nav = refs.navigation;
        me.navigationTree = refs.navigationTree;
    },


    toolbarButtonClick: function(btn){
        var href = btn.config.href;
        this.redirectTo(href);
    },

    onToggleNavigationSize: function () {
        this.setShowNavigation(!this.getShowNavigation());
    },

    onNavigationItemClick: function () {
        // The phone profile's controller uses this event to slide out the navigation
        // tree. We don't need to do anything but must be present since we always have
        // the listener on the view...
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }
    },

    updateShowNavigation: function (showNavigation, oldValue) {
        // Ignore the first update since our initial state is managed specially. This
        // logic depends on view state that must be fully setup before we can toggle
        // things.
        //
        if (oldValue !== undefined) {
            var me = this,
                cls = me.collapsedCls,
                refs = me.getReferences(),
                logo = refs.logo,
                navigation = me.nav,
                navigationTree = refs.navigationTree,
                rootEl = navigationTree.rootItem.el;

            navigation.toggleCls(cls);
            logo.toggleCls(cls);

            if (showNavigation) {
                // Restore the text and other decorations before we expand so that they
                // will be revealed properly. The forced width is still in force from
                // the collapse so the items won't wrap.
                navigationTree.setMicro(false);
            } else {
                // Ensure the right-side decorations (they get munged by the animation)
                // get clipped by propping up the width of the tree's root item while we
                // are collapsed.
                rootEl.setWidth(rootEl.getWidth());
            }

            logo.element.on({
                transitionend: function () {
                    if (showNavigation) {
                        // after expanding, we should remove the forced width
                        rootEl.setWidth('');
                    } else {
                        navigationTree.setMicro(true);
                    }
                },
                single: true
            });
        }
    },


    onUserDataChanged: function(user){
        var vm = this.getViewModel();
        vm.set('user', user);
        vm.set('userid', user['id']);
        vm.set('name', user['fn']);

        vm.getStore('rooms').load();
    },

    onNavigationPop: function () {
        Ext.util.History.back();
        var dataview = this.getView().down('dataview');
        dataview.deselectAll(true);
    }

    /*
     onRouteBeforeRoom : function(id, action) {
     var me = this;
     this.fireEvent('authorize');

     if(id != "undefined" && !!id){
     action.resume();
     }else{
     action.stop();
     }

     },

     onRouteRoom: function(id){
     var me = this;

     function checkStoreAndDisplayRoom() {
     var store = me.getViewModel().getStore('rooms'),
     record;

     if  (store) {
     if (store.isLoaded()) {
     record = store.getById(id)
     displayRoom(record);
     } else {
     store.on('load', checkStoreAndDisplayRoom, me, {single: true});
     }
     } else {
     Ext.Function.defer(checkStoreAndDisplayRoom, 1200);
     }
     }

     function displayRoom(record) {
     if(record){
     me.displayRoom(record);
     }
     }

     checkStoreAndDisplayRoom();
     },

     displayRoom: function (record) {
     if (!record) return false;

     var me = this,
     navView = me.getView(),
     id = record.get('id'),
     name = me.getViewModel().get('name'),
     room;


     navView.getViewModel().set('room', record);



     room = navView.push({
     xtype: 'chatroom',
     // title: roomName,
     closable: true,
     iconCls: 'x-fa fa-comments',
     roomId: id,
     flex: 1
     });

     room.getViewModel().set('room', record);

     room.getViewModel().getStore('messages').getProxy().getExtraParams().room = id;

     // Notify TokBox in this case
     me.fireEvent('joinroom', room, record.data, name);
     },



     onRouteUnmatched:function(route){
     console.log('unmatched route' , route);
     this.redirectTo('home');
     },



     */

});
