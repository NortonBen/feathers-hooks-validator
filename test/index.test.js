
import chai from 'chai';

import feathers from 'feathers';
import hooks from 'feathers-hooks';

import validator from '../src';
import { baseMixin, configure } from '../src/validator';

chai.should();

describe('feathers-hooks', () => {
  it('run configure', () => {
    configure().should.to.be.ok;
  });

  it('run baseMixin', () => {
    const mixin = baseMixin();
    mixin.validator({}).should.to.be.ok;
  });

  it('run baseMixin 2', () => {
    const mixin = baseMixin({});
    mixin.validator([
      {
        s:3
      }
    ]).should.to.be.ok;
  });


  it('always turns service call into a promise (#28)', () => {
    const app = feathers().configure(hooks()).configure(validator()).use('/dummy', {
      create (data) {
        return Promise.resolve(data);
      }
    });

    const service = app.service('dummy');

    service.create({ a: 3 }).then(data => {
      data.should.have.property('a');
      data.a.should.be.eql(3);
    });
  });

  it('register validator', () => {
    const app = feathers().configure(hooks()).configure(validator()).use('/dummy', {
      create (data) {
        return Promise.resolve(data);
      }
    });

    const service = app.service('dummy');
    service.validator([
      {
        methods: ['create'],
        rules: {
          a: 'required'
        }
      }
    ]);

  });

});