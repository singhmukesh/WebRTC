Ext.define('WebRTC.view.main.Toolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'maintoolbar',

    requires: [
        'Ext.SegmentedButton'
    ],

    items: [
        {
            // This component is moved to the floating nav container by the phone profile
            xtype: 'component',
            reference: 'logo',
            userCls: 'main-logo',
            html: 'Sencha'
        },
        {
            xtype: 'button',
            ui: 'header',
            iconCls: 'x-fa fa-bars',
            margin: '0 0 0 10',
            listeners: {
                tap: 'onToggleNavigationSize'
            }
        },
        {
            xtype: 'spacer'
        },
        {
            xtype:'button',
            ui: 'header',
            iconCls:'x-fa fa-comments',
            href: '#room',
            margin: '0 7 0 0',
            handler: 'toolbarButtonClick'
        },
        {
            xtype:'button',
            ui: 'header',
            iconCls:'x-fa fa-gear',
            href: '#admin',
            hidden: true,
            margin: '0 7 0 0',
            handler: 'toolbarButtonClick'
        },
        {
            xtype:'button',
            ui: 'header',
            iconCls:'x-fa fa-question',
            href: '#faq',
            hidden: true,
            margin: '0 7 0 0',
            handler: 'toolbarButtonClick'
        },
        {
            xtype:'button',
            ui: 'header',
            iconCls:'x-fa fa-user',
            href: '#user',
            margin: '0 7 0 0',
            handler: 'toolbarButtonClick'
        }
    ]
});
