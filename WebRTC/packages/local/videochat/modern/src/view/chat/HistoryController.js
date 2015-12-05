Ext.define('videochat.view.chat.HistoryController', {
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

    onBackTap: function(button){
        //deselect so we can reselect.
        this.redirectTo('#room');
        button.up('navigationview').pop();
    },

    chatSend: function(){
        var me = this,
            chat,
            store = this.getViewModel().getStore('messages'),
            timestamp = new Date().toISOString(),
            user = me.getViewModel().get('user'),
            name = user['name'],
            userid = user['id'],
            roomid = me.getViewModel().get('id'),
            sessionId = this.getViewModel().get('room.sessionId'),
            message = me.lookupReference('chattext');

        if (!message.getValue()) return;

        chat = Ext.create('videochat.model.chat.Message',{
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
        var me=this,
            list = this.getView().down('dataview[reference=historylist]'),
            scroller, store;
        if(list) {
            scroller = list.getScrollable();
            store = list.getStore();
            if (scroller && store.isLoaded()){
                Ext.Function.defer(function(){
                    scroller.scrollBy(null, Infinity, true);
                },500);

            } else {
                //once loaded call ourself and the deferred function will run
                store.on('load', function() {
                    me.scrollToBottom();
                }, this, {single: true}
                );
            }
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


    onFilterFieldChange: function(field, value) {
        var me = this,
            list = me.getReferences().historylist,
            store = list.getStore();

        if (value) {
            me.preFilterSelection = me.getViewModel().get('selectedView');
            me.rendererRegExp = new RegExp( '(' + value + ')', "gi");
            // field.getTrigger('clear').show();
            me.filterStore(value);
        } else {
            me.rendererRegExp = null;
            store.clearFilter();
            // field.getTrigger('clear').hide();

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
            store = list.getStore();

        store.clearFilter();

        if (!Ext.isEmpty(value)) {
            store.filterBy(function (rec) {
                var data = rec.getData();

                //If the string is found in the record show it.
                return data['message'].toLowerCase().indexOf(value.toLowerCase()) > -1 || data['from'].toLowerCase().indexOf(value.toLowerCase()) > -1;
            });

        }
    }




});