'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {

  return function (hook) {
    var data = {};
    if (hook.data) {
      data = Object.assign(data, hook.data);
    }

    if (options.useQuery && hook.params.query) {
      data = Object.assign(data, hook.params.query);
    }

    return new Promise(function (resolve, reject) {
      // indicative.validate stops on first failure
      _indicative2.default.validateAll(data, options.rules, options.messages).then(function () {
        resolve(hook);
      }).catch(function (errors) {
        reject(new _errors2.default.BadRequest('Invalid data', { errors: errors }));
      });
    });
  };
};

var _indicative = require('indicative');

var _indicative2 = _interopRequireDefault(_indicative);

var _errors = require('@feathersjs/errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
// feathers-errors is deprecated