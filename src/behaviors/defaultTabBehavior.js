/**
 * Switch tab using mobile-app like behavior (with a default tab: index == 0)
 * Structure of a history object:
 *    { back: [String], current: String, forward: [String] }
 * @param {Array} tabHistories - The stored histories of each individual tab
 * @param {Number} tab - The index of the new tab
 * @returns {Object} A new historyState object
 */
export function switchToTab({historyState: {tabHistories}, tab}) {
  const defaultTab = tabHistories[0];
  const toTab = tabHistories[tab];
  const createNewHistoryState = (browserHistory) => ({
    tabHistories,
    browserHistory
  });
  if (tab === 0) {  // going to default tab
    return createNewHistoryState({
      ...toTab,
      back: [...toTab.back]
    });
  }
  else {  // going to non-default tab
    return createNewHistoryState({
      ...toTab,
      back: [...defaultTab.back, defaultTab.current, ...toTab.back]
    });
  }
}