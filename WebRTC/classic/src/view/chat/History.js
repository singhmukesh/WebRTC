Ext.define('WebRTC.view.chat.History', {
    extend: 'Ext.Panel',
    xtype: 'chathistory',

    bodyPadding: '24 36 24 24',
    layout:'fit',

    items: [{
        xtype: 'dataview',
        loadMask: false,
        reference: 'historylist',
        autoScroll: true,
        bind: {
            store: '{messages}'
        },
        itemSelector: 'tr.chat-wrap',
        tpl: [
            '<table cellspacing="0" cellpadding="8" width="100%">',
                '<tpl for=".">',
                    '<tr class="chat-wrap">',
                        '<td width="125" class="chat-from" style="font-weight:100;border-bottom: solid 1px #eee;padding-left:0">',
                            '{from}',
                        '</td>',
                        '<td style="font-weight:400;border-bottom: solid 1px #eee;">',
                            '{[this.formatMessage(values.message)]}',
                        '</td>',
                        '<td width="100" class="chat-date" style="font-weight:400;border-bottom: solid 1px #eee;text-align:right;">',
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

                        return '<a href='+url+' target="_blank">'+match+'</a>'
                    }

                    return message.replace(matcher, anchorTag);
                }
            }
        ]
    }],

    bbar: {
        padding: '24 36 12 24',
        items: [
            {
                xtype:'textfield',
                name:'text',
                reference: 'chattext',
                listeners: {
                    specialkey: 'onSpecialKey'
                },
                flex:1
            }
            //,{
            //    iconCls: 'x-fa fa-smile-o',
            //    plain: true,
            //    listeners: {
            //        click: 'chatSend'
            //    }
            //}
        ]
    },

    afterLayout: function () {
        var addButtonOffsets = [0, -48];

        this.callParent(arguments);

        this.addButton = this.addButton || this.add({
                xtype: 'floatingactionbutton',
                html: '<i class="material-icons" style="margin-left: 2px;">send</i>', // added margin as it doesn't look centered otherwise
                handler: 'chatSend'
            });

        //this.addButton.showBy(this, 'c-br');
        this.addButton.showBy(this, 'c-br', addButtonOffsets);
    }

});
