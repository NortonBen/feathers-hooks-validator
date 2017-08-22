import indicative from 'indicative';
import feathersErrors from 'feathers-errors';

export default function(options){

  return async (hook) => {
    let data = {};
    if (hook.data) {
      data = Object.assign(data, hook.data);
    }

    if (options.useQuery && hook.params.query) {
      data = Object.assign(data, hook.params.query);
    }

    try {
      await indicative.validate(data, options.rules, options.messages);
    } catch(errors){
      throw new feathersErrors.BadRequest('Invalid data', { errors });
    }
    return hook;
  };

}