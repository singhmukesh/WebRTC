Ext.define('WebRTC.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',


    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
                text: 'User',
                iconCls: 'x-fa fa-user',
                rowCls: 'nav-tree-badge nav-tree-badge-new',
                viewType: 'settingsuser',
                routeId: 'user', // routeId defaults to viewType
                leaf: true
            },
            {
                text: 'Chat Rooms',
                iconCls: 'x-fa fa-comments',
                rowCls: 'nav-tree-badge nav-tree-badge-new',
                viewType: 'chatroomcontainer',
                routeId: 'room', // routeId defaults to viewType
                leaf: true
            }

            /*
            ,
            {
                text: 'Email',
                iconCls: 'x-fa fa-send',
                rowCls: 'nav-tree-badge nav-tree-badge-hot',
                viewType: 'email',
                hidden: true,
                leaf: true
            },
            {
                text: 'Profile',
                iconCls: 'x-fa fa-user',
                viewType: 'profile',
                hidden: true,
                leaf: true
            },
            {
                text: 'Search results',
                iconCls: 'x-fa fa-search',
                viewType: 'searchresults',
                hidden: true,
                leaf: true
            },
            {
                text: 'FAQ',
                iconCls: 'x-fa fa-question',
                viewType: 'faq',
                hidden: true,
                leaf: true
            },
            {
                text: 'Pages',
                iconCls: 'x-fa fa-leanpub',
                hidden: true,
                expanded: false,
                selectable: false,
                //routeId: 'pages-parent',
                //id: 'pages-parent',

                children: [
                    {
                        text: 'Blank Page',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },

                    {
                        text: '404 Error',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: '500 Error',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    },
                    {
                        text: 'Lock Screen',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'lockscreen',
                        leaf: true
                    },

                    {
                        text: 'Login',
                        iconCls: 'x-fa fa-check',
                        viewType: 'login',
                        leaf: true
                    },
                    {
                        text: 'Register',
                        iconCls: 'x-fa fa-pencil-square-o',
                        viewType: 'register',
                        leaf: true
                    },
                    {
                        text: 'Password Reset',
                        iconCls: 'x-fa fa-lightbulb-o',
                        viewType: 'passwordreset',
                        leaf: true
                    }
                ]
            },
            {
                text: 'Widgets',
                hidden: true,
                iconCls: 'x-fa fa-flask',
                viewType: 'widgets',
                leaf: true
            },
            {
                text: 'Forms',
                hidden: true,
                iconCls: 'x-fa fa-edit',
                viewType: 'forms',
                leaf: true
            },
            {
                text: 'Charts',
                hidden: true,
                iconCls: 'x-fa fa-pie-chart',
                viewType: 'charts',
                leaf: true
            }

            */
        ]
    }
});
