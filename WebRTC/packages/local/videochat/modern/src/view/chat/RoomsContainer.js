Ext.define('videochat.view.chat.RoomsContainer', {
    extend: 'Ext.panel.Panel',
    xtype: 'chatroomscontainer',

    requires: ['videochat.ux.ListSlideActions'],

    viewModel: {
        type: 'chatroomslist'
    },

    controller: 'chatroomscontainer',

    layout: 'fit',

    header:{
        itemPosition: 0,
        titleAlign: 'left',
        items:[{
            xtype: 'textfield',
            reference: 'roomFilter',
            placeHolder: 'Search Rooms',
            triggers: {
                clear: {
                    cls: 'x-form-clear-trigger',
                    handler: 'onFilterClearTriggerClick',
                    hidden: true,
                    scope: 'controller'
                },
                search: {
                    cls: 'x-form-search-trigger',
                    weight: 1,
                    handler: 'onFilterSearchTriggerClick',
                    scope: 'controller'
                }
            },
            listeners: {
                change: 'onFilterFieldChange',
                buffer: 300
            }
        }]
    },

items: [

    {
        xtype: 'button',
        iconCls: 'x-fa fa-plus',
        ui: 'bright-blue round',
        userCls: 'pop-out',
        width: 50,
        height: 50,

        // These cause the button to be floated / absolute positioned
        bottom: 10,
        right: 10,

        bind: {
            hidden: '{composing}'
        },
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
        bind: {
            store: '{myrooms}'
        },
        listeners: {
            itemtap: 'onRoomSelect'
        },
        plugins: {
            xclass: 'WebRTC.ux.ListSlideActions',
            leftButtons: [{
                xtype: 'button',
                iconCls: 'x-fa fa-share',
                ui: 'confirm',
                listeners: {
                    tap: function (button, e) {

                        var controller = Ext.ComponentQuery.query('chatroomscontainer')[0].getController();
                        button.slideactions.removeButtonPanel();
                        controller.onRoomShareTap(button);
                        e.stopPropagation();
                        return false;
                    },
                    scope: this
                }
            }
            ],
            //NOTE: These buttons are added outside the component chain and so the controller scope needs to be a component lookup until a better method is worked out.
            rightButtons: [
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-pencil',
                    ui: 'action',
                    bind: {
                        disabled: '{!isRoomActionByOwner}'
                    },
                    listeners: {
                        tap: function (button, e) {
                            var controller = Ext.ComponentQuery.query('chatroomscontainer')[0].getController();
                            button.slideactions.removeButtonPanel();
                            controller.onRoomEditTap(button); //send the record to the controller : button.getRecord()
                            e.stopPropagation();
                            return true;
                        },
                        scope: this
                    }
                },
                /*  {
                 xtype: 'button',
                 iconCls:'x-fa fa-share',
                 ui: 'confirm',
                 listeners: {
                 tap: function(button, e){

                 var controller = Ext.ComponentQuery.query('chatroomscontainer')[0].getController();
                 button.slideactions.removeButtonPanel();
                 controller.onRoomShareTap( button );
                 e.stopPropagation();
                 return false;
                 },
                 scope: this
                 }
                 },*/
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-trash',
                    ui: 'decline',
                    listeners: {
                        tap: function (button, e) {
                            var controller = Ext.ComponentQuery.query('chatroomscontainer')[0].getController();
                            button.slideactions.removeButtonPanel();
                            controller.onRoomRemoveTap(button);
                            e.stopPropagation();
                            return false;
                        },
                        scope: this
                    }
                }
            ],
            //These are the custom formulas that will have the record of the item being slid and the parent viewModel chain.
            viewModel: {
                formulas: {
                    isRoomActionByOwner: function (get) {
                        var user = get('user'),
                            record;
                        if (user) {
                            if (this.get('slideActionRecord')) {
                                record = this.get('slideActionRecord');
                            }
                            return record != null && (user['id'] == record.get('owner') );    //edit allowed only when owner
                        } else {
                            return false
                        }
                    }
                }
            }
        }
    }
]


})
;
