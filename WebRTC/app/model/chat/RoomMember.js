Ext.define('WebRTC.model.chat.RoomMember', {
    extend: 'Ext.data.Model',
    //idProperty: 'id',
    //requires: ['Ext.data.identifier.Uuid'],
    //identifier: 'uuid', //creates a uuid and assisgns it to the id field
    fields: [
        'id',
        'roomid',
        'name',
        { name: 'user_id' /* , reference: 'user' */},
        { name: 'isBroadcasting', type: 'boolean', defaultValue: false },
        { name: 'audio_level',    type: 'float' ,  defaultValue: 0 }
    ]
});