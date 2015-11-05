Ext.define('WebRTC.controller.Navigation', {
    extend: 'WebRTC.controller.GlobalNavigation',
    id: 'Nav',
    alias: 'controller.Navigation',

    onRouteRoom: function(id){
        var vm = Ext.ComponentQuery.query('app-main')[0].getViewModel();

        //Chat rooms into center
        this.onRouteViewportComponent('chatroomscontainer',{
            xtype:'chatroomscontainer',
            reference: 'roomtabs',
            title: 'Rooms'
        });



    }
});
