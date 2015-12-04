/**
 *  Universal Controller for Help
 *  Description: The help package need to use stores and logic
 *  for your specific application.
 */
Ext.define('WebRTC.controller.GlobalHelp', {
    extend: 'help.controller.Help',

    getAppViewModel: function(){
        var viewport = Ext.ComponentQuery.query('app-main')[0],
            parentVM = viewport.getViewModel(),
            myVM = Ext.create('Ext.app.ViewModel',{
                parent: parentVM,
                stores: {
                    feedback: {
                        model: 'help.model.Feedback',
                        alias: 'store.helpfeedback',
                        storeId: 'helpfeedback',
                        proxy: {
                            type: 'socketio',
                            url : '/feedback',
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
                    }
                }
            });

        return myVM;
    }
});
