import React from 'react';
import { setTabs, switchToTab, addChangeListener } from '../../../../dist/tab-history-library';
import './Windows.css';

const getStackOrder = () => getContainerStackOrder(path => path.startsWith('/windows'));

setTabs([
  {initialUrl: '/windows/1', urlPatterns: ['/windows/1', '/windows/1/*']},
  {initialUrl: '/windows/2', urlPatterns: ['/windows/2', '/windows/2/*']}
]);

const getZIndex = containerPath => {
  const order = getStackOrder();
  return order.length - order.indexOf(containerPath) + 1;
};

const Window = ({className, containerPath, index, children}) => (
  <div className={`window ${className}`} onClick={() => switchToTab(index)}
       style={{zIndex: getZIndex(containerPath)}}>
    {children}
  </div>
);

export const Window1 = props => <Window className="window1" index={0} {...props} />;
export const Window2 = props => <Window className="window2" index={1} {...props} />;

export default () => (
    <div className="windows">
      <h2>Windows example</h2>
      <div className="description">
        <p>Each window has its own individual history.</p>
        <p>Clicking on a window brings it to the front.</p>
      </div>
      <Window1 />
      <Window2 />
  </div>
);