Ext.define('Scaffold.Form', {
    singleton: true,

    buildItems: function (model) {
        var modelName = model.entityName,
            config = Ext.ClassManager.get('CM.config.' + modelName),
            formConfig = config && config.form || {},
            formFieldConfig = formConfig.fieldConfig || {},
            items;

        items = Ext.Array.map(model.fields, function (field) {
            var item;

            if (!field.identifier && !field.reference) {
                // textfield
                item = Ext.apply({
                    xtype: field.type == 'number' ? 'numberfield' : 'textfield',
                    label: Ext.String.capitalize(field.name),
                    bind: '{record.' + field.name + '}'
                }, formFieldConfig[field.name] || {});
            }
            else if (field.reference) {
                item = Ext.apply({
                    xtype: 'textfield',
                    label: Ext.String.capitalize(field.name),
                    bind: '{record.' + field.name + '.name}'
                }, formFieldConfig[field.name] || {});

                //// combo
                //item = Ext.apply({
                //    xtype: 'combo',
                //    fieldLabel: Ext.String.capitalize(field.name),
                //    store: Ext.getStore(field.reference.type),
                //    displayField: 'name',
                //    valueField: '_id',
                //    filterPickList: true,
                //    queryMode: 'local',
                //    bind: {
                //        selection: '{record.' + field.name + '}'
                //    }
                //}, formFieldConfig[field.name] || {});
            }

            return item;
        });

        // filter out undefined items
        items = Ext.Array.filter(items, function (item) {
            return item;
        });

        if (formConfig.buildItems) {
            items = formConfig.buildItems(items);
        }

        return items;
    }
});