var loadModule = {};

loadModule.version = '1.0.0';

loadModule.Collection = require('./collection');

loadModule.Whole = require('./whole');

loadModule.WholeView = require('./whole-view');

loadModule.BlockView = require('./block-view');

loadModule.Block = require('./block');

module.exports = loadModule;