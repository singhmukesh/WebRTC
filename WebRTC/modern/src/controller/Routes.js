//Modern specific extension of navigation controller
Ext.define('WebRTC.controller.Routes', {
    extend: 'WebRTC.controller.GlobalRoutes',
    alias: 'controller.Routes',


    //any change in route that isn't specifically fired defaults to this
    onRouteChange: function (hashTag) {

        WebRTC.util.Logger.log('Route Change');

        // let other known routes process
        if (Ext.Array.contains(this.knownRoutes, hashTag)) {
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

        if (!node) {
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
    },

    //add or setActive component based on the route
    onRouteViewportComponent: function (hashTag, params) {
        var mainCard = Ext.ComponentQuery.query('navigationview[reference=mainCard]')[0],
           // navigationTree = mainCard.getViewController().navigationTree,
            item = mainCard.child('component[routeId=' + (params.routeId || hashTag) + ']');

        if (!item) {
            item = mainCard.add(params);
        }

        mainCard.setActiveItem(item);

        // navigationTree.setSelection(node);
    },

    onRouteRoom: function(id){
        var me = this;

        //we will need this rooms list loaded no matter what room
        this.onRouteViewportComponent('room',{
            xtype:'chatroomscontainer',
            reference: 'roomtabs',
            flex: 1,
            routeId: 'room'
        });

        if(id){
            me.id = id;
            me.checkStoreAndDisplayRoom();
        }
    },

    checkStoreAndDisplayRoom: function(){
        var me = this,
            id = me.id,
            store = Ext.StoreManager.lookup('rooms'),
            record;

        if  (store) {
            if (store.isLoaded()) {
                record = store.getById(id);
                me.displayRoom(record);
            } else {
                store.on('load', me.checkStoreAndDisplayRoom, me, {single: true});
            }
        } else {
            Ext.Function.defer(me.checkStoreAndDisplayRoom, 1200);
        }
    },

    displayRoom: function (record) {
        if (!record) return false;

        var me = this,
            mainView = Ext.ComponentQuery.query('app-main')[0],
            user = mainView.getViewModel().get('user'),
            navView = Ext.ComponentQuery.query('navigationview[reference=mainCard]')[0],
            id = record.get('id'),
            room;


        // navView.getViewModel().set('room', record);

        room = navView.push({
            xtype: 'chatroom',
            // closable: true,
            // iconCls: 'x-fa fa-comments',
            bind: {
                title: '{room.name}'
            },
            roomId: id,
            routeId: 'room/' + id,
            flex: 1
        });

        room.getViewModel().set('room', record);

        room.getViewModel().getStore('messages').getProxy().getExtraParams().room = id;

        // Notify TokBox in this case
        me.fireEvent('joinroom', room, record, user);
    }

});
