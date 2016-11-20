import * as _ from "lodash";

/**
 * Switch tab using mobile-app like behavior (with a default tab: index == 0)
 * Structure of a history object:
 *    { back: [String], current: String, forward: [String] }
 * @param {Object} browserHistory - The actual current history of the browser
 * @param {Array} tabHistories - The stored histories of each individual tab
 * @param {Number} fromIndex - The index of the old tab
 * @param {Number} toIndex - The index of the new tab
 * @returns {Object} A new history object
 */
export function switchTab({browserHistory, tabHistories, fromIndex, toIndex}) {
  const fromTab = tabHistories[fromIndex];
  const toTab = tabHistories[toIndex];
  function getBase() {  // get previous history from before the tabs
    const b = browserHistory.back;
    const less = !toIndex * 2;  // take 2 fewer items if going to default tab
    return _.take(b, b.length - fromTab.back.length - less);
  }
  if (fromIndex === 0) {  // coming from default tab
    return {
      ...toTab,
      back: [...getBase(), ...fromTab.back, fromTab.current, ...toTab.back]
    };
  }
  else {  // coming from a non-default tab
    return {
      ...toTab,
      back: [...getBase(), ...toTab.back]
    };
  }
}