/**
 * This class provides the modal Ext.Window support for all Authentication forms.
 * It's layout is structured to center any Authentication dialog within it's center,
 * and provides a backGround image during such operations.
 */
Ext.define('auth.view.authentication.LockingWindow', {
    extend: 'Ext.window.Window',
    xtype: 'lockingwindow',

    requires: [
        'auth.view.authentication.AuthenticationController',
        'auth.view.authentication.AuthenticationModel',
        'Ext.layout.container.VBox'
    ],


    controller: 'authentication',
    viewModel: {
        type: 'authentication'
    },


    cls: 'auth-locked-window',
    closable: false,
    resizable: false,
    autoShow: true,
    titleAlign: 'center',
    maximized: true,
    modal: true,

    bodyStyle: 'background: transparent;',
    html:'<video autoplay loop class="bgvid">' +
    '<source type="video/mp4" src="http://ak0.picdn.net/shutterstock/videos/4129582/preview/stock-footage-young-and-attractive-multi-ethnic-group-of-professionals-are-having-a-business-meeting-with-a.mp4">' +
    '<source type="video/webm" src="http://ak0.picdn.net/shutterstock/videos/4129582/preview/stock-footage-young-and-attractive-multi-ethnic-group-of-professionals-are-having-a-business-meeting-with-a.webm">' +
    '</video>',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    }


});
