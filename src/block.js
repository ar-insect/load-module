var _ = require('lodash');
  var Backbone = require('backbone');

  var Block = Backbone.Model.extend({
    initialize: function () {
      //console.log( this );
    },
    validate: function (attributes, options) {
      // validate 验证
      //if (_.trim(this.get('value')) === '') {
      //    return '{title}不能为空！';
      // }
      //alert('这里触发验证逻辑！');
    },
    start: function(el) {
      // 向服务器发送请求
      var _self = this;
      var url = this.get('url');
      var param = this.get('param');
      // loading...
      $('<span>正在加载中...</span>').appendTo(el);
      if (url.indexOf('.json') > -1) {
        this.save(param, {
          url: url,
          wait: true, // 等待服务器端设置新的属性
          success: function (model, resp, options) {
            _self.trigger('whole:set', _self, resp);
          },
          error: function (model, resp, options) {
            //this.doError
            //console.log(resp);
          }
        });
      } else {
        $(el).load(url, param, function() {
          var data = arguments[0];
          var result = arguments[1];
          if ('success' === result) {
            _self.trigger('whole:set', _self, el);
          }
        });
      }
    }
  });

  module.exports = Block;
