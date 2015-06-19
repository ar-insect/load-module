var _ = require('lodash');
var loadModule = require('./namespace');

loadModule.build = function (config) {
  if (_.isPlainObject(config)) {
    // whole配置
    var wholeConf = config.whole;
    var wholeViewConf = wholeConf.view;
    var wholeModelConf = wholeConf.model;
    // blocl配置
    var blockName;
    var blockModels = [];
    var blockMap = {};
    var blockConf = config.block;
    var blockViewConf, blockModelConf;
    // block模型
    var blockModel = loadModule.Block.extend({
      initialize: function () {
        var _self = this;
        var param = arguments;
        _self.on('block:modelinit', function (view) {
          // view监听model的change事件
          // model属性一旦发生变化则自动触发view.render
          view.listenTo(_self, 'change', view.render);
          // 调用父类初始化
          loadModule.Block.prototype.initialize.apply(_self, param);
          /*
           if (_.isFunction(param[0]['initialize'])) {
           param[0]['initialize'].apply(_self, param);
           }
           */
        });
      }
    });
    // block视图
    var blockView = loadModule.BlockView.extend({
      initialize: function () {
        var _self = this;
        var param = arguments;
        // 监听初始化，当在何时进行初始化只需要trigger('block:viewinit')
        _self.on('block:viewinit', function () {
          // 注意：这里model不需要显示地传入进来，因为在实例化blockview已经将model传进来并由backbone挂载在实例的model属性
          // 所以，这里直接在构造函数的参数里面去拿model
          var model = param[0].model;
          // model监听view的launch事件，一旦触发则调用model.launch()
          model.listenTo(_self, 'data:launch', model.launch);
          // 出于安全性view只会pick出backbone指定的属性，其它属性是没有机会被扩展到实例上去
          // 直接将自定义属性挂载到view的实例上去
          // 为了区分私有属性统一放在asocial对象里面
          // 注意：私有的属性不能是 'model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'
          _.isPlainObject(param[0]) && _.extend(_self, param[0]);
          // 调用父类初始化
          loadModule.BlockView.prototype.initialize.apply(_self, param);
          /*
           if (_.isFunction(param[0]['initialize'])) {
           param[0]['initialize'].apply(_self, param);
           }
           */
        });
      }
    });

    for (blockName in blockConf) {
      blockMap[blockName] = {};
      // blockView 配置
      blockViewConf = blockConf[blockName]['view'];
      // blockModel 配置
      blockModelConf = blockConf[blockName]['model'];
      // 对blockModel配置属性
      // 这些属性都是backbone定义的属性，在new构造时候会合并
      blockModel.extend(_.omit(blockModelConf, 'asocial'));
      // 对blockView配置属性
      // 这些属性都是backbone定义的属性，在new构造时候会合并
      blockView.extend(_.omit(blockViewConf, 'asocial'));

      blockModels.push(
          // 这里只传私有属性，可以通过get来获取
          blockMap[blockName]['model'] = new blockModel(_.pick(blockModelConf, 'asocial')['asocial'])
      );

      blockMap[blockName]['view'] = new blockView(
          // 这里只传私有属性
          _.assign({model: blockMap[blockName]['model']}, _.pick(blockViewConf, 'asocial')['asocial'])
      );
    }
    // 集合
    var collection = new loadModule.Collection(blockModels, {
      model: loadModule.Block
    });
    // whole视图
    var wholeView = loadModule.WholeView.extend({
      initialize: function () {
        var _self = this;
        var param = arguments;
        // 监听初始化，当在何时进行初始化只需要trigger('whole:viewinit')
        _self.on('whole:viewinit', function () {
          // 注意：这里model不需要显示地传入进来，因为在实例化blockview已经将model传进来并由backbone挂载在实例的model属性
          // 所以，这里直接在构造函数的参数里面去拿model
          var model = param[0].model;
          // 出于安全性view只会pick出backbone指定的属性，其它属性是没有机会被扩展到实例上去
          // 直接将自定义属性挂载到view的实例上去
          // 为了区分私有属性统一放在asocial对象里面
          // 注意：私有的属性不能是 'model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'
          _.isPlainObject(param[0]) && _.extend(_self, param[0]);
          // 调用父类初始化
          loadModule.WholeView.prototype.initialize.apply(_self, param);
          /*
           if (_.isFunction(wholeViewConf.initialize)) {
           wholeViewConf.initialize.apply(_self, param);
           }*/
          for (var p in blockMap) {
            // 通过代理将view持有getWidget方法
            blockMap[p]['view']['getWidget'] = function (name) {
              return _self.getWidget(name);
            };
            // 通知blockview初始化
            blockMap[p]['view'].trigger('block:viewinit');
          }
        });
      }
    });
    // whole模型
    var wholeModel = loadModule.Whole.extend({
      collection: collection,
      initialize: function () {
        var _self = this;
        var param = arguments;
        _self.on('whole:modelinit', function (view) {
          // view监听model的change事件
          // model属性一旦发生变化则自动触发view.render
          view.listenTo(_self, 'change', view.render);
          // 调用父类初始化
          loadModule.Whole.prototype.initialize.apply(_self, param);
          /*
           if (_.isFunction(wholeModelConf.initialize)) {
           wholeModelConf.initialize.apply(_self, param);
           }
           */
          for (var p in blockMap) {
            // 通知blockmodel初始化
            blockMap[p]['model'].trigger('block:modelinit', blockMap[p]['view']);
          }
        });
      }
    });
    // 扩展backbone应有的属性（除了私有属性之外）
    wholeView.extend(_.omit(wholeViewConf, 'asocial'));
    // 扩展backbone应有的属性（除了私有属性之外）
    wholeModel.extend(_.omit(wholeModelConf, 'asocial'));

    var wholemodel = new wholeModel(_.pick(wholeModelConf, 'asocial')['asocial']);

    var wholeview = new wholeView(_.pick(wholeViewConf, 'asocial')['asocial']);
    // 调用wholeview初始化
    wholeview.trigger('whole:viewinit');
    // 调用wholemodel初始化
    wholemodel.trigger('whole:modelinit', wholeview);

    // TODO: return result.
    return {
      //blockModelMap: blockModelMap,
      //blockViewMap: blockViewMap
    };
  }
};

module.exports = loadModule;
