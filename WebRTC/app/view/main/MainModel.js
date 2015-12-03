Ext.define('WebRTC.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',                // connects to viewModel/type

    data: {
        name: null,                         // set by Auth
        user: null,                         // set by Auth
        appTitle: 'Sencha Communicator',    // Title used for auth package
        authToken: 'myAuthTokenHere'        // This would be a user auth token like auth0 or  oAuth
    },
    formulas: {
        isUser: function (get) {
            return !!get('user');
        },
        isAdmin: function (get) {
            return get('name') == 'admin';    //shows config button if name is admin
        }

    }
});
