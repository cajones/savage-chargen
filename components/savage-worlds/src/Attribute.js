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

module.exports = Attribute;