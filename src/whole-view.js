var _ = require('lodash');
var Backbone = require('backbone');
// widget
var widget = {
  handlebars: require('handlebars')
};

var WholeView = Backbone.View.extend({
  className: 'sp-wrap',
  el: $('.container'),
  initialize: function () {
    //this.constructor.prototype.widget = widget;
  },
  render: function (node) {
    $(this.el).append(node);
  },
  getWidget: function (name) {
    return widget[name];
  }
});

module.exports = WholeView;