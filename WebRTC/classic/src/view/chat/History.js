Ext.define('WebRTC.view.chat.History', {
    extend: 'Ext.Panel',
    xtype: 'chathistory',
    controller: 'chathistory',
    layout:'fit',

    dockedItems: [{
        xtype: 'textfield',
        reference: 'chatFilter',
        dock: 'top',
        margin: 10,
        emptyText: 'Search Chat History',
        triggers: {
            clear: {
                cls: 'x-form-clear-trigger',
                handler: 'onFilterClearTriggerClick',
                hidden: true,
                scope: 'controller'
            },
            search: {
                cls: 'x-form-search-trigger',
                weight: 1,
                handler: 'onFilterSearchTriggerClick',
                scope: 'controller'
            }
        },
        listeners: {
            change: 'onFilterFieldChange',
            buffer: 300
        }
    }],

    items: [{
        xtype: 'dataview',
        loadMask: false,
        reference: 'historylist',
        autoScroll: true,
        bind: {
            store: '{messages}'
        },
        itemSelector: 'tr.chat-wrap',
        listeners:{
          itemdblclick: 'onDblClick',
          afterrender: 'scrollToBottom'
        },
        tpl: [
            '<div class="marginfix"><table class="chatTable">',
            '<tpl for=".">',
            '<tr class="chat-wrap">',
            '<td class="from">',
            '{from}',
            '</td>',
            '<td class="message selectable">',
            '{[this.formatMessage(values.message)]}',
            '</td>',
            '<td class="date">',
            '{shortDate}',
            '</td>',
            '<td class="edited">',
            '{[this.formatEdited(values.edited)]}',
            '</td>',
            '</tr>',
            '</tpl>',
            '</table></div>',
            {
                formatMessage: function (message) {
                    var matcher = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/ig;
                    
                    function anchorTag(match) {
                        var url = match;
                        if (!Ext.String.startsWith(match, 'http', true)) {
                            url = 'http://'+match;
                        }

                        return '<a href='+url+' target="_blank">'+match+'</a>'
                    }

                    return message.replace(matcher, anchorTag);
                },
                formatEdited: function (edited) {
                    if(edited)
                        return '<span class="x-fa fa-pencil"></span>';
                    return ;
                }
            }
        ]
    }],

    bbar:[{
        xtype:'textfield',
        name:'text',
        reference: 'chattext',
        enableKeyEvents: true,
        listeners: {
            keyup: 'onKeyUp',
            specialkey: 'onSpecialKey'
        },
        flex:1
    },{
        iconCls: 'x-fa fa-comment',
        // ui: 'bright-blue round',
        plain: true,
        listeners: {
            click: 'chatSend'
        }
    }]

});
