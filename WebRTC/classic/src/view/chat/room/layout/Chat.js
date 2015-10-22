Ext.define('WebRTC.view.chat.room.layout.Chat', {
    extend: 'Ext.Panel',
    xtype: 'chatlayout',
    layout: {
        type: 'box',
        vertical: false,
        align: 'stretch'
    },
    items: [
        {
            layout: {
                type: 'border',
                vertical: false,
                align: 'stretch'
            },
            flex: 4,
            items: [
                {
                    layout: {
                        type: 'box',
                        vertical: true,
                        align: 'stretch'
                    },
                    region: 'center',
                    flex: 3,
                    bodyPadding: 8,
                    items: [
                        {
                            xtype: 'chatinfo',
                            hidden: false
                        }, {
                            xtype: 'chathistory',
                            reference: 'chathistory',
                            flex: 2
                        }
                    ]
                },
                {
                    hidden: false,
                    region: 'east',
                    collapsable: true,
                    collasped: true,
                    split:true,
                    layout: {
                        type: 'box',
                        vertical: true,
                        align: 'stretch'
                    },
                    minWidth: 250,
                    resizable: true,
                    flex: 1,
                    items: [
                        {
                            xtype: 'roomcontrols',
                            docked: 'top'
                        },{
                            xtype:'panel',
                            // bodyPadding: 3,
                            bodyStyle: 'background-color: #cacaca; margin:10px;',
                            layout: {
                                type: 'box',
                                pack: 'center',
                                align: 'center'
                            },
                            items: [{
                                xtype: 'container',
                                isMyVideoBox: true,
                                bodyPadding: 4,
                                // cls: 'youBox',
                                layout: 'fit',
                                hidden: true,
                                maxWidth: 400,
                                maxHeight: 400,
                                minwidth: 200,
                                height: 150,
                                width: 225,
                                minHeight: 110
                            }],
                            bind: {
                                hidden: '{!isWebRTCSupported}'
                            }

                        },
                        {
                            // title: 'Members',
                            // iconCls: 'x-fa fa-group fa-lg',
                            // collapsable: true,
                            xtype: 'chatmembers',
                            minHeight: 80,
                            flex: 1
                        }, {
                            xtype: 'chatvideowall',
                            itemId: 'remotestreams',
                            bind: {
                                title: '{room.name} Wall',
                                hidden: '{!showStreams}'
                            },
                            header: {
                                listeners: {
                                    dblclick: function(){
                                        // WebRTC.util.Logger.log('clicked');
                                        alert('dble');
                                    }
                                }
                            },
                            listeners:{
                                hide: 'onWallHide'

                            },
                            //hidden: true,
                            // bodyPadding: 10,
                            minHeight: 200,
                            autoScroll: true,
                            flex: 1
                        }, {
                            title: 'Files',
                            hidden: true,
                            reference: 'chatfiles',
                            iconCls: 'x-fa fa-paperclip',
                            flex: 1
                        }
                    ]
                }
            ]
        }

    ]
});