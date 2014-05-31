var Collection = require('./Collection');

var Edges = new Collection();

Object.defineProperty(Edges, 'extend', {
    enumerable: false,
    value: function (imported) {
        if(Array.isArray(imported)) {
            imported.forEach(function (edge) {
                this.add(edge.name, edge);
            }.bind(this));
        }
        if(typeof imported !== 'object') return;
        for(var edge in imported) {
            if(imported.hasOwnProperty(edge)) {
                this.add(edge, imported[edge]);
            }
        }
        return this;
    }
});

module.exports = Edges;