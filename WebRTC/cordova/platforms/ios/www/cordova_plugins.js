cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-opentokjs/src/ios/opentok.js",
        "id": "cordova-plugin-opentokjs.OpenTokClient"
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
    },
    {
        "file": "plugins/cordova-plugin-iosrtc/dist/cordova-plugin-iosrtc.js",
        "id": "cordova-plugin-iosrtc.Plugin",
        "clobbers": [
            "cordova.plugins.iosrtc"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-plugin-opentokjs": "0.1.2",
    "cordova-plugin-device": "1.0.1",
    "cordova-plugin-inappbrowser": "1.0.1",
    "cordova-plugin-iosrtc": "1.4.5"
}
// BOTTOM OF METADATA
});