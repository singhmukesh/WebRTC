Ext.define('WebRTC.view.chat.RoomsContainerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chatroomscontainer',

    links: {
        room: {
            type: 'WebRTC.model.chat.Room',
            create: true
        }
    },
    stores: {
        presense: {
            model: 'WebRTC.model.User',
            source: '{users}',
            autoLoad: true
        },
        myrooms: {
            source: 'rooms',
            sorters: [{property: 'date', direction: 'ASC'}],
            autoLoad: true,
            autosync: true
        }
    },
    formulas: {
        isRoomSelectedByOwner: function (get) {
            var user = get('user');
            if (user) {
                return get('room') != null && (user['id'] == get('room').get('owner') );    //edit allowed only when owner
            } else {
                return false
            }
        },
        isRoomSelected: function (get) {
            return !!get('user') && get('room') != null;    //edit allowed only when selected by a user
        },
        isRoomSharingEnabled: function (get) {
            return true;
        }
    }
});
