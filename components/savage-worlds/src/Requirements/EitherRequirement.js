var EitherRequirement = function(first, second) {
	this.first = first;
	this.second = second;	
};

EitherRequirement.prototype.isMet = function (character) {
	return this.first.isMet(character) || this.second.isMet(character);
};

module.exports = EitherRequirement;