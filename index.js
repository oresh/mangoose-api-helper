module.exports = {
	// Fill schema with data values.
    fill: function (data, schema, useSocket) {
        let source = (typeof useSocket == 'undefined' || !useSocket) ? data.body : data;
        for (var prop in source) {
            if (!source.hasOwnProperty(prop)) continue;
            schema[prop] = source[prop];
        }
        return schema;
    },
    // Fill schema with data values from socket.
    fillSocket: function (data, schema) {
        return this.fill(data, schema, true);
    },
    // Transform object to array.
	ObjtoArr: function(obj) {
		return arr = Object.keys(obj).map(function (key) {
            return obj[key];
        });
	}
}
