import React, { Component } from 'react';
import { HistoryMatch, Container, createGroup } from '../../../../dist/tab-history-library';
import './Windows.css';

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
    const {containers} = this.props;
    containers.addChangeListener(state => {
      this.setZIndex(state.indexedStackOrder);
    });
    this.setZIndex(containers.getIndexedStackOrder());
  }

  render() {
    const {className, index, children, containers} = this.props;
    return (<Container>
      <div className={`window ${className}`} onClick={() => containers.switchTo(index)}
           style={{zIndex: this.state.zIndex}}>
        {children}
      </div>
    </Container>);
  }
}

export const Window1 = props => <Window className="window1" index={0} {...props} />;
export const Window2 = props => <Window className="window2" index={1} {...props} />;

const Windows = () => (
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

export default createGroup(Windows);