Ext.define('WebRTC.view.chat.RoomsContainerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chatroomscontainer',

    data: {
        room: null,
        name: null,
        user: null
    },
    formulas: {
        isAdmin: function (get) {
            return get('name') != 'admin' ;    //shows config button if name is admin
        },
        isRoomSelectedByOwner: function (get) {
            var user = Ext.first('chatroomscontainer').getViewModel().get('user');
            return get('room') != null && (user.id == get('room').get('owner') ) ;    //edit allowed only when owner
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
