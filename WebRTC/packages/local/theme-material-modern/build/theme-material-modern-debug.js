Ext.define('Ext.theme.neptune.Component', {
    override: 'Ext.Component'
}, function() {
    Ext.namespace('Ext.theme.is').Neptune = true;
    Ext.theme.name = 'Neptune';
    Ext.theme.getDocCls = function() {
        return Ext.platformTags.desktop ? '' : 'x-big';
    };
});

Ext.define('Ext.theme.neptune.Toolbar', {
    override: 'Ext.Toolbar',
    config: {
        defaultButtonUI: 'action'
    }
});

Ext.define('Material.override.Component', {
    override: 'Ext.Component',
    // override:
    // Don't add component to Viewport if a parent is given.
    // This is helpful when wanting to inherit the parent's view controller.
    showBy: function(component, alignment) {
        var me = this,
            viewport = Ext.Viewport,
            parent = me.getParent();
        me.setVisibility(false);
        if (!parent && viewport) {
            viewport.add(me);
        }
        me.show();
        me.on({
            hide: 'onShowByErased',
            destroy: 'onShowByErased',
            single: true,
            scope: me
        });
        component.on('resize', 'alignTo', me, {
            args: [
                component,
                alignment
            ]
        });
        me.alignTo(component, alignment);
        me.setVisibility(true);
    }
});

Ext.define('Material.LoadMask', {
    override: 'Ext.LoadMask',
    getTemplate: function() {
        var prefix = Ext.baseCSSPrefix;
        return [
            {
                //it needs an inner so it can be centered within the mask, and have a background
                reference: 'innerElement',
                cls: prefix + 'mask-inner',
                children: [
                    //the elements required for the CSS loading {@link #indicator}
                    {
                        reference: 'indicatorElement',
                        cls: prefix + 'loading-spinner-outer',
                        html: '<svg class="spinner" width="40px" height="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="20" cy="20" r="16"></circle></svg>'
                    }
                ]
            }
        ];
    },
    updateMessage: Ext.emptyFn,
    updateMessageCls: Ext.emptyFn
});

Ext.define('Material.field.Text', {
    override: 'Ext.field.Text',
    listeners: {
        change: function(field, value) {
            if (value) {
                field.el.addCls('not-empty');
            }
        },
        focus: function() {
            this.addCls('had-focus');
        }
    }
});

Ext.define('Material.FloatingActionButton', {
    extend: 'Ext.Button',
    xtype: 'floatingactionbutton',
    cls: 'material-floating-action-button',
    floating: true,
    hidden: true,
    width: 55,
    height: 55,
    style: 'position: absolute;'
});

