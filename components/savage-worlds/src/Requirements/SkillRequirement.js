var Skill = require('../Skill');

var SkillRequirement = function (skill, optionalValue, optionallinkedAttribute) {
    if(typeof skill === 'string' && arguments.length >= 2) {
        this.skill = new Skill(optionalValue, skill, optionallinkedAttribute);
    } else {
        this.skill = skill;
    }
};

SkillRequirement.prototype.isMet = function (character) {
    return character.hasSkill(this.skill) && (character.skills[this.skill.name].factor >= this.skill.factor);
};

module.exports = SkillRequirement;