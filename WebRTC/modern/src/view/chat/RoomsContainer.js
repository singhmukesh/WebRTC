Ext.define('WebRTC.view.chat.RoomsContainer', {
    extend: 'Ext.Container',
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
                xclass: 'WebRTC.ux.ListSlideActions',
                buttons: [
                    {
                        xtype: 'button',
                        iconCls:'x-fa fa-pencil',
                        ui: 'action',
                        listeners: {
                            tap: function(button, e){
                                console.log(button.getRecord());
                                console.log('clicked on share button of record '+button.getRecord().getId());
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
                                console.log(button.getRecord());
                                console.log('clicked on delete button of record '+button.getRecord().getId());
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
