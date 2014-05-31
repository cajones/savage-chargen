var scale = ['d4', 'd6', 'd8', 'd10', 'd12', 'd12+1', 'd12+2', 'd12+3', 'd12+4'];
var Trait = function (initialValue) {
    var _factor = initialValue ? scale.indexOf(initialValue) : 0;
    Object.defineProperty(this, 'factor', {
        get: function () {
            return _factor;
        },
        set: function (value) {
            _factor = Math.max(0, Math.min(scale.length, value));
        }
    });
    Object.defineProperty(this, 'value', {
        get: function () {
            return scale[this.factor];
        }
    });
    Object.defineProperty(this, 'effect', {
        get: function () {
            return (this.factor * 2) + 4;
        }
    });
};

Trait.prototype.increase = function () {
    return scale[++this.factor];
};

Trait.prototype.increaseTo =Trait.prototype.decreaseTo = function (value) {
    if(scale.indexOf(value) > -1) {
        this.factor = scale.indexOf(value);
    }
    return this;
};

Trait.prototype.decrease = function () {
    return scale[--this.factor];
};

Trait.prototype.toString = function () {
    return '[Trait ' + this.value + ']';
};

module.exports = Trait;
