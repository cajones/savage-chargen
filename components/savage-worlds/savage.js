(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./Trait":9}],2:[function(require,module,exports){
var Collection = require('./Collection');
var Trait = require('./Trait');
var Rank = require('./Rank');
var Attribute = require('./Attribute');

var Character = function (name) {
    this.name = name;

    this.rank = new Rank();

    this.pace = 6;

    this.race = null;

    this[Attribute.Agility] = new Trait('d4');
    this[Attribute.Smarts] = new Trait('d4');
    this[Attribute.Spirit] = new Trait('d4');
    this[Attribute.Strength] = new Trait('d4');
    this[Attribute.Vigor] = new Trait('d4');

    Object.defineProperty(this, 'parry', {
        get: function () {
            if(this.isUnskilled('Fighting')) return 2;

            return 2 + (this.skills.Fighting.effect /2);
        }
    });

    Object.defineProperty(this, 'toughness', {
        get: function () {
            return 2 + (this.vigor.effect /2);
        }
    });

    Object.defineProperty(this, 'charisma', {
        get: function () {
            return 0;
        }
    });

    this.skills = new Collection();
    this.edges = new Collection();
    this.hindrances = new Collection();
};

Character.prototype.getAttributePoints = function () {
    var attributes = [
        this[Attribute.Agility],
        this[Attribute.Smarts],
        this[Attribute.Spirit],
        this[Attribute.Strength],
        this[Attribute.Vigor]
    ];
    return attributes.reduce(function (aggregate, attribute) { return aggregate + attribute.factor; }, 0);
};

Character.prototype.getSkillPoints = function () {
    var skills = this.skills.values();
    var basic = skills.reduce(function (aggregate, skill) { return aggregate + skill.factor; }, skills.length);
    var linkedAttributePenalty = skills.map(function (skill) {
        return Math.max(skill.factor - this[skill.linkedAttribute].factor, 0);
    }.bind(this)).reduce(function (aggregate, penalty) {
        return aggregate + penalty;
    }, 0);
    return basic + linkedAttributePenalty;
};

Character.prototype.hasSkill = function (skill) {
    if(typeof skill === 'string') {
        skill = { name: skill };
    }
    return !!this.skills[skill.name];
};

Character.prototype.isUnskilled = function (name) {
    return !this.skills.contains(name);
};

Character.prototype.learn = function (skill) {
    if(this.hasSkill(skill)) {
        this.skills[skill.name].increase();
    } else {
        this.skills[skill.name] = skill;
    }
    return this;
};

Character.prototype.toString = function () {
    //default formatter
    var output = '[Character' +
        (this.name ? ' ' + this.name : '') +
        (this.race ? this.race.toString() : '') +
        this.rank.toString() +
        ',Ag(' + this.agility.value + ')' +  
        ',Sm(' + this.smarts.value + ')' +  
        ',Sp(' + this.spirit.value + ')' +  
        ',St(' + this.strength.value + ')' +  
        ',Vi(' + this.vigor.value + ')' +  
        ']';
    return output;
};

module.exports = Character;
},{"./Attribute":1,"./Collection":3,"./Rank":6,"./Trait":9}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
var Hindrance = function (name, severity, effect) {
    Object.defineProperty(this, 'name', {
        value: name
    });
    Object.defineProperty(this, 'effect', {
        value: effect
    });
    Object.defineProperty(this, 'severity', {
        value: /^Major$/i.test(severity) ? 'Major' : 'Minor'
    });
    Object.defineProperty(this, 'isMajor', {
        value: /^Major$/i.test(severity)
    });
};

Hindrance.prototype.toString = function () {
    return this.name + '(' + this.severity +')';
};

Hindrance.AllThumbs = function () {
    return new Hindrance('All Thumbs', 'Minor', '–2 Repair; Roll of 1 causes malfunction');
};
Hindrance.Anemic = function () {
    return new Hindrance('Anemic', 'Minor','–2 to Fatigue tests');
};
Hindrance.Arrogant = function () {
    return new Hindrance('Arrogant', 'Major', 'Must humiliate opponent, challenge the ‘leader’');
};
Hindrance.BadEyes = function () {
    return new Hindrance('Bad Eyes', 'Major', '–2 to attack or notice something more than 5” distant');
};
Hindrance.SlightlyBadEyes = function () {
    return new Hindrance('Bad Eyes', 'Minor', 'Without corrective lens: –2 to attack or notice something more than 5” distant');
};
Hindrance.BadLuck = function () {
    return new Hindrance('Bad Luck', 'Major', 'One less Benny per session');
};
Hindrance.BigMouth = function () {
    return new Hindrance('Big Mouth', 'Minor', 'Unable to keep a secret, blabs at the worst time');
};
Hindrance.Blind = function () {
    return new Hindrance('Blind', 'Major', '–6 to all actions that rely on vision; –2 on social rolls, gain additional Edge');
};
Hindrance.Bloodthirsty = function () {
    return new Hindrance('Bloodthirsty', 'Major', 'Never takes prisoner');
};
Hindrance.Cautious = function () {
    return new Hindrance('Cautious', 'Minor', 'Character is overly careful');
};
Hindrance.Clueless = function () {
    return new Hindrance('Clueless', 'Major', '-2 to most Common Knowledge rolls');
};
Hindrance.CodeOfHonour = function () {
    return new Hindrance('Code of Honor', 'Major', 'Character keeps his word and acts like a gentleman');
};
Hindrance.DeathWish = function () {
    return new Hindrance('Death Wish', 'Major', 'Hero wants to die after completing some task');
};
Hindrance.Delusional = function () {
    return new Hindrance('Delusional', 'Major', 'Character suffers from grave delusions');
};
Hindrance.SlightlyDelusional = function () {
    return new Hindrance('Delusional', 'Minor', 'Character suffers from mild delusions');
};
Hindrance.DoubtingThomas = function () {
    return new Hindrance('Doubting Thomas', 'Minor', 'Character doesn’t believe in the supernatural');
};
Hindrance.Elderly = function () {
    return new Hindrance('Elderly', 'Major', 'Pace –1, –1 to Strength and Vigor die types; +5 skill points for any skill linked to Smarts');
};
Hindrance.Enemy = function () {
    return new Hindrance('Enemy', 'Major', 'Character has a recurring nemesis of some sort');
};
Hindrance.MinorEnemy = function () {
    return new Hindrance('Enemy', 'Minor', 'Character has a recurring nemesis of some sort');
};
Hindrance.Greedy = function () {
    return new Hindrance('Greedy', 'Major', 'Character is obsessed with wealth');
};
Hindrance.SlightlyGreedy = function () {
    return new Hindrance('Greedy', 'Minor', 'Character is inclined to obtain wealth');
};
Hindrance.Habit = function () {
    return new Hindrance('Habit', 'Major', 'Charisma –1; Fatigue rolls when deprived of Major Habits');
};
Hindrance.SlightHabit = function () {
    return new Hindrance('Habit', 'Minor', 'Charisma –1');
};
Hindrance.HardOfHearing = function () {
    return new Hindrance('Hard of Hearing', 'Major', '–2 to Notice sounds; automatic failure if completely deaf');
};
Hindrance.SlightlyHardOfHearing = function () {
    return new Hindrance('Hard of Hearing', ' Minor', '–2 to Notice sounds; automatic failure if completely deaf');
};
Hindrance.Heroic = function () {
    return new Hindrance('Heroic', 'Major','Character always helps those in need');
};
Hindrance.Illiterate = function () {
    return new Hindrance('Illiterate', 'Minor', 'Hero is unable to read or write');
};
Hindrance.Lame = function () {
    return new Hindrance('Lame', 'Major', '–2 Pace and running die is a d4');
};
Hindrance.Loyal = function () {
    return new Hindrance('Loyal', 'Minor', 'The hero tries to never betray or disappoint his friends');
};
Hindrance.Mean = function () {
    return new Hindrance('Mean', 'Minor', '–2 to his Charisma for ill-temper and surliness');
};
Hindrance.Obese = function () {
    return new Hindrance('Obese', 'Minor', '+1 Toughness, –1 Pace, d4 running die');
};
Hindrance.OneArm = function () {
    return new Hindrance('One Arm', 'Major', '–4 to tasks requiring two arms');
};
Hindrance.OneEye = function () {
    return new Hindrance('One Eye', 'Major', '-1 Charisma, –2 to rolls requiring depth perception');
};
Hindrance.OneLeg = function () {
    return new Hindrance('One Leg', 'Major', 'Pace –2, d4 running die, –2 to rolls requiring mobility, –2 to Swimming skill');
};
Hindrance.Outsider = function () {
    return new Hindrance('Outsider', 'Minor', '-2 Charisma');
};
Hindrance.Overconfident = function () {
    return new Hindrance('Overconfident', 'Major', 'The hero believes he can do anything');
};
Hindrance.Pacifist = function () {
    return new Hindrance('Pacifist', 'Major', 'Won’t harm living creatures');
};
Hindrance.MinorPacifist = function () {
    return new Hindrance('Pacifist', 'Minor', 'Character fights only in self-defense');
};
Hindrance.Phobia = function () {
    return new Hindrance('Phobia', 'Major', '–4 Trait tests when near the phobia');
};
Hindrance.SlightPhobia = function () {
    return new Hindrance('Phobia', 'Minor', '–2 Trait tests when near the phobia');
};
Hindrance.Poverty = function () {
    return new Hindrance('Poverty', 'Minor', 'Half starting funds, inability to hang onto future income');
};
Hindrance.Quirk = function () {
    return new Hindrance('Quirk', 'Minor', 'Character has some minor but persistent foible');
};
Hindrance.Small = function () {
    return new Hindrance('Small', 'Major', '–1 Toughness');
};
Hindrance.Stubborn = function () {
    return new Hindrance('Stubborn', 'Minor', 'Hero always wants his way');
};
Hindrance.Ugly = function () {
    return new Hindrance('Ugly', 'Minor', '–2 Charisma due to appearance');
};
Hindrance.Vengeful = function () {
    return new Hindrance('Vengeful', 'Major', 'Character holds a grudge; will kill');
};
Hindrance.SlightlyVengeful = function () {
    return new Hindrance('Vengeful', 'Minor', 'Character holds a grudge');
};
Hindrance.Vow = function () {
    return new Hindrance('Vow', 'Major', 'A pledge to a group, deity, or religion');
};
Hindrance.MinorVow = function () {
    return new Hindrance('Vow', 'Minor', 'A pledge to a group, deity, or religion');
};
Hindrance.Wanted = function () {
    return new Hindrance('Wanted', 'Major', 'The character is a criminal of some sort');
};
Hindrance.SlightlyWanted = function () {
    return new Hindrance('Wanted', 'Minor','The character is a criminal of some sort');
};
Hindrance.Yellow = function () {
    return new Hindrance('Yellow', 'Major', 'The character is cowardly and suffers –2 to Fear checks');
};
Hindrance.Young = function () {
    return new Hindrance('Young', 'Major', 'Only 3 points for Attributes, 10 skill points, +1 Benny per session');
};

module.exports = Hindrance;

},{}],5:[function(require,module,exports){
var Race = function (name) {
    this.name = name;
};

Race.prototype.toString = function () {
	return this.name;
};

Race.Human = new Race('Human');
module.exports = Race;
},{}],6:[function(require,module,exports){
var Rank = function (xp) {
    this.xp = parseInt(xp) || 0;
    Object.defineProperty(this, 'name', {
        get: function () {
            if(this.xp < 20) {
                return 'Novice';
            } else if (this.xp < 40) {
                return 'Seasoned';
            } else if( this.xp < 60) {
                return 'Veteran';
            } else if( this.xp < 80) {
                return 'Heroic';
            } else {
                return 'Legendary';
            }
        }
    });
    
};

Rank.prototype.toString = function () {
    return this.name + '(' + this.xp + ')';
};

module.exports = Rank;
},{}],7:[function(require,module,exports){
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return (root.Savage = factory());
        });
    } else if (typeof exports === 'object') {
        module.exports = root.Savage = factory();
    }
    if(typeof window !== 'undefined') {
        window.Savage = root.Savage;
    }
}(this, function () {
    return {
        Character: require('./Character'),
        Attribute: require('./Attribute'),
        Skill: require('./Skill'),
        Race: require('./Race'),
        Hindrance: require('./Hindrance')
    };
}));
},{"./Attribute":1,"./Character":2,"./Hindrance":4,"./Race":5,"./Skill":8}],8:[function(require,module,exports){
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
},{"./Attribute":1,"./Trait":9}],9:[function(require,module,exports){
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
Trait.prototype.decrease = function () {
    return scale[--this.factor];
};

Trait.prototype.toString = function () {
    return '[Trait ' + this.value + ']';
};

module.exports = Trait;

},{}]},{},[1,2,3,4,5,6,7,8,9])