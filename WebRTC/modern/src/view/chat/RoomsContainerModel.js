Ext.define('WebRTC.view.chat.RoomsContainerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chatroomscontainer',

    links: {
        room: {
            type: 'WebRTC.model.chat.Room',
            create: true
        }
    },
    data: {
        name: null,
        user: null
    },
    formulas: {
        isAdmin: function (get) {
            return get('name') != 'admin' ;    //shows config button if name is admin
        },
        isRoomSelectedByOwner: function (get) {
            var user = get('user');
            if (user) {
                return get('room') != null && (user['id'] == get('room').get('owner') );    //edit allowed only when owner
            } else {
                return false
            }
        },
        isRoomSelected: function (get) {
            return get('room') != null ;    //edit allowed only when selected
        },
        isRoomSharingEnabled: function (get) {
            return true;
        },
        getAuthToken: function (get) {
            if( get('authToken') ){
                return {
                    authToken: get('authToken')
                };
            }else{
                // no AuthToken could route to login code??
                return {
                    authToken: null
                };
            }
        }
    }
});
