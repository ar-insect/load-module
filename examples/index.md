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
          asocial: {
          }
        }
      }
    }
  });



````
