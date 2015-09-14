Ext.define('WebRTC.view.chat.Room', {
    extend: 'Ext.Panel',
    xtype: 'chatroom',

    ui: 'card',

    layout: {
        type: 'box',
        vertical: true,
        align: 'stretch'
    },

    controller: 'chatroom',

    viewModel: {
        type: 'chatroom'
    },

    tbar : {
        height: 64,
        cls: 'material-bottom-border',
        items: [
            {
                xtype: 'title',
                bind: {
                    text: '{room.name}'
                }
            },
            '->',
            {
                html: '<i class="material-icons">call</i>'
            },
            {
                html: '<i class="material-icons">videocam</i>'
            },
            {
                html: '<i class="material-icons">visibility</i>',
                disabled: true
            },
            {
                html: '<i class="material-icons">mic</i>',
                disabled: true
            }
        ]
    },

    items: [
        {
            layout: {
                type: 'box',
                vertical: false,
                align: 'stretch'
            },
            flex:4,
            items:[
                {
                    layout: {
                        type: 'box',
                        vertical: true,
                        align: 'stretch'
                    },
                    flex: 4,
                    bodyPadding: 6,
                    items: [
                        //{
                        //    xtype: 'chatinfo',
                        //    bodyPadding: 6,
                        //    hidden: false
                        //},
                        {
                            xtype: 'chathistory',
                            reference: 'chathistory',
                            flex: 2
                        }
                    ]
                },
                {
                    hidden: false,
                    layout: {
                        type: 'box',
                        vertical: true,
                        align: 'stretch'
                    },
                    flex: 1,
                    items: [
                        {
                            items: {
                                style: 'display: block; background-color:#eeeeee; background-image: url(https://static.opentok.com/webrtc/v2.6.0/images/rtc/audioonly-silhouette.svg); background-position: center bottom; background-repeat: no-repeat; background-size: auto 76%;',
                                xtype: 'container',
                                layout: 'fit',
                                minHeight: 180,
                                reference: 'you'
                            },
                            bind:{
                                hidden: '{!isWebRTCSupported}'
                            },
                            bodyPadding: 6,
                            bbar: [
                                {
                                    bind: {
                                        disabled: '{inVideoCall}',
                                        iconCls: '{audioCallIcon}'
                                    },
                                    tooltip: 'Toggle Audio Pubish',
                                    listeners: {
                                        click: 'onAudioCallRoom'
                                    }
                                },
                                {
                                    bind: {
                                        disabled: '{inAudioCall}',
                                        iconCls: '{videoCallIcon}'
                                    },
                                    tooltip: 'Toggle Video Pubish',
                                    listeners: {
                                        click: 'onVideoCallRoom'
                                    }
                                }
                                , '->',
                                {
                                    iconCls: 'x-fa fa-eye',
                                    tooltip: 'Toggle Camera',
                                    bind: {
                                        disabled: '{!inVideoCall}',
                                        iconCls: '{videoToggleIcon}'
                                    },
                                    listeners: {
                                        click: 'onPublishVideoToggle'
                                    }
                                }, {
                                    iconCls: 'x-fa fa-microphone',
                                    tooltip: 'Toggle Microphone',
                                    bind: {
                                        disabled: '{isMicDisabled}',
                                        iconCls: '{audioToggleIcon}'
                                    },
                                    listeners: {
                                        click: 'onPublishAudioToggle'
                                    }
                                }
                            ]
                        }, {
                            title: 'Members',
                            collapsable: true,
                            xtype: 'chatmembers',
                            iconCls: 'x-fa fa-group fa-lg',
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
        },
        {
            xtype: 'chatvideowall',
            hidden: true,
            bodyPadding: 6,
            minHeight: 300,
            flex: 1
        }
    ]



});