Ext.define('WebRTC.view.chat.RoomsContainer', {
    extend: 'Ext.panel.Panel',
    xtype: 'chatroomscontainer',

    requires: ['WebRTC.ux.ListSlideActions'],

    viewModel: {
        type: 'chatroomslist'
    },
    controller: 'chatroomscontainer',

    layout: 'fit',


    items: [
        {
            xtype: 'button',
            iconCls:'x-fa fa-plus',
            ui: 'bright-blue round',
            userCls: 'pop-out',
            bind: {
                hidden: '{composing}'
            },
            width: 50,
            height: 50,

            // These cause the button to be floated / absolute positioned
            bottom: 10,
            right: 10,

            handler: 'onRoomAdd',
            listeners: {
                scope: 'controller',
                element: 'element',
                longpress: 'onLongPressCompose'
            }
        },
        {
            xtype: 'list',
            disableSelection: true,
            reference: 'roomsgrid',
            itemSelector: 'div.room-wrap',
            itemTpl: [
                '<div class="room-wrap">',
                    '<div class="room-icon">',
                        '<span class="x-fa fa-comments fa-lg" title="{name}"></span>',
                    '</div>',
                    '<div class="room-info">',
                        '<span class="room-title" title="{name}"> {name}</span>',
                        '<br><span class="room-topic" title="{topic}"> {topic}</span>',
                    '</div>',
                    '<div class="cleared"></div>',
                '</div>'
            ],
            bind:{
                store: '{myrooms}'
            },
            listeners: {
               itemtap: 'onRoomSelect'
            },
            plugins:{
                //NOTE: These buttons are added outside the component chain and so the controller scope needs to be a component lookup until a better method is worked out.
                xclass: 'WebRTC.ux.ListSlideActions',
                buttons: [
                    {
                        xtype: 'button',
                        iconCls:'x-fa fa-pencil',
                        ui: 'action',
                        listeners: {
                            tap: function(button, e){
                                var controller = Ext.ComponentQuery.query('chatroomscontainer')[0].getController();
                                controller.onRoomEdit( button ); //send the record to the controller : button.getRecord()
                                e.stopPropagation();
                                return false;
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: 'button',
                        iconCls:'x-fa fa-share',
                        ui: 'confirm',
                        listeners: {
                            tap: function(button, e){
                                var controller = Ext.ComponentQuery.query('chatroomscontainer')[0].getController();
                                controller.onRoomShare( button );
                                e.stopPropagation();
                                return false;
                            },
                            scope: this
                        }
                    },
                    {
                        xtype: 'button',
                        iconCls:'x-fa fa-trash',
                        ui: 'decline',
                        listeners: {
                            tap: function(button, e){
                                var controller = Ext.ComponentQuery.query('chatroomscontainer')[0].getController();
                                controller.onRoomRemove( button );
                                e.stopPropagation();
                                return false;
                            },
                            scope: this
                        }
                    }
                ]
            }
        }
    ]


});
