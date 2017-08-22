# Feathers hooks validator

> This repo modules for the feathersjs framework

## Quick start

`feathers-hooks-validator` allows to register hooks  in before when a hook's executes validator.  This makes it easy to check rule data processing and error handling from your service logic.

To install from [npm](https://www.npmjs.com/package/feathers-hooks-validator), run:

```bash
$ npm i feathers-hooks-validator --save
```

Then, to use the plugin in your Feathers app:

```javascript
const feathers = require('feathers');
const hooks = require('feathers-hooks');
const validator = require('feathers-hooks-validator');

const app = feathers();
app.configure(hooks());
// Set up after set up hooks
app.configure(validator());
```

Then, you can register a hook for a service:

```javascript
// User service
const service = require('feathers-memory');

module.exports = function(){
  const app = this;

  let myHook = function(options) {
    return 
  }

  // Initialize our service
  app.use('/users', service());

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/users');

  // Set up our before hook
  userService.validator(
    [
      {
        methods: ['create','update'],
        rules: {
          username: 'required|max:20',
          password: 'required|max:20'
        }
      }
    ]
  );
}
```

## Documentation

User package [`indicative`](https://github.com/poppinss/indicative) validator data

### Structure validator

```javascript
    [
      {
        methods: ['create','update'],
        useQuery: true,
        rules: {
          username: 'required|max:20',
          password: 'required|max:20'
        },
        messages: {
           required: '{{field}} is required to complete registeration process'
        }
      },
      ...
    ]
```
- `methods`: the methods using with check rule
- `useQuery`: user query in `url` when check rule
- `rules`: rule was defined in package [`indicative`](https://github.com/poppinss/indicative)
- `messages`: custom message instead of a self-constructed message in package [`indicative`](https://github.com/poppinss/indicative)

### Message Error Response

```
{
    "name": "BadRequest",
    "message": "Invalid data",
    "code": 400,
    "className": "bad-request",
    "data": {},
    "errors": [
        {
            "field": "password",
            "validation": "required",
            "message": "required validation failed on message"
        }
    ]
}
```

