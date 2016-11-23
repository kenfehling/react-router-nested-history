import { listen } from './historyListener';

listen(location => console.log(location));

export { setTabs, push } from './main';