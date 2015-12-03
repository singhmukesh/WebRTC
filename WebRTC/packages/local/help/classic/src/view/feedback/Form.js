Ext.define('help.view.feedback.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'helpfeedbackform',

    bodyPadding: 10,
    autoScroll: true,

    controller: 'helpfeedbackform',

    /*
     * Seek out the first enabled, focusable, empty textfield when the form is focused
     */
    defaultFocus: 'textfield:focusable:not([hidden]):not([disabled]):not([value])',

    defaultButton: 'okButton',

    defaults:{
        anchor: '100%',
        margin: '10',
        labelWidth: 200
    },



    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'label',
            cls: 'info-top-label',
            minHeight: 40,
            text: 'Let us know how we can improve this page.'
        },
        {
            xtype: 'textareafield',
            reference: 'comment',
            emptyText: 'Enter comments here...',
            flex: 1,
            value: '',
            allowBlank: false
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            cls: 'colored-menu',
            dock: 'top',
            hidden: true,
            items: [
                {
                    iconCls: 'x-fa fa-bars',
                    action:'hamburger',
                    // handler: 'onHamburgerClick',
                    menu: [{
                        text:'Notifications'
                    },{
                        text:'This page...'
                    }]
                }
            ]
        },
        {
        xtype: 'toolbar',
        cls: 'colored-menu',
        dock: 'bottom',
        items: [
            '->',
            {
                iconCls: 'x-fa fa-send',
                reference: 'okButton',
                action:'ok',
                formBind: true,
                handler: 'onSendClick'
            },
            '->'
        ]
    }]


});
