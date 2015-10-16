Ext.define('WebRTC.view.chat.room.RoomControls', {
    extend: 'Ext.Toolbar',
    xtype: 'roomcontrols',
    cls: 'roomControls',
    bind: {
        hidden: '{!isWebRTCSupported}'
    },
    items: [
        {
            bind: {
                disabled: '{inVideoCall}',
                iconCls: '{audioCallIcon}'
            },
            tooltip: 'Toggle Audio Publish',
            listeners: {
                click: 'onAudioCallRoom'
            }
        },
        {
            bind: {
                disabled: '{inAudioCall}',
                iconCls: '{videoCallIcon}'
            },
            tooltip: 'Toggle Video Publish',
            listeners: {
                click: 'onVideoCallRoom'
            }
        }
        , '->',
        {
            iconCls: 'x-fa fa-user',
            bind: {
                hidden: '{!inVideoCall} || {isVideoLayout}',
                tooltip: '{showSelfTooltip}',
                iconCls: '{isShowingSelfIcon}'
            },
            listeners: {
                click: 'onShowSelfToggle'
            }
        }
        , '->',
        {
            iconCls: 'x-fa fa-th',
            bind: {
                disabled: false,
                tooltip: '{wallTooltip}',
                hidden: '{!isStreams} || {isVideoLayout}'

            },
            listeners: {
                click: 'onVideoWallToggle'
            }
        },
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
});