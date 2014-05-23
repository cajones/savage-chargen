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
