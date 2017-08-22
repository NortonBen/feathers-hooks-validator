import hook from '../src/hook';
import chai from 'chai';
import feathersErrors from 'feathers-errors';

chai.should();

const option1 = {
  rules: {
    a: 'required',
  }
};

const option2 = {
  rules: {
    ad: 'required',
  }
};



const option3 = {
  rules: {
    c: 'required',
  },
  useQuery: true,
};

const hooks1= {
  params: {
    query: { c: 'data' },
  },
};

const hooks= {
  data: { a: 3, b : 'hai' },
  params: {
    query: { c: 'data' },
  },
};

describe('validator-hooks', () => {
  it('validator hooks true', (done) => {
    const _hook = hook(option1);
    const __hook = _hook();
    __hook(hooks).then((rs) => {
      rs.should.be.eql(hooks);
      done();
    }).catch(e => {
      throw e;
    });
  });

  it('validator hooks fail', (done) => {
    const _hook = hook(option2)();
    _hook(hooks)
      .then(() => { throw 'errors '; })
      .catch(()=> {
        done();
      });
  });

  it('validator hooks 2 true', (done) => {
    const _hook = hook(option3)();
    _hook(hooks).then((rs) => {
      rs.should.be.eql(hooks);
      done();
    }).catch(e => {
      throw e;
    });
  });


  it('validator hooks 3 true', (done) => {
    const _hook = hook(option3)();
    _hook(hooks1).then((rs) => {
      rs.should.be.eql(hooks1);
      done();
    }).catch(e => {
      throw e;
    });
  });
});