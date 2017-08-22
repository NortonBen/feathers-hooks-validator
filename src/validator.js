import hook from './hook';
const _ = require('lodash');

export function baseMixin (service) {
  const mixin = {
    validator (validators) {
      const hooks = { before: {}, after: {} };
      if(!_.isArray(validators)) {
        return this;
      }
      validators.forEach((validator) => {
        if(!_.has(validator, 'methods') || !_.has(validator, 'rules')) {
          return;
        }
        validator.methods.forEach( (method) => {
          const _hook = hooks.before[method] || (hooks.before[method] = []);
          _hook.push(hook(validator));
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


function hookMixin (service) {

  const mixin = baseMixin(service);

  service.mixin(mixin);
}

export function configure () {
  return function () {
    this.mixins.unshift(hookMixin);
  };
}
exports.validator = configure;
export default configure;