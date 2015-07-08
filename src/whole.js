var _ = require('lodash');
var Backbone = require('backbone');

var Whole = Backbone.Model.extend({
  initialize: function () {
    // console.log(this.coll);
  },
  setData: function () {
    var model = arguments[0];
    var data = arguments[1];
    var cid = model.cid;
    var the = this.collection.get(cid);
    if (cid === the.cid) {
      the.set('data', data);
      this.set(cid, the.get('node'));
    }
  }
});

module.exports = Whole;
