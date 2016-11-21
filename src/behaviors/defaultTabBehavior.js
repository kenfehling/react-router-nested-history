/**
 * Switch tab using mobile-app like behavior (with a default tab: index == 0)
 * Structure of a history object:
 *    { back: [Object], current: Object, forward: [Object] }
 * @param {Object} historyState - Current historyState object
 * @param {Number} tab - The index of the new tab
 * @returns {Object} A new historyState object
 */
export function switchToTab({historyState, tab}) {
  const {tabHistories} = historyState;
  const defaultTab = tabHistories[0];
  const toTab = tabHistories[tab];
  const createNewHistoryState = (back) => ({
      ...historyState,
      browserHistory: {
        back,
        current: {url: toTab.current, tab},
        forward: toTab.forward.map(url => ({url, tab}))
      },
  });
  if (tab === 0) {  // going to default tab
    return createNewHistoryState([...toTab.back.map(url => ({url, tab}))]);
  }
  else {  // going to non-default tab
    return createNewHistoryState([
      ...defaultTab.back.map(url => ({url, tab: 0})),
      {url: defaultTab.current, tab: 0},
      ...toTab.back.map(url => ({url, tab}))
    ]);
  }
}