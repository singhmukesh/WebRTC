Ext.define('videochat.view.chat.RoomShareFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroomshareform',

    onInviteClick: function(button) {
        var me = this,
            form = button.up('panel'),
            data = form.getValues(),
            room = form.getViewModel().get('theRoom'),
            roomId = form.getViewModel().get('theRoom')['id'],
            message = form.getViewModel().get('theMessage'),
            token = form.getViewModel().get('theToken'),
            user = Ext.first('chatroomscontainer').getViewModel().get('user');

            WebRTC.util.Logger.log(data);
            form.down('[name=email]').setValue('');
            Ext.Msg.alert('Inviting', 'Sending invitation...');
            Ext.Ajax.request({
                url: '/data/roominvite/' + roomId,
                params : {
                    user: JSON.stringify(user),
                    email: data,
                    room: JSON.stringify(room.data),
                    message: message,
                    token: token
                },
                success: function(response, opts) {
                    var obj = Ext.decode(response.responseText),
                        message = obj.data[0]['message'];
                    Ext.Msg.hide();
                    me.updateStatus(form, message );
                },

                failure: function(response, opts) {
                    Ext.Msg.hide();
                    me.updateStatus(form,'Failure with status code ' + response.status);
                    WebRTC.util.Logger.log('server-side failure with status code ' + response.status);
                }
            });

    },

    updateStatus: function(form,text){
        var statusLabel =  form.down('[reference=statusLabel]');
        if(statusLabel){
            statusLabel.setHtml(text);
            statusLabel.show();
        }
    },

    onCancelTap: function(button) {
        var navView = Ext.ComponentQuery.query('navigationview[reference=mainCard]')[0];
        navView.pop();
    },


    onOkTap: function(button) {
        var navView = Ext.ComponentQuery.query('navigationview[reference=mainCard]')[0];
        navView.pop();
    }

});