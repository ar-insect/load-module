
  var _ = require('lodash');
  var loadModule = require('./namespace');

  loadModule.build = function (config) {
    if (_.isPlainObject(config)) {
      var key, blockModels = [], collection;
      var wholeViewConf, wholeModelConf;
      var wholeView, wholeModel;
      var blockViewConf, blockModelConf;
      var blockView, blockModel;
      // whole配置
      var wholeConf = config.whole;
      // blocl配置
      var blockConf = config.block;
      wholeViewConf = wholeConf.view;
      wholeModelConf = wholeConf.model;

      var blockMap = {};
      // block模型
      blockModel = loadModule.Block.extend({
        initialize: function () {
          var _self = this;
          var param = arguments;
          _self.on('block:modelinit', function (view) {
            view.listenTo(_self, 'change', view.render);
            loadModule.Block.prototype.initialize.apply(_self, param); // 调用父类初始化
            if (_.isFunction(param[0]['initialize'])) {
              param[0]['initialize'].apply(_self, param);
            }
          });
        }
      });
      // block视图
      blockView = loadModule.BlockView.extend({
        initialize: function () {
          var _self = this;
          var param = arguments;
          _self.on('block:viewinit', function (model) {
            // model 监听 view 的 launch 事件，一旦触发则调用model.setData()
            model.listenTo(_self, 'data:launch', model.launch);
            _.isPlainObject(param[0]['asocial']) && _.extend(_self, param[0]['asocial'] || {});
            loadModule.BlockView.prototype.initialize.apply(_self, param); // 调用父类初始化
            if (_.isFunction(param[0]['initialize'])) {
              param[0]['initialize'].apply(_self, param);
            }
          });
        }
      });

      for (key in blockConf) {
        blockMap[key] = {};
        blockViewConf = blockConf[key]['view']; // blockView 配置
        blockModelConf = blockConf[key]['model']; // blockModel 配置
        blockModels.push(
            blockMap[key]['model'] = new blockModel(blockModelConf)
        );
        blockMap[key]['view'] = new blockView(_.assign({model: blockMap[key]['model']}, blockViewConf));
      }
      // 集合
      collection = new loadModule.Collection(blockModels, {
        model: loadModule.Block
      });
      // whole视图
      wholeView = loadModule.WholeView.extend({
        initialize: function () {
          var _self = this;
          var param = arguments;
          _self.on('whole:viewinit', function (model) {
            _.isPlainObject(param[0]['asocial']) && _.extend(_self, param[0]['asocial'] || {});
            loadModule.WholeView.prototype.initialize.apply(_self, param); // 调用父类初始化
            if (_.isFunction(wholeViewConf.initialize)) {
              wholeViewConf.initialize.apply(_self, param);
            }
            // 提取到父类做
            for (var p in blockMap) {
              // 通过代理将view持有getWidget方法
              blockMap[p]['view']['getWidget'] = function(name) {
                return _self.getWidget(name);
              };
              blockMap[p]['view'].trigger('block:viewinit', blockMap[p]['model']);
            }
          });
        }
      });
      // whole模型
      wholeModel = loadModule.Whole.extend({
        collection: collection,
        initialize: function () {
          var _self = this;
          var param = arguments;
          _self.on('whole:modelinit', function (view) {
            view.listenTo(_self, 'change', view.render);
            loadModule.Whole.prototype.initialize.apply(_self, param); // 调用父类初始化
            // 接口外围自定义初始化
            if (_.isFunction(wholeModelConf.initialize)) {
              wholeModelConf.initialize.apply(_self, param);
            }
            // 提取到父类做
            for (var p in blockMap) {
              blockMap[p]['model'].trigger('block:modelinit', blockMap[p]['view']);
            }
          });
        }
      });

      var whm = new wholeModel(wholeModelConf);

      var whv = new wholeView(wholeViewConf);

      whv.trigger('whole:viewinit', whm);

      whm.trigger('whole:modelinit', whv);

      // TODO: return result.
      return {
        //blockModelMap: blockModelMap,
        //blockViewMap: blockViewMap
      };
    }
  };

  module.exports = loadModule;
