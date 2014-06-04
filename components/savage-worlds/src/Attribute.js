var Trait = require('./Trait');
var Attribute = function () {
    Trait.apply(this, arguments);
};
Attribute.prototype = Trait.prototype;

Attribute.Agility = 'agility';
Attribute.Smarts = 'smarts';
Attribute.Spirit = 'spirit';
Attribute.Strength = 'strength';
Attribute.Vigor = 'vigor';

Attribute.isAttribute = function (name) {
    if(name instanceof Attribute) return true;
    var isAttribute = /^agility?$|^smarts?$|^spirit?$|^strength?$|^vigor?$/i;
    return isAttribute.test(name);
};

module.exports = Attribute;