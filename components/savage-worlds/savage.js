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

Attribute.isAttribute = function (name) {
    if(name instanceof Attribute) return true;
    var isAttribute = /^agility?$|^smarts?$|^spirit?$|^strength?$|^vigor?$/i;
    return isAttribute.test(name);
};

module.exports = Attribute;
},{"./Trait":19}],2:[function(require,module,exports){
var Collection = require('./Collection');
var Trait = require('./Trait');
var Rank = require('./Rank');
var Attribute = require('./Attribute');
var Formatters = require('./Formatters');

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
    return Formatters.defaultFormatter.call(this);
};

module.exports = Character;
},{"./Attribute":1,"./Collection":3,"./Formatters":8,"./Rank":11,"./Trait":19}],3:[function(require,module,exports){
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
var Attribute = require('./Attribute'),
    Edge = require('./Edge');

//All edges from Savage Worlds Deluxe
module.exports = [

    //Background Edges
    new Edge('Alertness', Edge.requires('N'), '+2 Notice', 'Background Edges'),
    new Edge('Ambidextrous', [Edge.requires('N'), Edge.requires(Attribute.Agility, 'd8')], 'Ignore -2 penalty for using off-hand', 'Background Edges'),
    new Edge('Arcane Background', Edge.requires('N'), 'Allows access to supernatural powers', 'Background Edges'),
    new Edge('Arcane Resistance', [Edge.requires('N'), Edge.requires(Attribute.Spirit, 'd8')], 'Armor 2 vs. magic, +2 to resist magic effects', 'Background Edges'),
        new Edge('Improved Arcane Resistance', [Edge.requires('N'), Edge.requires('Arcane Resistance')], 'Armor 4 vs. magic, +4 to resist magic effects'), 'Background Edges',
    new Edge('Attractive', [Edge.requires('N'), Edge.requires(Attribute.Vigor, 'd6')], 'Charisma +2', 'Background Edges'),
        new Edge('Very Attractive', [Edge.requires('N'), Edge.requires('Attractive')], 'Charisma +4', 'Background Edges'),
    new Edge('Berserk', [Edge.requires('N')], 'Smarts roll or go Berserk after being wounded; +2 Fighting and Strength rolls, -2 Parry, +2 Toughness; Roll of 1on Fighting die hits random adjacent target', 'Background Edges'),
    new Edge('Brave', [Edge.requires('N'), Edge.requires(Attribute.Spirit, 'd6')], '+2 to Fear tests', 'Background Edges'),
    new Edge('Brawny', [Edge.requires('N'), Edge.requires(Attribute.Strength, 'd6'), Edge.requires(Attribute.Vigor, 'd6')], 'Toughness +1; load limit is 8xStr instead of 5xStr', 'Background Edges'),
    new Edge('Fast Healer', [Edge.requires('N'), Edge.requires(Attribute.Vigor, 'd8')], '+2 to natural healing rolls', 'Background Edges'),
    new Edge('Fleet-Footed', [Edge.requires('N'), Edge.requires(Attribute.Agility, 'd6')], '+2 Pace, d10 running die instead of d6', 'Background Edges'),
    new Edge('Linguist', [Edge.requires('N'), Edge.requires(Attribute.Smarts, 'd6')], 'Begin play with a number of languages equal to Smarts; Smarts –2 to be understood in any language heard for a week', 'Background Edges'),
    new Edge('Luck', [Edge.requires('N')], '+1 Benny per session', 'Background Edges'),
        new Edge('Great Luck', [Edge.requires('N')], '+2 Benny per session', 'Background Edges'),
    new Edge('Noble', [Edge.requires('N')], '+2 Charisma; Character is noble born with status and wealth', 'Background Edges'),
    new Edge('Quick', [Edge.requires('N'), Edge.requires(Attribute.Agility, 'd8')], 'Discard draw of 5 or less for new card', 'Background Edges'),
    new Edge('Rich', [Edge.requires('N')], '3x starting funds, $75K annual salary', 'Background Edges'),
        new Edge('Filty rich', [Edge.requires('N'), Edge.requires.either('Rich', 'Noble')], '5x starting funds, $250K annual salary', 'Background Edges'),

    //Combat Edges
    new Edge('Block', [Edge.requires('S'), Edge.requires('Fighting', 'd8')], 'Parry +1', 'Combat Edges'),
        new Edge('Improved Block', [Edge.requires('V'), Edge.requires('Block')], 'Parry +2', 'Combat Edges'),
    new Edge('Combat Reflexes', Edge.requires('S'), '+2 to recover from Shaken', 'Combat Edges'),
    new Edge('Dodge', [Edge.requires('S'), Edge.requires(Attribute.Agility, 'd8')], '-1 to be hit with ranged attacks', 'Combat Edges'),
        new Edge('Improved Dodge', [Edge.requires('V'), Edge.requires('Dodge')], '-2 to be hit with ranged attacks', 'Combat Edges'),
    new Edge('First Strike', [Edge.requires('N'), Edge.requires(Attribute.Agility, 'd8')], 'May attack one foe who moves adjacent', 'Combat Edges'),
        new Edge('Improved First Strike', [Edge.requires('H'), Edge.requires('First Strike')], 'May attack every foe who moves adjacent', 'Combat Edges'),
    new Edge('Florentine', [Edge.requires('N'), Edge.requires(Attribute.Agility, 'd8'), Edge.requires('Fighting', 'd8')], '+1 vs foes with single weapon and no shield; ignore 1 point of gang up bonus', 'Combat Edges'),
    new Edge('Frenzy', [Edge.requires('S'), Edge.requires('Fighting', 'd10')], '1 extra Fighting attack at -2', 'Combat Edges'),
        new Edge('Improved Frenzy', [Edge.requires('V'), Edge.requires('Frenzy')], '1 extra Fighting attack', 'Combat Edges'),
    new Edge('Giant Killer', Edge.requires('V'), '+1d6 damage when attacking larger creatures', 'Combat Edges'),
    new Edge('Hard to Kill', [Edge.requires('N'), Edge.requires(Attribute.Spirit, 'd8')], 'Ignore would penalties for Vigor rolls made on the Knockout or Injury tables', 'Combat Edges'),
        new Edge('Harder to Kill', [Edge.requires('V'), Edge.requires(Attribute.Spirit, 'd8')], 'Ignore would penalties for Vigor rolls made on the Knockout or Injury tables', 'Combat Edges'),
    new Edge('Level Headed', [Edge.requires('S'), Edge.requires(Attribute.Smarts, 'd8')], ' Act on best of two cards in combat', 'Combat Edges'),
        new Edge('Improved Level Headed', [Edge.requires('S'), Edge.requires('Level Headed')], ' Act on best of three cards in combat', 'Combat Edges'),
    new Edge('Marksman', Edge.requires('S'), 'Aim maneuver (+2 Shooting) if hero does not move', 'Combat Edges'),
    new Edge('Nerves of Steel', [Edge.requires('N'), Edge.requires(Attribute.Vigor, 'd8')], 'Ignore 1 point of wound penalties', 'Combat Edges'),
        new Edge('Improved Nerves of Steel', [Edge.requires('N'), Edge.requires('Nerves of Steel')], ' Ignore 2 points of wound penalties', 'Combat Edges'),
    new Edge('No Mercy', Edge.requires('S'), 'May spend bennies on damage rolls', 'Combat Edges'),
    new Edge('Quick Draw', Edge.requires('N'), 'may draw weapon as a free action', 'Combat Edges'),
    new Edge('Rock and Roll!', [Edge.requires('S'), Edge.requires('Shooting', 'd8')], 'Ignore full-auto penalty if shooter doesn’t move', 'Combat Edges'),
    new Edge('Steady Hands', [Edge.requires('N'), Edge.requires(Attribute.Agility, 'd8')], 'Ignore unstable platform penalty', 'Combat Edges'),
    new Edge('Sweep', [Edge.requires('N'), Edge.requires(Attribute.Strength, 'd8'), Edge.requires('Fighting', 'd8')], 'Attack all adjacent foes at -2', 'Combat Edges'),
        new Edge('Improved Sweep', [Edge.requires('V'), Edge.requires('Sweep')], 'Attack all adjacent foes', 'Combat Edges'),
    new Edge('Trademark  Weapon', [Edge.requires('N'), Edge.requires.either(Edge.requires('Fighting', 'd10'), Edge.requires('Shooting', 'd10'))], '+1 Fighting or Shooting with particular weapon', 'Combat Edges'),
        new Edge('Improved Trademark  Weapon', [Edge.requires('V'), Edge.requires('Trademark Weapon')], '+2 Fighting or Shooting with particular weapon', 'Combat Edges'),
    new Edge('Two-Fisted', [Edge.requires('N'), Edge.requires(Attribute.Agility, 'd8')], 'May attack with a weapon in each hand without multi-action penalty.', 'Combat Edges'),

    //Command Edges
    new Edge('Command', [Edge.requires('N'), Edge.requires(Attribute.Smarts, 'd8')], '+1 to troops recovering from Shaken', 'Command Edges'),
    new Edge('Fervor', [Edge.requires('V'), Edge.requires(Attribute.Spirit, 'd8'), Edge.requires('Command')], '+1 melee damage to troops in command', 'Command Edges'),
    new Edge('Hold the Line!', [Edge.requires('S'), Edge.requires(Attribute.Spirit, 'd8'), Edge.requires('Command')], 'Troops have +1 toughness', 'Command Edges'),
    new Edge('Inspire', [Edge.requires('S'), Edge.requires('Command')], '+1 to Spirit rolls of all troops in command', 'Command Edges'),
    new Edge('Natural Leader', [Edge.requires('N'), Edge.requires(Attribute.Spirit, 'd8'), Edge.requires('Command')], 'Leader may give bennies to troops in command', 'Command Edges'),

    //Weird Edges
    new Edge('New Power', [Edge.requires('N'), Edge.requires('Arcane Background')], 'Character gains one new power', 'Weird Edges'),
    new Edge('Power Points', [Edge.requires('N'), Edge.requires('Arcane Background')], '+5 Power Points, once per rank only', 'Weird Edges'),
    new Edge('Rapid Recharge', [Edge.requires('S'), Edge.requires(Attribute.Spirit, 'd6'), Edge.requires('Arcane Background')], 'Regain 1 Power Point every 30 minutes', 'Weird Edges'),
        new Edge('Improved Rapid Recharge', [Edge.requires('V'), Edge.requires('Rapid Recharge')], 'Regain 1 Power Point every 15 minutes', 'Weird Edges'),
    new Edge('Soul Drain', [Edge.requires('S')], 'Drain energy from your own soul to get more power points', 'Weird Edges'),
    

];

},{"./Attribute":1,"./Edge":5}],5:[function(require,module,exports){
var Edge = function (name, requirements, effect, category, notes) {
    Object.defineProperty(this, 'name', {
        value: name
    });
    Object.defineProperty(this, 'requirements', {
        value: Array.isArray(requirements) ? requirements : [requirements]
    });
    Object.defineProperty(this, 'effect', {
        value: effect
    });
    Object.defineProperty(this, 'category', {
        value: category || 'Edges'
    });
    this.notes = notes   || '';
};

Edge.prototype.isAvailableTo = function (character) {
    return this.requirements.reduce(function (previous, requirement) {
        return previous && requirement.isMet(character);
    }, true);
};

Edge.prototype.toString = function () {
    return this.name;
};

Edge.requires = function (/*any*/) {
    var Skill = require('./Skill'),
        Attribute = require('./Attribute'),
        Rank = require('./Rank'),
        SkillRequirement = require('./Requirements/SkillRequirement'),
        AttributeRequirement = require('./Requirements/AttributeRequirement'),
        RankRequirement = require('./Requirements/RankRequirement'),
        EdgeRequirement = require('./Requirements/EdgeRequirement');

    if(arguments.length === 1) {
        var obj = arguments[0];
        if(Rank.isRank(obj)) {
            return new RankRequirement(obj);
        }
        if(typeof obj === 'object' && obj instanceof Skill) {
            return new SkillRequirement(obj);
        } else {    
            return new EdgeRequirement(obj);
        }
    } else {
        var name = arguments[0],
            value = arguments[1],
            linkedAttribute = arguments[2];

        if(Attribute.isAttribute(name)) {
            return new AttributeRequirement(name, value);
        } else {
            return new SkillRequirement(name, value, linkedAttribute);
        }
    }
};

Edge.requires.either = function (first, second) {
    var EitherRequirement = require('./Requirements/EitherRequirement'),
        EdgeRequirement = require('./Requirements/EdgeRequirement');

    if(typeof first === 'string') {
        first = new EdgeRequirement(second);
    }
    if(typeof second === 'string') {
        second = new EdgeRequirement(second);
    }

    return new EitherRequirement(first, second);
};

module.exports = Edge;
},{"./Attribute":1,"./Rank":11,"./Requirements/AttributeRequirement":12,"./Requirements/EdgeRequirement":13,"./Requirements/EitherRequirement":14,"./Requirements/RankRequirement":15,"./Requirements/SkillRequirement":16,"./Skill":18}],6:[function(require,module,exports){
var Collection = require('./Collection');

var Edges = new Collection();

Object.defineProperty(Edges, 'extend', {
    enumerable: false,
    value: function (imported) {
        if(Array.isArray(imported)) {
            imported.forEach(function (edge) {
                this.add(edge.name, edge);
            }.bind(this));
        } else {
            if(typeof imported !== 'object') return;
            for(var edge in imported) {
                if(imported.hasOwnProperty(edge)) {
                    this.add(edge.name, imported[edge]);
                }
            }    
        }
        return this;
    }
});

module.exports = Edges;
},{"./Collection":3}],7:[function(require,module,exports){
var MarkdownCharacterFormatter = function () {
    var output = this.name + '\n' +
    (this.race ? this.race.toString() + ' ' : '') + this.rank.toString() + '\n' +
    '===============================\n' +
    'Agility ' + this.agility.value + '\n' +
    'Smarts ' + this.smarts.value +  '\n' +
    'Spirit ' + this.spirit.value +  '\n' +
    'Strength ' + this.strength.value + '\n' +
    'Vigor ' + this.vigor.value + '\n' +
    '\n' +

    'Skills' + '\n' +
    '------\n' +
    this.skills.reduce(function (previous, skill) {
        return previous + skill.name + ' ' +  skill.value + '\n';
    }, '') +
    '\n' +

    'Hindrances' + '\n' +
    '----------\n' +
    this.hindrances.reduce(function (previous, hindrance) {
        return previous + hindrance.name + ' (' +  hindrance.severity + ')\n';
    }, '') +
    '\n' +

    'Edges' + '\n' +
    '-----\n' +
    this.edges.reduce(function (previous, edge) {
        return previous + edge.name + '\n';
    }, '');

    return output;
};


module.exports = MarkdownCharacterFormatter;
},{}],8:[function(require,module,exports){
module.exports = {
    defaultFormatter: require('./MarkdownCharacterFormatter'),
    MarkdownCharacterFormatter: require('./MarkdownCharacterFormatter')
};
},{"./MarkdownCharacterFormatter":7}],9:[function(require,module,exports){
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
    return this.name;
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

},{}],10:[function(require,module,exports){
var Race = function (name) {
    this.name = name;
};

Race.prototype.toString = function () {
	return this.name;
};

Race.Human = new Race('Human');
module.exports = Race;
},{}],11:[function(require,module,exports){
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

Rank.prototype.increase = function (xp) {
    this.xp += Math.max(0, parseInt(xp));
    return this;
};

Rank.prototype.toString = function () {
    return this.name;
};

Rank.Novice = Rank.N = function () {
    return new Rank(0);
};

Rank.Seasoned = Rank.S = function () {
    return new Rank(20);
};

Rank.Veteran = Rank.V = function () {
    return new Rank(40);
};

Rank.Heroic = Rank.H = function () {
    return new Rank(60);
};

Rank.Legendary = Rank.L = function () {
    return new Rank(80);
};

Rank.create = function (name) {
    if(this.isRank(name)) {
        return Rank[name].call();
    }
    return Rank.Novice();
};

Rank.isRank = function (name) {
    if(name instanceof Rank) return true;
    var isRank = /^N(ovice)?$|^S(easoned)?$|^V(eteran)?$|^H(eroic)?$|^L(egendary)?$/i;
    return isRank.test(name);
};

module.exports = Rank;
},{}],12:[function(require,module,exports){
var Trait = require('../Trait');
var AttributeRequirement = function (attribute, value) {
    this.attribute = attribute;
    this.value = new Trait(value);
};

AttributeRequirement.prototype.isMet = function (character) {
    return character[this.attribute].factor >= this.value.factor;
};

module.exports = AttributeRequirement;
},{"../Trait":19}],13:[function(require,module,exports){
var EdgeRequirement = function (edge) {
    this.edge = edge;
};

EdgeRequirement.prototype.isMet = function (character) {
    return character.edges.contains(this.edge);
};

module.exports = EdgeRequirement;
},{}],14:[function(require,module,exports){
var EitherRequirement = function(first, second) {
	this.first = first;
	this.second = second;	
};

EitherRequirement.prototype.isMet = function (character) {
	return this.first.isMet(character) || this.second.isMet(character);
};

module.exports = EitherRequirement;
},{}],15:[function(require,module,exports){
var Rank = require('../Rank');

var RankRequirement = function (rank) {
    if(typeof rank === 'string') {
        this.rank = Rank.create(rank);
    } else {
        this.rank = rank;
    }
};

RankRequirement.prototype.isMet = function (character) {
    return character.rank.xp >= this.rank.xp;
};

module.exports = RankRequirement;
},{"../Rank":11}],16:[function(require,module,exports){
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
},{"../Skill":18}],17:[function(require,module,exports){
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
        Rank: require('./Rank'),
        Hindrance: require('./Hindrance'),
        Edge: require('./Edge'),
        Edges: require('./Edges').extend(require('./CoreEdges'))
    };
}));
},{"./Attribute":1,"./Character":2,"./CoreEdges":4,"./Edge":5,"./Edges":6,"./Hindrance":9,"./Race":10,"./Rank":11,"./Skill":18}],18:[function(require,module,exports){
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
},{"./Attribute":1,"./Trait":19}],19:[function(require,module,exports){
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

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])