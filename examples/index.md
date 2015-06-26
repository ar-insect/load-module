# Demo

---

## Normal usage

````javascript

var loadModule = require('load-module');

loadModule.build({
    whole: {
      model: {
        cid: 'wrap',
        asocial: {
        }
      },
      view: {
        el: $('#J_wrap'),
        asocial: {
        }
      }
    },
    block: {
      shopname: {
        model: {
          cid: 'shopname',
          asocial: {
            param: {},
            url: '/data/formSearch/test.json'
          }
        },
        view: {
          el: $('#J_shopname'),
          //className: 'aaa', 自定义classname
          asocial:{
            init: function() {
            },
            template: $('#tpl').html() // 自定义模板
          }
        }
      },
      city: {
        model: {
          cid: 'city',
          asocial: {
            url: '/casus/load.html'
          }
        },
        view: {
          el: $('#J_city'),
          asocial: {
          }
        }
      }
    }
  });



````
