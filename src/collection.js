
  var _ = require('underscore');
  var Backbone = require('backbone');

  var Collection = Backbone.Collection.extend({
    initialize: function () {
      //console.log( this.model );
    }
  });

  module.exports = Collection;
