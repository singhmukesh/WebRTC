Ext.define('WebRTC.view.chat.room.layout.Video', {
    extend: 'Ext.Panel',
    xtype: 'videolayout',
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            reference: 'speakervideobox',
            region: 'center',
            layout: 'fit',
            tbar: {
                xtype: 'roomcontrols'
            },
            dockedItems: [
                {
                    xtype: 'panel',
                    dock: 'bottom',
                    itemId: 'remotestreams',
                    bodyCls: 'video-layout-remote-streams',
                    scrollable: 'horizontal',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },

                    height: 220,
                    defaults: {
                        width: 200,
                        height: 200,
                        margin: 10
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'fit',
                            isMyVideoBox: true,
                            hidden: true
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'tabpanel',
            reference: 'roominfo',
            region: 'east',
            title: 'Room Information',
            width: 400,
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
                    title: 'Partecipats'
                },
                {
                    xtype: 'chathistory',
                    title: 'Chat'
                }
            ]
        }
    ]
});