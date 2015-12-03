Ext.define('WebRTC.view.chat.HistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chathistory',

    onSpecialKey: function(f,e){
        if (e.getKey() == e.ENTER && !e.shiftKey ) {
            this.chatSend();
        }
        if (e.getKey() == e.UP) {
            this.editLastMessage();
        }
    },

    chatSend: function(){
        var me = this,
            chat,
            store = this.getViewModel().getStore('messages'),
            timestamp = new Date().toISOString(),
            user = me.getViewModel().get('user'),
            name =  me.getViewModel().get('name'),
            userid = null,
            roomid = me.getViewModel().get('id'),
            sessionId = this.getViewModel().get('room.sessionId'),
            message = me.lookupReference('chattext');

        if(message.getValue() == ''){return;}

        if(user){
            userid = user['id'];
        }

        chat = Ext.create('WebRTC.model.chat.Message',{
            message: message.getValue(),
            roomid: roomid,
            mine: true,
            userid: userid,
            from: name,
            date: timestamp
        });

        message.focus(false,200);
        message.setValue('');

        store.add(chat);
        me.scrollToBottom();

        me.fireEvent('chatmessage', sessionId, chat.data);
    },

    scrollToBottom: function(){
        var list = this.getView().down('dataview[reference=historylist]');
        if(list) {
            //this is deferred to ensure the data has loaded from firebase and knows the amount of records
            Ext.Function.defer(function () {
                    list.scrollBy(0, 999999, true);
            },
            500);
        }
    },

    onDblClick: function(view,record,item){
        var me = this,
            user = me.getViewModel().get('user');

        if(record.get('userid') == user['id']){
            me.editMessage(record);
        }
    },

    editMessage: function(record){
        var me = this,
            editWindow;

        record.set('edited',true);

        editWindow = Ext.create('Ext.window.Window',{
            title: 'Edit Message',
            minWidth: 500,
            minHeight: 50,
            bodyPadding: 10,
            resizable: true,
            layout: 'fit',
            /*
             * Seek out the first enabled, focusable, empty textfield when the form is focused
             */
            defaultFocus: 'textfield:focusable:not([hidden]):not([disabled]):not([value])',

            viewModel:{
                data:{
                    theMessage: record
                }
            },
            items: [{
                xtype     : 'textareafield',
                grow      : true,
                name      : 'message',
                fieldLabel: 'Message',
                labelAlign: 'top',
                allowBlank: false,
                bind: {
                    value: '{theMessage.message}'
                },
                anchor    : '100%'
            }]
        });
        me.getView().insert(0,editWindow);
        editWindow.show();
    },

    editLastMessage: function(){
        var me = this,
            user = me.getViewModel().get('user'),
            theRecord;

        me.getViewModel().get('mymessages').filterBy(function(record){
            if(record.get('userid') == user['id']){
                theRecord = record;
                return true;
            }else{
                return false;
            }
        });

        me.editMessage(theRecord);

    },

    onEditOkClick: function(button){
       //debugger;

        var window = button.up('window'),
            form = window.down('form');
        if (form.isValid()) {
            window.getViewModel().get('message').save();
        }
    },

    onKeyUp: function(field,e){
        if(field.getValue().length){
            this.setMemberTypingStatus({typingStatus:'typing'});
        }else{
            this.setMemberTypingStatus({typingStatus:''});
        }
    },

    setMemberTypingStatus: function(status){
        var auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            id = this.getViewModel().get('room')['id'],
            user = this.getViewModel().get('user');

        if(user){
            var userId = user['id'],
                membersRef = auth.firebaseRef.child('roommembers/' + id + '/' + userId);
            membersRef.update(status);
        }
    },


    onFilterFieldChange: function(field, value) {
        var me = this,
            list = me.getReferences().historylist;

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
        this.getReferences().chatFilter.setValue();
    },

    onFilterSearchTriggerClick: function() {
        var field = this.getReferences().chatFilter;
        this.onFilterFieldChange(field, field.getValue());
    },

    filterStore: function(value) {
        var me = this,
            list = me.getReferences().historylist,
            store = list.getStore(),
            selRec = list.getSelection();

        store.clearFilter();

        if (!Ext.isEmpty(value)) {
            store.filterBy(function (rec) {
                var data = rec.getData();

                //If the string is found in the record show it.
                return data['message'].toLowerCase().indexOf(value.toLowerCase()) > -1;
            });

            //Remove selection if selected record is not in the searched contact.
            if (selRec.length > 0 && store.indexOf(selRec[0]) === -1) {
                list.getSelectionModel().deselectAll();
            }
        }
    }

});