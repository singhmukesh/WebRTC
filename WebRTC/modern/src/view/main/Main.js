Ext.define('WebRTC.view.main.Main', {
    extend: 'Ext.Container',
    xtype: 'app-main',

    viewModel: {
        type: 'main'
    },

    controller: 'main',
    platformConfig: {
        phone: {
            controller: 'phone-main'
        }
    },

    layout: 'hbox',
    ui: 'soft-green',

    items: [
        {
            xtype: 'maintoolbar',
            docked: 'top',
            userCls: 'main-toolbar shadow'
        },
        {
            xtype: 'container',
            userCls: 'main-nav-container',
            reference: 'navigation',
            scrollable: true,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTree',
                    ui: 'navigation',
                    store: 'NavigationTree',
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        itemclick: 'onNavigationItemClick',
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                }
            ]
        },
        {
            xtype: 'navigationview',
            flex: 1,
            reference: 'mainCard',
            userCls: 'main-container',
            useTitleForBackButtonText: true,
            navigationBar: true
        }
    ]
});
