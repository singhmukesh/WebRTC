Ext.define('videochat.view.chat.MembersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatmembers',
    listen: {
        controller: {
            'auth': {
                visibilityChanged: 'onVisibilityChanged',
                idle: 'onIdle',
                active: 'onActive'
            },
            '*': {
                closeroom: 'onCloseRoom',
                joinroom: 'onJoinRoom'
            }
        }
    },

    onCloseRoom: function(tab,room, user){
        var auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            membersRef = auth.firebaseRef.child('roommembers/' + room['id'] + '/' + user['id']);

        // remove member from room
        membersRef.remove();

        WebRTC.util.Logger.log('members | room closed')
    },

    onJoinRoom: function(tab, room, user){
        var auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            membersRef = auth.firebaseRef.child('roommembers/' + room['id'] + '/' + user['id']),
            socketId = '';

        if(room.store.getProxy()['socket']){
            socketId =  room.store.getProxy().socket.id;
        }

        membersRef.update({
            id: user['id'],
            callStatus:'idle',
            micStatus:'',
            socketId: socketId,
            name: user['fn']
        });
        // when I disconnect, remove this member
        membersRef.onDisconnect().remove();
        WebRTC.util.Logger.log('members | room joined')
    },

    onDblClick: function(list,record){
        var auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            user = this.getViewModel().get('user'),
            member = record.get('id'),
            userroomsRef = auth.firebaseRef.child('userrooms/' + user['id']+ '/' + member);

        if(user['id'] == record.get('id')){
            this.fireEvent('openUser');
        }else{
            userroomsRef.once("value", function (snap) {
                if ( snap.val() ) {
                    WebRTC.util.Logger.log('foundroom');
                }else{
                    WebRTC.util.Logger.log('createrooms');
                    //userroomsRef.update({private:true})
                }
            }, function (err) {
                    WebRTC.util.Logger.log(err);
            });
        }

    },

    onVisibilityChanged: function(){
        //var me=this;
        if(!document.hidden) {
            //me.unread = 0;
        }
        //me.setUnreadTitle();
    },

    onIdle: function(lastActivity){
        var me=this,
            user = this.getViewModel().get('user');
        if(me.isIdle){return}
        me.isIdle = true;
        me.setPresenseStatus({
            status: 'idle',
            id: user['id'],
            name: user['fn'],
            lastActivity: lastActivity
        });
        // WebRTC.util.Logger.log('idle');
    },

    onActive: function(){
        var me=this,
            user = this.getViewModel().get('user');
        if(me.isIdle){
            me.isIdle = false;
            me.setPresenseStatus({
                status: 'online',
                id: user['id'],
                name: user['fn'],
                lastActivity: null
            });
        }
        // WebRTC.util.Logger.log('active');
    },

    setPresenseStatus: function(status){
        var auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            userId = auth.user['id'],
            membersRef = auth.firebaseRef.child('roommembers/' + id + '/' + userId);

      //  WebRTC.util.Logger.log('room members status : ' + status);
      membersRef = auth.firebaseRef.child('roommembers/' + id + '/' + userId);
    },


    onFilterFieldChange: function(field, value) {
        var me = this,
            list = me.getReferences().memberslist;

        if (value) {
            me.preFilterSelection = me.getViewModel().get('selectedView');
            me.rendererRegExp = new RegExp( '(' + value + ')', "gi");
            field.getTrigger('clear').show();
            me.filterStore(value);
        } else {
            me.rendererRegExp = null;
            list.store.clearFilter();
            field.getTrigger('clear').hide();

            // Ensure selection is still selected.
            // It may have been evicted by the filter
            if (me.preFilterSelection) {
                list.ensureVisible(me.preFilterSelection, {
                    select: true
                });
            }
        }
    },

    onFilterClearTriggerClick: function() {
        this.getReferences().roommembersFilter.setValue();
    },

    onFilterSearchTriggerClick: function() {
        var field = this.getReferences().roommembersFilter;
        this.onFilterFieldChange(field, field.getValue());
    },

    filterStore: function(value) {
        var me = this,
            list = me.getReferences().memberslist,
            store = list.getStore(),
            selRec = list.getSelection();

        store.clearFilter();

        if (!Ext.isEmpty(value)) {
            store.filterBy(function (rec) {
                var data = rec.getData();

                //If the string is found in the record show it.
                return data['name'].toLowerCase().indexOf(value.toLowerCase()) > -1;
            });

            //Remove selection if selected record is not in the searched contact.
            if (selRec.length > 0 && store.indexOf(selRec[0]) === -1) {
                list.getSelectionModel().deselectAll();
            }
        }
    }

});
