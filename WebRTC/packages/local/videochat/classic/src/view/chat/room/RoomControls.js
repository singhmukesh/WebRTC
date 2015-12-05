Ext.define('videochat.view.chat.room.RoomControls', {
    extend: 'Ext.Toolbar',
    xtype: 'roomcontrols',
    cls: 'roomControls',
    bind: {
        hidden: '{!isWebRTCSupported}'
    },
    items: [
        {
            xtype: 'button',
            bind: {
                disabled: '{inVideoCall}',
                // ui: '{audioCallClass}',
                iconCls: '{audioCallIcon}'
            },
            tooltip: 'Toggle Audio Publish',
            listeners: {
                click: 'onAudioCallRoom'
            }
        },
        {
            xtype: 'button',
            bind: {
                disabled: '{inAudioCall}',
                iconCls: '{videoCallIcon}'
            },
            tooltip: 'Toggle Video Publish',
            cls: 'round-focus-button',
            listeners: {
                click: 'onVideoCallRoom'
            }
        }
        , '->',
        {
            iconCls: 'x-fa fa-user',
            xtype: 'button',
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
            xtype: 'button',
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
            xtype: 'button',
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
            xtype: 'button',
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