Ext.define('videochat.store.chat.Members', {
    extend: 'Ext.data.Store',
    alias: 'store.members',
    model:'videochat.model.chat.RoomMember',
    autoLoad: true,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
