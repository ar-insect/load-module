var _ = require('lodash');
var Backbone = require('backbone');

var BlockView = Backbone.View.extend({
  events: {},
  className: 'sp-block',
  initialize: function () {
    //预编译模板
    var handlebars = this.getWidget('handlebars');
    this.template = _.isString(this.template) ? (handlebars && handlebars.compile(this.template)) : null;
    this.trigger('block:start', this.$el);
  },
  render: function () {
    var html, node;
    var data = this.model.get('data');
    if (this.template) {
      html = this.template(data);
      node = $(this.el).empty().append(html);
    } else {
      node = data;
    }
    this.trigger('whole:render', node);
  },
  getWidget: function (name) {
    // 由block.getWidget代理
  }
});

module.exports = BlockView;