Ext.define('videochat.view.chat.VideoWall', {
    extend: 'Ext.panel.Panel', //'Ext.window.Window'
    xtype: 'chatvideowall',
    autoscroll: 'true',
    // constrainHeader: true,
    // renderTo: Ext.getBody(),
    hidden: true,
    bodyCls: 'video-layout-remote-streams',
    // bodyStyle: 'background-color: #cacaca;',
    layout: {
        type: 'hbox', //column
        pack: 'center' //column

    },
    // closeAction: 'hide',
    items: []
    /*
    tbar:[{
        // This is experimental to see if we can pop out video wall.
        text:'pop',
        hidden: true,
        handler:function(button){
            var me=this,
                strWindowFeatures = "width=600,height=600,menubar=no,location=no,resizable=yes,scrollbars=yes,status=no",
                win = window.open('', 'videoWall', strWindowFeatures);

            Ext.Function.defer(function(){
                   // win.document.open().write('<html><title>Video Wall</title><body></body></html>');
                   // win.document.close();
                    // debugger;
                    win.document.body.innerHTML = 'hi'
                },
                50);


        }
    }]
    */
});