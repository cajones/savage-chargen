var Trait = require('../Trait');
var AttributeRequirement = function (attribute, value) {
    this.attribute = attribute;
    this.value = new Trait(value);
};

AttributeRequirement.prototype.isMet = function (character) {
    return character[this.attribute].factor >= this.value.factor;
};

module.exports = AttributeRequirement;