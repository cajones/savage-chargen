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