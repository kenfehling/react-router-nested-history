import createMemoryHistory from 'history/createMemoryHistory';
import { setHistory, listen, push, replace } from '../src/historyListener';

describe('history listener', () => {

  beforeEach(() => {
    setHistory(createMemoryHistory('/'));
  });

  it('listens for push', () => {
    return new Promise((resolve, reject) => {
      listen(loc => (loc.pathname === '/a' ? resolve : reject)(loc.pathname));
      push('/a');
    });
  });

  it('listens for replace', () => {
    return new Promise((resolve, reject) => {
      listen(loc => (loc.pathname === '/a' ? resolve : reject)(loc.pathname));
      replace('/a');
    });
  });

});