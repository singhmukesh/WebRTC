Ext.define('help.view.feedback.FormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.helpfeedbackform',
    onSendClick : function(button) {
       var me = this;

        Ext.toast({
            html: 'Thanks much...',
            // title: 'My Title',
            // width: 200,
            align: 't'
        });

       me.getReferences().comment.reset();


    }
});
