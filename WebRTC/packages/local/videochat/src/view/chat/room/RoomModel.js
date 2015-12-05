Ext.define('videochat.view.chat.room.RoomModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chatroom',

    data: {
        inAudioCall: false,
        inVideoCall: false,
        isStreams: false,
        showStreams: true,
        showSelf: true,
        useMic: true,
        useCamera: true,
        imFullscreen: true,
        videoConnections: 0
    },



    stores: {
        messages: {
            model: 'videochat.model.chat.Message',
            sorters: [{property: 'date', direction: 'ASC'}],
            autoSync: true,
            autoLoad: true,
            listeners: {
                load: 'onMessagesLoad'
            }
        },
        mymessages: {
            model: 'videochat.model.chat.Message',
            source: '{messages}',
            sorters: [{property: 'date', direction: 'ASC'}],
            autoLoad: true
        },
        members: {
            model: 'videochat.model.chat.RoomMember',
            proxy: {
                type: 'socketio',
                url: '/roommembers',
                extraParams: {
                    room: null
                },
                apiEvents: {
                    read: 'child_added',
                    update: 'child_changed',
                    destroy: 'child_removed'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true
                }
            },
            sorters: [
                {property: 'name', direction: 'ASC'}
            ],
            autoSync: true,
            autoLoad: true,
            listeners: {
                load: function () {
                    //  WebRTC.util.Logger.log('roommembers loaded')
                }
            }
        }
    },

    formulas: {
        audioCallIcon: function (get) {
            if (get('inAudioCall')) {
                return 'x-fa fa-stop';
            } else {
                return 'x-fa fa-phone';
            }
        },
        audioCallClass: function (get) {
            if (get('inAudioCall')) {
                return 'inAudioCall';
            } else {
                return 'audioCall';
            }
        },
        videoCallIcon: function (get) {
            if (get('inVideoCall')) {
                return 'x-fa fa-stop';
            } else {
                return 'x-fa fa-video-camera';
            }
        },
        audioToggleIcon: function (get) {
            if (get('useMic')) {
                return 'x-fa fa-microphone';
            } else {
                return 'x-fa fa-microphone-slash';
            }
        },
        videoToggleIcon: function (get) {
            if (get('useCamera')) {
                return 'x-fa fa-eye';
            } else {
                return 'x-fa fa-ban';
            }
        },
        isMicDisabled: function (get) {
            if (get('inAudioCall') || get('inVideoCall')) {
                return false;
            } else {
                return true;
            }
        },
        isInCall: function (get) {
            if (get('inVideoCall')) {
                return true;
            } else {
                return false;
            }
        },
        isShowingSelf: function (get) {
            if (get('showSelf')) {
                return true;
            } else {
                return false;
            }
        },
        showSelfTooltip: function (get) {
            if (get('showSelf')) {
                return 'Hide You';
            } else {
                return 'Show You';
            }
        },
        wallTooltip: function (get) {
            if (get('showStreams')) {
                return 'Hide Wall';
            } else {
                return 'Show Wall';
            }
        },
        isShowingSelfIcon: function (get) {
            if (get('showSelf')) {
                return 'x-fa fa-user';
            } else {
                return 'x-fa fa-user-times';
            }
        },
        isWebRTCSupported: function (get) {
            if (Ext.browser.is.Safari || Ext.browser.is.IE) {
                return false;
            } else {
                if (!!window.webkitRTCPeerConnection || !!window.mozRTCPeerConnection) {
                    return true;
                } else {
                    return false;
                }
            }

        },
        isVideoLayout: function(){
            var settings = Ext.getStore('Settings'),
                layout = settings.getById('videolayout');
            if(layout){
                return layout.get('value') === 'videofeeds';
            }else{
                return true;
            }
        }
    }

});