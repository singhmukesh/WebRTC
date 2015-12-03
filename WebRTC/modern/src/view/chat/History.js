Ext.define('WebRTC.view.chat.History', {
    extend: 'Ext.Panel',
    xtype: 'chathistory',

    requires: ['WebRTC.view.chat.HistoryController'],

    controller: 'chathistory',

    bodyPadding: 10,
    layout:{
        type:'vbox',
        vertical: true
    },

    items: [
        {
            xtype: 'list',
            loadMask: false,
            reference: 'historylist',
            autoScroll: true,
            scrollToTopOnRefresh: false,
            flex:1,
            bind: {
                store: '{messages}'
            },
            itemSelector: 'div.chat-wrap',
            itemTpl: [
                '<div class="chat-wrap">',
                '<span class="from">{from}</span>',
                '{[this.formatMessage(values.message)]}',
                '<div class="short-date">{shortDate}</div>',
                '</div>',
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
                    }
                }
            ],
            listeners: {
                scope: 'controller',
                painted:'scrollToBottom',
                refresh:'scrollToBottom'

            }
        },
        {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [
                {
                    xtype:'textfield',
                    flex:1,
                    style: 'margin-right:0px;',
                    name:'text',
                    reference: 'chattext'
                    // listeners: {
                    //     specialkey: 'onSpecialKey'
                    // }
                },{
                    xtype: 'button',
                    iconCls: 'x-fa fa-comment',
                    ui: 'bright-blue round',
                    style:'margin-left:5px;',
                    handler: 'chatSend'

                }
            ]
        }
    ]
});
