Ext.define('videochat.view.chat.Members', {
    extend: 'Ext.Panel',
    xtype: 'chatmembers',
    controller: 'chatmembers',
    bodyPadding: 10,
    layout:'fit',

    dockedItems: [{
        xtype: 'textfield',
        reference: 'roommembersFilter',
        dock: 'top',
        emptyText: 'Search Members',
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
    }],

    items:[{
        xtype:'dataview',
        reference: 'memberslist',
        autoScroll: true,
        loadMask: false,
        bind:{
          store: '{members}'
        },
        itemSelector: 'tr.member-wrap',
        listeners: {
            itemdblclick: 'onDblClick'
        },
        tpl: [
            '<table class="members">',
            '<tpl for=".">',
            '<tr class="member-wrap">',
            '<td >',
            '{[this.getIcon(values.callStatus)]} {[this.getIcon(values.micStatus)]} {[this.getIcon(values.typingStatus)]} {name}',
            '</td>',
            '</tr>',
            '</tpl>',
            '</table>',
            {
                getIcon: function(data){
                    if(data == 'video'){
                        return '<span class="x-fa fa-video-camera green"></span>'
                    }else if(data == 'video-hide'){
                        return '<span class="x-fa fa-video-camera red"></span>'
                    }else if(data == 'audio'){
                        return '<span class="x-fa fa-phone green"></span>'
                    }else if(data == 'mute'){
                        return '<span class="x-fa fa-microphone-slash red"></span>'
                    }else if(data == 'idle'){
                        return '<span class="x-fa fa-user"></span>'
                    }else if(data == 'typing'){
                        return '<span class="x-fa fa-keyboard-o"></span>'
                    }else{
                        return ''
                    }
                }
            }
        ]
    }]


});