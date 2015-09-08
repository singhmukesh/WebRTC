Ext.define('WebRTC.view.chat.History', {
    extend: 'Ext.Panel',
    xtype: 'chathistory',

    bodyPadding: 10,
    
    layout:{
        type:'vbox'
    },

    items: [
        {
            xtype: 'list',
            loadMask: false,
            reference: 'historylist',
            autoScroll: true,
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

                            return '<span class="link" data-href='+url+'>'+match+'</span>'
                        }

                        return message.replace(matcher, anchorTag);
                    }
                }
            ],
            listeners: {
                itemtap: function (list, index, target, record, e, eOpts) {
                    if (e.target.className === 'link') {
                        url = e.target.dataset['href'];
                        if (url) {
                            cordova.InAppBrowser.open(url, '_blank');
                        }
                    }
                }
            }
        },
        {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [
                {
                    xtype:'textfield',
                    flex:1,
                    name:'text',
                    reference: 'chattext',
                    listeners: {
                        specialkey: 'onSpecialKey'
                    }
                },{
                    xtype: 'button',
                    iconCls: 'x-fa fa-smile-o',
                    plain: true,
                    listeners: {
                        tap: 'chatSend'
                    }
                }
            ]
        }
    ]
});
