var loadModule = {};

loadModule.version = '1.0.0';

loadModule.Collection = require('./collection');

loadModule.Whole = require('./whole');

loadModule.WholeView = require('./wholeView');

loadModule.BlockView = require('./blockView');

loadModule.Block = require('./block');

module.exports = loadModule;