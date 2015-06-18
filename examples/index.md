# Demo

---

## Normal usage

````javascript
var loadModule = require('load-module');

loadModule.build({
    whole: {
      model: {
        cid: 'wrap'
      },
      view: {
        
      }
    },
    block: {
      shopname: {
        model: {
          cid: 'shopname',
          defaults: {
            "appetizer":  "caesar salad",
            "entree":     "ravioli",
            "dessert":    "cheesecake"
          },
          param: {},
          url: '/data/formSearch/test.json'
        },
        view: {
          initialize: function() {
          },
          asocial: {
            template: 'hello <%= user %>!'
          }
        }
      },
      city: {
        model: {
          cid: 'city'
        },
        view: {
          asocial: {
            template: 'hello <%= user %>!'
          }
        }
      }
    }
  });



````
