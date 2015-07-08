var _ = require('lodash');
var Backbone = require('backbone');

var Block = Backbone.Model.extend({
  initialize: function () {
    //console.log( this );
  },
  loadingNode: undefined,
  validate: function (attributes, options) {
    // validate 验证
    //if (_.trim(this.get('value')) === '') {
    //    return '{title}不能为空！';
    // }
    //alert('这里触发验证逻辑！');
  },
  loading: function (cls, parent) {
    //console.log(arguments);
    this.loadingNode = $('<div class="' + cls + '"><span>正在加载中...</span></div>').appendTo(parent);
  },
  unloading: function (node) {
    $(node).remove();
  },
  start: function (el) {
    // 向服务器发送请求
    var _self = this;
    var url = this.get('url');
    var param = this.get('param');
    if (url.indexOf('.json') > -1) {
      this.save(param, {
        url: url,
        wait: true, // 等待服务器端设置新的属性
        success: function (model, resp, options) {
          _self.trigger('block:unloading', _self.loadingNode);
          _self.trigger('whole:set', _self, resp);
        },
        error: function (model, resp, options) {
          //this.doError
          //console.log(resp);
        }
      });
    } else {
      $(el).load(url, param, function () {
        var data = arguments[0];
        var result = arguments[1];
        if ('success' === result) {
          _self.trigger('block:unloading', _self.loadingNode);
          _self.trigger('whole:set', _self, el);
        }
      });
    }
  }
});

module.exports = Block;