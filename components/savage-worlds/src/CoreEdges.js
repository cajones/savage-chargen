var Attribute = require('./Attribute'),
    Edge = require('./Edge');

//All edges from Savage Worlds Deluxe
module.exports = [

    //Background Edges
    new Edge('Alertness', Edge.requires('N'), '+2 Notice'),
    new Edge('Ambidextrous', [Edge.requires('N'), Edge.requires(Attribute.Agility, 'd8')], 'Ignore -2 penalty for using off-hand'),
    new Edge('Arcane Background', Edge.requires('N'), 'Allows access to supernatural powers'),
    new Edge('Arcane Resistance', [Edge.requires('N'), Edge.requires(Attribute.Spirit, 'd8')], 'Armor 2 vs. magic, +2 to resist magic effects'),
        new Edge('Improved Arcane Resistance', [Edge.requires('N'), Edge.requires('Arcane Resistance')], 'Armor 4 vs. magic, +4 to resist magic effects'),
    new Edge('Attractive', [Edge.requires('N'), Edge.requires(Attribute.Vigor, 'd6')], 'Charisma +2'),
        new Edge('Very Attractive', [Edge.requires('N'), Edge.requires('Attractive')], 'Charisma +4'),
    new Edge('Berserk', [Edge.requires('N')], 'Smarts roll or go Berserk after being wounded; +2 Fighting and Strength rolls, -2 Parry, +2 Toughness; Roll of 1on Fighting die hits random adjacent target'),
    new Edge('Brave', [Edge.requires('N'), Edge.requires(Attribute.Spirit, 'd6')], '+2 to Fear tests'),
    new Edge('Brawny', [Edge.requires('N'), Edge.requires(Attribute.Strength, 'd6'), Edge.requires(Attribute.Vigor, 'd6')], 'Toughness +1; load limit is 8xStr instead of 5xStr'),
    new Edge('Fast Healer', [Edge.requires('N'), Edge.requires(Attribute.Vigor, 'd8')], '+2 to natural healing rolls'),
    new Edge('Fleet-Footed', [Edge.requires('N'), Edge.requires(Attribute.Agility, 'd6')], '+2 Pace, d10 running die instead of d6'),
    new Edge('Linguist', [Edge.requires('N'), Edge.requires(Attribute.Smarts, 'd6')], 'Begin play with a number of languages equal to Smarts; Smarts –2 to be understood in any language heard for a week'),
    new Edge('Luck', [Edge.requires('N')], '+1 Benny per session'),
        new Edge('Great Luck', [Edge.requires('N')], '+2 Benny per session'),
    new Edge('Noble', [Edge.requires('N')], '+2 Charisma; Character is noble born with status and wealth'),
    new Edge('Quick', [Edge.requires('N'), Edge.requires(Attribute.Agility, 'd8')], 'Discard draw of 5 or less for new card'),
    new Edge('Rich', [Edge.requires('N')], '3x starting funds, $75K annual salary'),
        new Edge('Filty rich', [Edge.requires('N'), Edge.requires.either('Rich', 'Noble')], '5x starting funds, $250K annual salary'),

    //Combat Edges

];
