Ext.define('WebRTC.view.tablet.chat.Room', {
    extend: 'Ext.Panel',

    layout: {
        type: 'box',
        orient: 'vertical',
        align: 'stretch'
    },

    controller: 'chatroom',

    viewModel: {
        type: 'chatroom'
    },

    header:{
        itemPosition: 0,
        titleAlign: 'center',
        items:[{
            xtype: 'button',
            left: 0,
            top: -10,
            iconCls: 'x-fa fa-arrow-left',
            userCls: 'subHeaderIcon',
            // text:'Back',
            listeners:{
                tap: 'onBackTap'
            }
        }]
    },

    items: [
        {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex: 3,
            items:[
                {
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    flex: 1,
                    items: [
                        {
                            xtype: 'chatinfo',
                            hidden: true
                        },
                        {
                            xtype: 'chathistory',
                            reference: 'chathistory',
                            flex: 2
                        }
                    ]
                },
                {
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    bind:{
                        hidden: '{!isWebRTCSupported}'
                    },
                    items: [
                        {
                            items:[
                                {
                                    style: 'display: block; background-color:#eeeeee; background-image: url(https://static.opentok.com/webrtc/v2.6.0/images/rtc/audioonly-silhouette.svg); background-position: center bottom; background-repeat: no-repeat; background-size: auto 76%;',
                                    xtype: 'container',
                                    layout: 'fit',
                                    minHeight: 180,
                                    bind:{
                                        hidden: '{!isWebRTCSupported}'
                                    },
                                    reference: 'you'
                                },
                                {
                                    xtype: 'toolbar',
                                    docked: 'bottom',
                                    bind:{
                                        hidden: '{!isWebRTCSupported}'
                                    },
                                    items: [
                                        {
                                            bind: {
                                                disabled: '{inVideoCall}',
                                                iconCls: '{audioCallIcon}'
                                            },
                                            listeners: {
                                                tap: 'onAudioCallRoom'
                                            }
                                        },
                                        {
                                            bind: {
                                                disabled: '{inAudioCall}',
                                                iconCls: '{videoCallIcon}'
                                            },
                                            listeners: {
                                                tap: 'onVideoCallRoom'
                                            }
                                        },
                                        {
                                            xtype: 'spacer'
                                        },
                                        {
                                            iconCls: 'x-fa fa-eye',
                                            bind: {
                                                disabled: '{!inVideoCall}',
                                                iconCls: '{videoToggleIcon}'
                                            },
                                            listeners: {
                                                tap: 'onPublishVideoToggle'
                                            }
                                        }, {
                                            iconCls: 'x-fa fa-microphone',
                                            bind: {
                                                disabled: '{isMicDisabled}',
                                                iconCls: '{audioToggleIcon}'
                                            },
                                            listeners: {
                                                tap: 'onPublishAudioToggle'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'titlebar',
                            title: 'Members'
                        },
                        {
                            xtype: 'chatmembers',
                            flex: 1,
                            bind:{
                                store: '{members}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'chatvideowall',
            hidden: true,
            bodyPadding: 6,
            minHeight: 350,
            flex: 2
        }
    ]

    // updateTitle: function (title) {
    //     var nav = this.up('navigationview');
    //     if (nav) {
    //         nav.updateTitleContainerTitle(title);
    //     }
    // } 

});
