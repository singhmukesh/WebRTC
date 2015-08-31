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
    "cordova-plugin-crosswalk-webview": "1.2.0",
    "cordova-plugin-iosrtc": "1.4.5"
}
// BOTTOM OF METADATA
});