// scrap.js
'use strict';
var root = this,
    // modules
    level = require('level'),
    crypto = require('crypto'),
    path = require('path'),
    // methods
    hash = null,
    create = null,
    read = null,
    list = null,
    remove = null,
    // database
    scraps = level(
        path.join(
            __dirname, '..', 'builtin', 'scraps'    
        )        
    );

hash = root.hash = function ( now ) {
    var out = null;
    var hash = crypto.createHash('md5');

    hash.update( now.getTime().toString() );
    out = hash.digest('hex');

    return out;
};

create = root.create = function ( content, fn ) { 
    var fn = fn || function () {};
    var key = hash( new Date() );
    var action = [];

    action.push({
        type: 'put',
        key: key,
        valueEncoding: 'json',
        value: content
    });

    scraps.batch(action, function (err) {
        fn( err, key );
    });

    return scraps;
};

read = root.read = function (key, fn) {
    var fn = fn || function () {};

    scraps.get( key, function (err, value) {
        if ( value )
            return fn(err, JSON.parse(value));
        return fn( err, null );
    });
    return scraps;
};

list = root.list = function (fn) {
    var fn = fn || function () {};
    var out = {};

    scraps
        .createReadStream()
        .on('data', function (data) {
            out[ data.key ] = data.value;
        })
        .on('end', function (err) {
            fn( err, out );
        });

    return scraps;
};

remove = root.remove = function (key, fn) {
    var fn = fn || function () {};

    scraps.del(key, function (err) {
        if (err) return fn(err, false);
        return fn(err, true);
    });

    return scraps;
};
