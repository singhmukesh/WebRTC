Ext.define('WebRTC.view.chat.History', {
    extend: 'Ext.Panel',
    xtype: 'chathistory',

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
        flex:1,
        bind: {
            store: '{messages}'
        },
        itemSelector: 'tr.chat-wrap',
        itemTpl: [
            '<table cellspacing="0" cellpadding="8" width="100%">',
            '<tpl for=".">',
            '<tr class="chat-wrap">',
            '<td width="125" style="font-weight:100;">',
            '{from}',
            '</td><td style="font-weight:400;">',
            // '{message}',
            '{[this.formatMessage(values.message)]}',
            '</td><td width="100" style="font-weight:400;text-align:right;">',
            '{shortDate}',
            '</td>',
            '</tr>',
            '</tpl>',
            '</table>',
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
    },{
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
