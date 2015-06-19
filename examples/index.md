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
          myTicket: 'eisieist'
        }
      },
      view: {
        asocial: {
          viewde: 'viewdefdd'
        }
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
          asocial: {
            param: {},
            url: '/data/formSearch/test.json'
          }
        },
        view: {
          asocial:{
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
