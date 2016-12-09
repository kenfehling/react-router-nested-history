import React, { Component } from 'react';
import { setContainers, HistoryMatch } from '../../../../dist/tab-history-library';
import './Windows.css';

const tabs = setContainers([
  {initialUrl: '/windows/1', urlPatterns: ['/windows/1', '/windows/1/*']},
  {initialUrl: '/windows/2', urlPatterns: ['/windows/2', '/windows/2/*']}
]);

class Window extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1
    }
  }

  setZIndex(indexedStackOrder) {
    const {index} = this.props;
    this.setState({
      zIndex: indexedStackOrder.length - indexedStackOrder[index] + 1
    });
  }

  componentWillMount() {
    tabs.addChangeListener(state => {
      this.setZIndex(state.indexedStackOrder);
    });
    this.setZIndex(tabs.getIndexedStackOrder());
  }

  render() {
    const {className, index, children} = this.props;
    return (<div className={`window ${className}`} onClick={() => tabs.switchTo(index)}
         style={{zIndex: this.state.zIndex}}>
      {children}
    </div>);
  }
}

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