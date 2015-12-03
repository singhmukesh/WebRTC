Ext.define('WebRTC.view.settings.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.settingsuser',

    requires: [
        'WebRTC.store.Settings'
    ],

    init: function () {
        var view = this.getView(),
            settings = Ext.getStore('Settings'),
            currentChatSound = settings.getById('chat-sound').get('value'),
            soundChatCombo = view.down('selectfield[name=chat-sound]'),
            currentEnterSound = settings.getById('enter-sound').get('value'),
            soundEnterCombo = view.down('selectfield[name=enter-sound]'),
            currentLeaveSound = settings.getById('leave-sound').get('value'),
            soundLeaveCombo = view.down('selectfield[name=leave-sound]'),
            currentLaunchRoom = settings.getById('launchroom').get('value'),
            launchCombo = view.down('selectfield[name=launchroom]'),
            user;

        soundChatCombo.setValue(currentChatSound);
        soundEnterCombo.setValue(currentEnterSound);
        soundLeaveCombo.setValue(currentLeaveSound);

        launchCombo.setValue(currentLaunchRoom);

    },

    signOut: function () {
        this.fireEvent('logout');
    },

    onChangePassword: function(){
        this.redirectTo('#newpassword');
    },

    onChangeEmail: function(){
        this.redirectTo('#newemail');
    },

    saveSettings: function () {
        var me=this,
            view = this.getView(),
            data = view.getValues(),
            auth = WebRTC.app.getController('WebRTC.controller.Auth'),
            settings = Ext.getStore('Settings');

        auth.firebaseRef.child('users/' + data['id']).update({
            fn: data['fn'],
            location: data['location'],
            status_msg: data['status_msg'],
            // gender: data['gender'],
            country: data['country'],
            state: data['state'],
            title: data['title'],
            tel_work: data['tel_work'],
            tel_cell: data['tel_cell'],
            companany: data['company'],
            name: data['fn']
        });

        // saving only chat-sound so far
        var key = 'chat-sound';
        settings.getById(key).set('value', data[key]);

        key = 'enter-sound';
        settings.getById(key).set('value', data[key]);

        key = 'leave-sound';
        settings.getById(key).set('value', data[key]);

        key = 'launchroom';
        settings.getById(key).set('value', data[key]);

        key = 'videolayout';
        settings.getById(key).set('value', data[key]);

        me.redirectTo('room');
    }


});
