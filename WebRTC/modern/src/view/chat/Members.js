Ext.define('WebRTC.view.chat.Members', {
    extend: 'Ext.dataview.List',
    xtype: 'chatmembers',
    // bodyPadding: 10,

    itemSelector: 'div.member-wrap',
    itemTpl: [
        '<div style="margin-bottom: 10px;" class="member-wrap">',
        '   <span class="x-fa fa-user" title="{name}"></span> {name}',
        '</div>'
    ]
    // ,

    // items: [
    //     {
    //         xtype: 'titlebar',
    //         title: 'Members',
    //         docked: 'top'
    //     }
    // ]
});
