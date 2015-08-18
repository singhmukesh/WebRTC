Ext.define('WebRTC.data.request.Ajax', {
    override: 'Ext.data.request.Ajax',


    // Fix for PhoneGap/Cordova: 
    // XHR to local files are made thru file:// protocol this means that
    // status code will be 0 indicating a success xhr request, if so we will check that responseText
    // is not empty to assume request was successful.
    parseStatus: function(status) {
        // see: https://prototype.lighthouseapp.com/projects/8886/tickets/129-ie-mangles-http-response-status-code-204-to-1223
        status = status == 1223 ? 204 : status;

        var success = (status >= 200 && status < 300) || status == 304 || (status == 0 && xhr.responseText && xhr.responseText.length > 0),
            isException = false;

        if (!success) {
            switch (status) {
                case 12002:
                case 12029:
                case 12030:
                case 12031:
                case 12152:
                case 13030:
                    isException = true;
                    break;
            }
        }
        
        return {
            success: success,
            isException: isException
        };
    }
});
