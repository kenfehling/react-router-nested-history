import React from 'react';
import { switchContainer, connectContainer, getContainerStackOrder } from '../../../dist/react-nav-thing';
import './Windows.css';

const getStackOrder = () => getContainerStackOrder(path => path.startsWith('/windows'));

const getZIndex = containerPath => {
  const order = getStackOrder();
  return order.length - order.indexOf(containerPath) + 1;
};

const Window = ({className, containerPath, children}) => (
  <div className={`window ${className}`} onClick={() => switchContainer({path: containerPath})}
       style={{zIndex: getZIndex(containerPath)}}>
    {children}
  </div>
);

export const Window1 = connectContainer(props => <Window className="window1" {...props} />);
export const Window2 = connectContainer(props => <Window className="window2" {...props} />);

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