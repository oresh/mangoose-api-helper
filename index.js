module.exports = {
    // Fill schema with data values.
    fill: function (data, schema, options) {
        let source = data.body;
        if (typeof options != 'undefined' && typeof options.useSocket != 'undefined' && options.useSocket) {
            source = data;
        }
        for (var prop in source) {
            if (!source.hasOwnProperty(prop)) continue;
            if (Array.isArray(source[prop])) {
                for (var i = 0, len = source[prop].length; i < len; i++) {
                    if (typeof source[prop][i] == 'object') {
                        if (typeof options.Model != 'undefined') {
                            schema[prop][i] = new options.Model();
                            for (var sprop in source[prop][i]) {
                                if (!source[prop][i].hasOwnProperty(sprop)) continue;
                                schema[prop][i][sprop] = source[prop][i][sprop];
                            }
                        } else {
                           schema[prop][i] = source[prop][i];
                        }
                    } else {
                        schema[prop][i] = source[prop][i];
                    }
                }
            } else {
                schema[prop] = source[prop];
            }
        }
        return schema;
    },
    // Fill schema with data values from socket.
    fillSocket: function (data, schema) {
        return this.fill(data, schema, {useSocket : true});
    },
    // Transform object to array.
    ObjtoArr: function(obj) {
        return arr = Object.keys(obj).map(function (key) {
            return obj[key];
        });
    }
}
