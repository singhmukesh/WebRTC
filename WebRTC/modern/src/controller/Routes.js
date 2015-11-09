//Modern specific extension of navigation controller
Ext.define('WebRTC.controller.Routes', {
    extend: 'WebRTC.controller.GlobalRoutes',
    id: 'Nav',
    alias: 'controller.Routes',

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
        if(!id){
            this.onRouteViewportComponent('room',{
                xtype:'chatroomscontainer',
                reference: 'roomtabs',
                flex: 1,
                routeId: 'room',
                title: 'Rooms'
            });
        }else{
            this.onRouteViewportComponent('room',{
                xtype:'chatroom',
                reference: 'room',
                flex: 1,
                routeId: 'room/' + id,
                title: 'Rooms'
            });
        }
    }
});
