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