cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-opentokjs/src/android/opentok.js",
        "id": "cordova-plugin-opentokjs.OpenTokClient",
        "clobbers": [
            "OT"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-crosswalk-webview": "1.2.0",
    "cordova-plugin-opentokjs": "0.1.2",
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-plugin-device": "1.0.1",
    "cordova-plugin-inappbrowser": "1.0.1"
}
// BOTTOM OF METADATA
});