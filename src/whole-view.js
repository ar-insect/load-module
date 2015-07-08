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
  render: function () {
    var last = this.model.changed; // 自最后一组已改变的模型
    $(this.el).append(_.values(last)[0]);
  },
  getWidget: function (name) {
    return widget[name];
  }
});

module.exports = WholeView;