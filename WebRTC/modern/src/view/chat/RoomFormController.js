Ext.define('WebRTC.view.chat.RoomFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroomform',

    onOkTap: function(button) {

    },

    onCancelTap: function(button) {

    },


    onComplete: function() {
    var title = Ext.Msg.getTitle();
    Ext.Msg.hide();

    Ext.toast({
        title: title,
        html:  'Finished successfully',
        align: 't',
        bodyPadding: 10
    });
}

});