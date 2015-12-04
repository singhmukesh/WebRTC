Ext.define('help.view.feedback.FormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.helpfeedbackform',
    onSendClick : function(button) {
       var me = this,
           user = me.getViewModel().get('user') || {data:'unknown'},
           store = me.getViewModel().getStore('feedback');

        if(store){
            store.add({
                user:  user,
                message: me.getReferences().comment.getValue(),
                hashtag: window.location.hash
            });

        }

        Ext.toast({
            html: 'Thanks much...',
            // title: 'My Title',
            // width: 200,
            align: 't'
        });

       me.getReferences().comment.reset();


    }
});
