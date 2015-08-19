Ext.define('WebRTC.data.request.Ajax', {
    override: 'Ext.data.request.Ajax',

    createResponse: function(xhr) {
        var me = this,
            isXdr = me.isXdr,
            headers = {},
            lines = isXdr ? [] : xhr.getAllResponseHeaders().replace(/\r\n/g, '\n').split('\n'),
            count = lines.length,
            line, index, key, response, byteArray;

        while (count--) {
            line = lines[count];
            index = line.indexOf(':');

            if (index >= 0) {
                key = line.substr(0, index).toLowerCase();

                if (line.charAt(index + 1) == ' ') {
                    ++index;
                }

                headers[key] = line.substr(index + 1);
            }
        }


        response = {
            request: me,
            requestId: me.id,
            status: xhr.status,
            statusText: xhr.statusText,
            getResponseHeader: me._getHeader,
            getAllResponseHeaders: me._getHeaders,
            headers : headers
        };

        if (isXdr) {
            me.processXdrResponse(response, xhr);
        }

        if (me.binary) {
            response.responseBytes = me.getByteArray(xhr);
        }
        else {
            // an error is thrown when trying to access responseText or responseXML
            // on an xhr object with responseType of 'arraybuffer', so only attempt
            // to set these properties in the response if we're not dealing with
            // binary data
            response.responseText = xhr.responseText;
            response.responseXML = xhr.responseXML;
        }

        return response;
    },

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
