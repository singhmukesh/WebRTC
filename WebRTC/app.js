/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'WebRTC',
    extend: 'WebRTC.Application',
    requires: [
        'WebRTC.*',
        'Material.override.button.Button' // for some reason this is not picked up automatically
    ],
    mainView: 'WebRTC.view.main.Viewport'
});

