Ext.define('WebRTC.view.chat.RoomsContainerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroomscontainer',
    mixins: ['opentok.OpenTokMixin'],

    requires: ['WebRTC.model.AdminSettings'],

    listen: {
        controller: {
            'opentok': {
                chatreceived : 'onOTChatReceived',
                connectioncreated : 'onOTConnectionCreated',
                connectiondestroyed : 'onOTConnectionDestroyed',
                streamcreated : 'onOTStreamCreated',
                streamdestroyed : 'onOTStreamDestroyed',
                sessionconnected : 'onOTSessionConnected',
                sessiondisconnect : 'onOTSessionDestroyed'
            },
            'auth':{
                userData: 'onAuthUserData'
            }
        }
    },

    init: function(){

    },

    displayRoom: function (record) {
        if (!record) return false;

        var me = this,
            navView = me.getView(),
            id = record.get('id'),
            name = me.getViewModel().get('name'),
            room;


        navView.getViewModel().set('room', record);

        room = navView.push({
            xtype: 'chatroom',
            // title: roomName,
            closable: true,
            iconCls: 'x-fa fa-comments',
            roomId: id,
            flex: 1
        });

        room.getViewModel().set('room', record);

        room.getViewModel().getStore('messages').getProxy().getExtraParams().room = id;

        // Notify TokBox in this case
        me.fireEvent('joinroom', room, record.data, name);
    },


    // required by OpenTokMixin
    getRoomBySessionId: function(sessionId){
        var room = Ext.first('chatroom[sessionId="' + sessionId + '"]');
        return room;
    },

    getOpenTokController: function () {
        return WebRTC.app.getController('OpenTok');
    },

    // something in the user data changed
    // make sure to filter the rooms by the user info
    onAuthUserData: function(user){
        var me=this,
            store = this.getViewModel().getStore('myrooms');

        if(store){
            store.filterBy(function (item) {
                if (item) {
                    var user = me.getViewModel().get('user');
                    if (item.get('isPublic')) {
                        return true;
                    } else if (user && user['name'] == 'admin' ) {
                        return true;
                    } else if (user && user['id'] == item.get('owner') ) {
                        return true;
                    }  else if (user && user['id'] && !user['isTemp']) {
                        return !item.get('isPrivate')
                    }else {
                        return false;
                    }
                }
            })
        }

    },




    onRoomAdd: function(button){
        console.log('TODO: onRoomAdd');
        // var window = Ext.create('Ext.window.Window', {
        //     title: 'Add Room',
        //     iconCls: 'x-fa fa-plus-square fa-lg',
        //     height: 400,
        //     width: 800,
        //     layout: 'fit',
        //     resizable: true,
        //     modal: true,
        //     autoShow: true,
        //     viewModel:{
        //         data:{
        //             theRoom: {
        //                 id: null,
        //                 isPrivate: false
        //             }
        //         }
        //     },
        //     items: {
        //         xtype: 'chatroomform',
        //         border: false
        //     }
        // });
        // button.up('chatroomscontainer').add(window);
    },

    onRoomEditTap: function(button, e){
        console.log(button.getRecord());
        console.log('clicked on share button of record '+button.getRecord().getId());
        e.stopPropagation();
        return false;
    },

    onRoomEdit: function(button){
        console.log('TODO: onRoomEdit');
        // var record = Ext.first('combobox[reference=roomscombo]').getSelection();

        // var window = Ext.create('Ext.window.Window', {
        //     title: 'Edit Room',
        //     iconCls: 'x-fa fa-plus-square fa-lg',
        //     height: 400,
        //     width: 800,
        //     layout: 'fit',
        //     resizable: true,
        //     modal: true,
        //     autoShow: true,
        //     viewModel:{
        //         data:{
        //             theRoom: record
        //         }
        //     },
        //     items: {
        //         xtype: 'chatroomform',
        //         border: false

        //     }
        // });
        // button.up('chatroomscontainer').add(window);


    },

    onRoomShare: function(){
        var room = Ext.first('combobox[reference=roomscombo]').getSelection();

        if(room && room.get('isPrivate') ){
            Ext.Ajax.request({
                url     : '/data/jwtsign/' + room.data.password,

                params:  room.data,

                success : function(response) {
                    var token = response.responseText, message,
                        message = '<a target="_new" href="' + window.location.origin + '/#token/' + token + '">' + window.location.origin + '/#token/' + token + '</a> <br/> Password to enter room: ' + room.data.password ;
                    Ext.Msg.alert('Private Room Token', message);

                },
                failure : function() {
                }
            });
        }else{
            var message = '<a href="' + window.location + '">' + window.location + '</a>';
            Ext.Msg.alert('Public Room Link', message);

            alert();
        }

    },

    onRoomRemove: function(){
        var record = Ext.first('combobox[reference=roomscombo]').getSelection();

        if(record){
            var store = this.getViewModel().getStore('rooms');
            this.getViewModel().getStore('rooms').remove(record);
            Ext.Msg.wait('Removing', 'Removing room...');
            store.sync({
                scope: this,
                callback: this.onComplete
            });
        }
    },

    onRoomSelect: function(view, index, target, record) {
        if (!record) {
            this.redirectTo('home');
            return false;
        }

        var me = this,
            id = record.get('id');

        me.redirectTo('room/' + id);

    },

    onRoomActivate: function(tab){
        var me = this,
            user = this.getViewModel().get('user'),
            room = tab.getViewModel().get('room'),
            sessionId = tab.getViewModel().get('room').get('sessionId');

        this.fireEvent('resumeroom',tab, room, user);
    },

    onRoomRemoved: function(tab){
        var user = this.getViewModel().get('user'),
            room = tab.getViewModel().get('room'),
            sessionId = tab.getViewModel().get('room').get('sessionId');

        this.fireEvent('pauseroom',tab, room, user);
    },

    onRoomClose: function(tab){
        console.log('onRoomClose');

        var room = tab.getViewModel().get('room'),
            sessionId = room.get('sessionId'),
            roomId =  room.get('id'),
            user = this.getViewModel().get('user'),
            userId = this.getViewModel().get('user').id;

        tab.getController().roomMemberRemove(userId);

        this.fireEvent('closeroom',tab, room, user);
    },


    getRoomTabById: function(id){
        var roomtabs = Ext.first('[reference=roomtabs]');
        return roomtabs.child('chatroom[roomId="' + id + '"]');
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
    },


    /*
     * This is where we can create a token for sharing the room
     */
    onShareRoom: function(){
        Ext.Ajax.request({
            url     : '/data/jwtsign/' + qs.pwd,

            params: payload,

            success : function(response) {
                var roomInfo = JSON.parse(response.responseText);
                action.resume();
            },
            failure : function() {
                action.stop();
            }
        });
    }

});
