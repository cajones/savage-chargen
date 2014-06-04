var Trait = require('../Trait');

var MultiSkillRequirement = function (value, expression, quantity) {
    this.quantity = (quantity === undefined) ? 0 : parseInt(quantity);
    this.expression = expression;
    this.trait = new Trait(value);
};

MultiSkillRequirement.prototype.isMet = function (character) {
    return character.skills.filter(function (skill) {
        console.log(skill.name, this.expression.test(skill.name), skill.factor, this.trait.factor)
        return this.expression.test(skill.name) && skill.factor >= this.trait.factor;
    }.bind(this)).length >= this.quantity;
};

module.exports = MultiSkillRequirement;