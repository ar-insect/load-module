
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
    launch: function() {
      // 向服务器发送请求
      var _self = this;
      var url = this.get('url');
      var param = this.get('param');
      if (url) {
        this.save(param, {
          url: url,
          wait: true, // 等待服务器端设置新的属性
          success: function (model, resp, options) {
            //console.log(resp);
            //console.log(_self.get('rows'));
          },
          error: function (model, resp, options) {
            //this.doError
            //console.log(resp);
          }
        });

      }
    }
  });

  module.exports = Block;
