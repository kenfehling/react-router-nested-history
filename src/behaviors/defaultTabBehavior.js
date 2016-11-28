/**
 * Switch tab using mobile-app like behavior (with a default tab: index == 0)
 * Structure of a history object:
 *    { back: [String], current: String, forward: [String] }
 * @param {Array} tabHistories - The stored histories of each individual tab
 * @param {Object} tab - The index of the new tab
 * @returns {Object} A new historyState object
 */
export function switchToTab({historyState: {tabHistories}, tab: {index}}) {
  const defaultTab = tabHistories[0];
  const toTab = tabHistories[index];
  const createNewHistoryState = (browserHistory) => ({
    tabHistories,
    browserHistory
  });
  if (index === 0) {  // going to default tab
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