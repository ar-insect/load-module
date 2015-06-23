
  var _ = require('lodash');
  var Backbone = require('backbone');

  var BlockView = Backbone.View.extend({
    events: {},
    className: 'sp-block',
    initialize: function () {
      // 模板引擎预处理
      this.template = _.isString(this.template) ?
                    _.template(this.template) : this.template; // 初始化模板

      this.trigger('data:launch');
    },
    render: function () {
      this.template && alert( this.model.get('rows') );
    },
    getWidget: function(name) {
      // 由block.getWidget代理
    }
  });

  module.exports = BlockView;
