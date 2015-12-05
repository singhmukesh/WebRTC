Ext.define('videochat.view.chat.room.layout.Video', {
    extend: 'Ext.Panel',
    xtype: 'videolayout',
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            reference: 'fullscreenvideobox',
            region: 'center',
            layout: 'fit',
            flex: 5,
            tbar: {
                xtype: 'roomcontrols'
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'fit',
                    isMyVideoBox: true,
                    hidden: true
                }
            ]
        },
        {
            xtype: 'tabpanel',
            reference: 'roominfo',
            region: 'east',
            title: 'Room Information',
            // width: 400,
            flex: 2,
            collapsible: true,
            split: true,
            header: false,
            tabBar: {
                layout: {
                    pack: 'center',
                    align: 'stretch'
                },
                defaults: {
                    flex: 1
                }
            },
            dockedItems: [
                {
                    xtype: 'chatinfo',
                    dock: 'top'
                }
            ],
            items: [
                {
                    xtype: 'chatmembers',
                    title: 'Participants'
                },
                {
                    xtype: 'chathistory',
                    title: 'Chat'
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'panel',
            dock: 'bottom',
            itemId: 'remotestreams',
            bodyCls: 'video-layout-remote-streams',
            scrollable: 'horizontal',
            hidden: true,
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            height: 220,
            defaults: {
                width: 200,
                height: 200,
                margin: 10
            }
        }
    ]
});