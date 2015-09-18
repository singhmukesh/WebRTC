Ext.define('WebRTC.view.chat.RoomsContainerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chatroomscontainer',

    data: {
        room: null,
        name: null,
        user: null
    },
    stores: {
        rooms: {
            model: 'WebRTC.model.chat.Room',
            storeId: 'rooms',
            sorters: 'name',
            proxy: {
                type: 'socketio',
                url : '/rooms',
                extraParams: '{getAuthToken}',
                apiEvents: {
                    read: 'child_added',
                    update: 'child_changed',
                    destroy: 'child_removed'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            filters: [
                function(item) {
                    var user = Ext.first('app-main').getViewModel().get('user');
                    if(item.get('passwordVerified')) {
                        return true;
                    }else if(user && user.id){
                        return !item.get('isPrivate') || user.id == item.get('owner');
                    }else{
                        return !item.get('isPrivate')
                    }
                }
            ],
            autoLoad: false  //wait for user auth prior to load
        },
        globalusers: {
            model: 'WebRTC.model.chat.RoomMember',
            autoLoad: true
        },
        users: {
            model: 'WebRTC.model.User',
            autoLoad: true
        }
    },
    formulas: {
        isAdmin: function (get) {
            return get('name') != 'admin' ;    //shows config button if name is admin
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