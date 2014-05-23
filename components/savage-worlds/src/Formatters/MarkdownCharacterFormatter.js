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