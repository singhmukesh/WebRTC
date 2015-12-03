Ext.define('WebRTC.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    autoLoad: true,
    autoSync: true,

    /*
    proxy: {
        type: 'ajax',
        url : '/data/navigation',
        reader: {
            type: 'json',
            rootProperty: function(data){
                // Extract child nodes from the items or children property in the dataset
                return data.items || data.children;
            }
        }
    },
    */

    proxy: {
        type: 'socketio',
        url : '/navigation',
        apiEvents: {
            read: 'child_added',
            update: 'child_changed',
            destroy: 'child_removed'
        },
        reader: {
            type: 'json',
            rootProperty: function(data){
                // Extract child nodes from the items or children property in the dataset
                return data.items || data.children;
            }
        }
    },

    fields: [{
        name: 'text'
    }],

    filters: [
        function(item) {
           return !!item.get('isHidden');
        }
    ]
});
