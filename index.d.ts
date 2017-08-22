import * as feathers from 'feathers';

declare module 'feathers' {
  interface Service<T> {
    vadidator(vadidators: vadidator.VadidatorsObject): Application;
  }
}

declare function vadidator(): () => void;

declare namespace vadidator {

  interface VadidatorsObject {
    methods?: Array<string>;
    useQuery: boolean;
    rules: string|Object
    messages: Object
  }
}

export = vadidator;
