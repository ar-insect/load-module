
  var _ = require('lodash');
  var Backbone = require('backbone');

  var BlockView = Backbone.View.extend({
    events: {},
    className: 'sp-block',
    initialize: function () {

      this.template = _.isString(this.template) ?
                    _.template(this.template) : this.template; // 初始化模板

      this.trigger('data:launch');
    },
    render: function () {
      this.template && alert( this.model.get('rows') );
    },
    getWidget: function(name) {

    }
  });

  module.exports = BlockView;
