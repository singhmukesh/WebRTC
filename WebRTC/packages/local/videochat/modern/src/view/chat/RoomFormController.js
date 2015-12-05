Ext.define('videochat.view.chat.RoomFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroomform',

    onOkTap: function(button) {
        var form = button.up('panel'),
            data = form.getValues(),
            userid = Ext.first('chatroomscontainer').getViewModel().get('user')['id'],
            store = Ext.StoreManager.lookup('rooms');

    //    if (form.isValid()) {

            //If there is no view model created then it is new otherwise the model has the record
            if ( form.getViewModel().get('theRoom')['id'] != null )
            {
                var record = form.getViewModel().get('theRoom');
                record.save({
                    scope: this,
                    callback: this.onComplete
                });


            } else {
                if(data['isPrivate']){
                    password =  "id" + Math.random().toString(16).slice(2) + 'uv' + (new Date()).getTime();
                    data['password'] = password;
                }
                data.owner = userid;
                store.add(data);
                store.sync({
                    scope: this,
                    callback: this.onComplete
                });

            }
    //    }



    },

    onCancelTap: function(button) {
        var navView = Ext.ComponentQuery.query('navigationview[reference=mainCard]')[0];
        navView.pop();
    },


    onComplete: function() {
        var navView = Ext.ComponentQuery.query('navigationview[reference=mainCard]')[0];
        navView.pop();
}

});