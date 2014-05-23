var Trait = require('./Trait');
var Attribute = require('./Attribute');

var Skill = function (initialValue, name, linkedAttribute) {
    Trait.apply(this, arguments);
    Object.defineProperty(this, 'name', {
        value: name
    });
    Object.defineProperty(this, 'linkedAttribute', {
        value: linkedAttribute || Attribute.Smarts
    });
};

Skill.prototype = new Trait();

Skill.prototype.toString = function () {
    return this.name;
};

//Agility Skills
Skill.Boating = function () {
    return new Skill('d4', 'Boating', Attribute.Agility);
};
Skill.Driving = function () {
    return new Skill('d4', 'Driving', Attribute.Agility);
};
Skill.Fighting = function () {
    return new Skill('d4', 'Fighting', Attribute.Agility);
};
Skill.Lockpicking = function () {
    return new Skill('d4', 'Lockpicking', Attribute.Agility);
};
Skill.Piloting = function () {
    return new Skill('d4', 'Piloting', Attribute.Agility);
};
Skill.Riding = function () {
    return new Skill('d4', 'Riding', Attribute.Agility);
};
Skill.Shooting = function () {
    return new Skill('d4', 'Shooting', Attribute.Agility);
};
Skill.Stealth = function () {
    return new Skill('d4', 'Stealth', Attribute.Agility);
};
Skill.Swimming = function () {
    return new Skill('d4', 'Swimming', Attribute.Agility);
};
Skill.Throwing = function () {
    return new Skill('d4', 'Throwing', Attribute.Agility);
};

//Smarts Skills
Skill.Gambling = function () {
    return new Skill('d4', 'Gambling', Attribute.Smarts);
};
Skill.Healing = function () {
    return new Skill('d4', 'Healing', Attribute.Smarts);
};
Skill.Investigation = function () {
    return new Skill('d4', 'Investigation', Attribute.Smarts);
};
Skill.Notice = function () {
    return new Skill('d4', 'Notice', Attribute.Smarts);
};
Skill.Repair = function () {
    return new Skill('d4', 'Repair', Attribute.Smarts);
};
Skill.Streetwise = function () {
    return new Skill('d4', 'Streetwise', Attribute.Smarts);
};
Skill.Survival = function () {
    return new Skill('d4', 'Survival', Attribute.Smarts);
};
Skill.Taunt = function () {
    return new Skill('d4', 'Taunt', Attribute.Smarts);
};
Skill.Tracking = function () {
    return new Skill('d4', 'Tracking', Attribute.Smarts);
};

//Spirit Skills
Skill.Intimidation = function () {
    return new Skill('d4', 'Intimidation', Attribute.Spirit);
};
Skill.Persuasion = function (specialty) {
    return new Skill('d4', 'Persuasion', Attribute.Spirit);
};

//Strength Skills
Skill.Climbing = function (specialty) {
    return new Skill('d4', 'Climbing', Attribute.Strength);
};

module.exports = Skill;