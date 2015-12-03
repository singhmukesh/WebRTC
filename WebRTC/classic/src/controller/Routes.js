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

        // this.setCurrentView(hashTag);
    }

});
