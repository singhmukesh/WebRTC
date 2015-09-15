Ext.define('WebRTC.view.chat.Members', {
    extend: 'Ext.Panel',
    xtype: 'chatmembers',

    bodyPadding: '0 16 16 16',
    layout:'fit',

    items:[{
        xtype:'dataview',
        autoScroll: true,
        loadMask: false,
        bind:{
          store: '{members}'
        },
        itemSelector: 'tr.member-wrap',
        tpl: [
            '<table cellspacing="0" cellpadding="8" width="100%">',
                '<tpl for=".">',
                    '<tr class="member-wrap">',
                        '<td width="125" style="font-weight:100;">',
                            '{name}',
                        '</td>',
                    '</tr>',
                '</tpl>',
            '</table>'
        ]
    }]


});
