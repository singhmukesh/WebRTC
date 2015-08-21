Ext.define('WebRTC.view.chat.Members', {
    extend: 'Ext.dataview.List',
    xtype: 'chatmembers',
    bodyPadding: 10,

    itemSelector: 'div.member-wrap',
    itemTpl: [
        '<tpl for=".">',
        '<div style="margin-bottom: 10px;" class="member-wrap">',
        '<span class="x-fa fa-user" title="{name}"> </span> {name}',
        '<br/>',
        '</div>',
        '</tpl>'
    ]
});
