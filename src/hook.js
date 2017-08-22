import indicative from 'indicative';
import feathersErrors from 'feathers-errors';

export default function(options){

  return (hook) => {
    let data = {};
    if (hook.data) {
      data = Object.assign(data, hook.data);
    }

    if (options.useQuery && hook.params.query) {
      data = Object.assign(data, hook.params.query);
    }

    return new Promise(function(resolve, reject) {
      indicative.validate(data, options.rules, options.messages)
        .then(()=> { resolve(hook); })
        .catch((errors) => { reject( new feathersErrors.BadRequest('Invalid data', { errors })); });
    });
  };

}