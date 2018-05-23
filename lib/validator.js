'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseMixin = baseMixin;
exports.configure = configure;

var _hook2 = require('./hook');

var _hook3 = _interopRequireDefault(_hook2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');

function baseMixin(service) {
  var mixin = {
    validator: function validator(validators) {
      var hooks = { before: {}, after: {} };
      if (!_.isArray(validators)) {
        return this;
      }
      validators.forEach(function (validator) {
        if (!_.has(validator, 'methods') || !_.has(validator, 'rules')) {
          return;
        }
        validator.methods.forEach(function (method) {
          var _hook = hooks.before[method] || (hooks.before[method] = []);
          _hook.push((0, _hook3.default)(validator));
        });
      });
      if (typeof service.hooks === 'function') {
        service.hooks(hooks);
      }
      return this;
    }
  };

  return mixin;
}

function hookMixin(service) {

  var mixin = baseMixin(service);

  service.mixin(mixin);
}

function configure() {
  return function () {
    this.mixins.unshift(hookMixin);
  };
}
exports.validator = configure;
exports.default = configure;