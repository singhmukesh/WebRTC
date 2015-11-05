Ext.define('WebRTC.view.main.Viewport', {
    extend: 'Ext.navigation.View',
    xtype: 'app-main',

    requires: [
        'WebRTC.view.main.ViewportController',
        'WebRTC.view.chat.RoomsContainer'
    ],

    viewModel: {
        type: 'mainviewport'
    },
    controller: 'mainviewport',

    useTitleForBackButtonText: true,

    items: []
});
