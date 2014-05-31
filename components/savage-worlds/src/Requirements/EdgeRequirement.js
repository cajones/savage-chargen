var EdgeRequirement = function (edge) {
    this.edge = edge;
};

EdgeRequirement.prototype.isMet = function (character) {
    return character.edges.contains(this.edge);
};

module.exports = EdgeRequirement;