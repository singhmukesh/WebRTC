Ext.define('videochat.view.chat.RoomsListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chatroomslist',

    links: {
        room: {
            type: 'videochat.model.chat.Room',
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
            autosync: true,
            filters: [
                function(item) {
                    if(!item) return false;

                    //Since this store is defined in the viewModel we will need to query the view where the user data is.
                    var user = Ext.ComponentQuery.query('app-main')[0].getViewModel().get('user');

                    if (item.get('isPublic')) {
                        return true;
                    } else if (user && user['name'] == 'admin' ) {
                        return true;
                    } else if (user && user['id'] == item.get('owner') ) {
                        return true;
                    }  else if (user && user['id'] && !user['isTemp']) {
                        return !item.get('isPrivate')
                    }else {
                        return false;
                    }
                }
            ]
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
