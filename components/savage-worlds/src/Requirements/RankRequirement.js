var Rank = require('../Rank');

var RankRequirement = function (rank) {
    if(typeof rank === 'string') {
        this.rank = Rank.create(rank);
    } else {
        this.rank = rank;
    }
};

RankRequirement.prototype.isMet = function (character) {
    var firstLetterCaseInsensitiveMatch = new RegExp('^' + this.rank.name[0], 'i');
    return firstLetterCaseInsensitiveMatch.test(character.rank.name);
};

module.exports = RankRequirement;