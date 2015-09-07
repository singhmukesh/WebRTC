Ext.define('WebRTC.view.chat.RoomForm', {
    extend: 'Ext.form.Panel',
    xtype: 'chatroomform',

    bodyPadding: '0 24 24 24',
    autoScroll: true,

    defaultFocus: 'textfield [name=name]',
    defaultButton: 'okButton',
    defaults:{
        anchor: '100%',
        labelWidth: 200
    },

    items: [
        //{
        //    xtype: 'fieldset',
        //    //title: 'Info',
        //    defaults:{
        //        anchor: '100%'
        //    },
        //    items: [
                {
                    xtype:'hiddenfield',
                    name: 'id',
                    bind: '{theRoom.id}'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Room name',
                    name: 'name',
                    bind: '{theRoom.name}'
                },
                {
                    xtype:'checkboxfield',
                    boxLabel  : 'Private',
                    name      : 'isPrivate',
                    bind: '{theRoom.isPrivate}',
                    checked: false,
                    inputValue: true
                },{
                    xtype:'textfield',
                    fieldLabel: 'Room password',
                    name: 'password',
                    bind: {
                        value: '{theRoom.password}',
                        hidden: '{!theRoom.isPrivate}'
                    }
                }
            //]
        //},{
        //    xtype:'textfield',
        //    fieldLabel: 'OpenTok SessionId',
        //    name: 'sessionId',
        //    disabled: true,
        //    bind: {
        //        value: '{theRoom.id}',
        //        hidden: '{!theRoom.id}'
        //    }
        //}
    ],

    bbar: {
        ui: 'plain',
        items: [
            '->',
            {
                //iconCls: 'x-fa fa-thumbs-o-down',
                action:'cancel',
                text:'Cancel'
            },
            {
                //iconCls: 'x-fa fa-thumbs-o-up',
                reference: 'okButton',
                action:'ok',
                formBind: true,
                text:'Add'
            }
        ]
    }

});
