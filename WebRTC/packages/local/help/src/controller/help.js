/**
 * @class help.controller.Help
 * @extend Ext.app.Controller
 *
 *
 */
Ext.define('help.controller.Help', {
    extend: 'Ext.app.Controller',
    id: 'help',

    /*   requires: [
     'help.view.notifications.Main'
     ],

     mixins: ['help.mixin.HelpViewRenderer'],
     */
    routes: {
        'help': {
            action: 'setCurrentView'
        },
        'feedback': {
            action: 'setCurrentView'
        },
        'notifications': {
            action: 'setCurrentView'
        }
    },

    listen: {
        component: {
            '*': {
                initHelp: 'doInitHelp',
                initFeedback: 'doInitFeedback'
            }
        }
    },


    setCurrentView: function () {
    },

    doInitHelp: function (eventView, desiredContainer) {
        var helpPanel = Ext.ComponentQuery.query('panel[title=Help]')[0];

        if (!helpPanel) {
            desiredContainer.add({
                xtype: 'helpfeedbackform',
                cls: 'insetpanel',
                region: 'east',
                title: 'Help',
                stateful: true,
                stateId: 'helppanel.east',
                // split: true,
                closable: true,
                closeAction: 'hide',
                collapsible: false,
                collapsed: false,
                width: 350,
                minWidth: 100
            })
        } else {
            helpPanel.show();
        }
    },

    doInitFeedback: function () {
    },

    doInitNotifications: function () {
    }

});