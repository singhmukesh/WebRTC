Ext.define('videochat.store.chat.Rooms', {
    extend: 'Ext.data.Store',
    alias: 'store.rooms',
    model: 'videochat.model.chat.Room',
    storeId: 'rooms',
    sorters: 'name',
    proxy: {
        type: 'socketio',
        url : '/rooms',
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
    autoLoad: true,
    autoSync: true
});
