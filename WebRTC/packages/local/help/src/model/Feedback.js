Ext.define('help.model.Feedback', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    requires: ['Ext.data.identifier.Uuid'],
    identifier: 'uuid', //creates a uuid and assisgns it to the id field

    fields: [
        { name: 'name'},
        { name: 'message'},
        { name: 'hashtag'},
        {
            name: 'timeid', type: 'string',
            convert: function(value, record){
                var date = new Date();
                return Ext.Date.format(date, 'd-m-Y-H-i-s');
            }
        }

    ]
});