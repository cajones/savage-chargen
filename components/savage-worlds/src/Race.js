var Race = function (name) {
    this.name = name;
};

Race.prototype.toString = function () {
	return this.name;
};

Race.Human = new Race('Human');
module.exports = Race;