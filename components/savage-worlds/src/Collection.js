var Collection = function() {
    Object.defineProperty(this, 'length', {
        get: function () {
            return Object.keys(this).length;
        }
    });
};

Collection.prototype = {
    add: function (key, value) {
        if(this.contains(key)) return false;
        if(arguments.length === 1 && typeof key === 'object' && key.toString) {
            value = key;
            key = value.toString();
        }
        this[key] = value;
        return true;
    },
    remove: function (key) {
        if(!this.contains(key)) return false;
        delete this[key];
        return true;
    },
    contains: function (item) {
        return typeof this[item] !== 'undefined' || Object.keys(this).indexOf(item) != -1;
    },
    keys: function() {
        return Object.keys(this);
    },
    values: function () {
        return this.keys().map(function (key) { return this[key]; }.bind(this));
    },
    map: function (/* arguments */) {
        return Array.prototype.map.apply(this.values(), arguments);
    },
    filter: function (/* arguments */) {
        return Array.prototype.filter.apply(this.values(), arguments);
    },
    reduce: function (/* arguments */) {
        return Array.prototype.reduce.apply(this.values(), arguments);
    },
    forEach: function (/* arguments */) {
        return Array.prototype.forEach.apply(this.values(), arguments);
    },
};
module.exports = Collection;