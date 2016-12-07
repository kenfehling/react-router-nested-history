import React, { Component } from 'react';
import { addChangeListener } from '../../../../dist/tab-history-library';
import TreeView from 'react-treeview';
import './StateTree.css';

const HistoryTree = ({history, className}) => (
  <TreeView nodeLabel={'History'}>
    {history.back.map((page, i) =>
        <div key={i}>
          <TreeView
              key={i}
              nodeLabel={page.url}>

          </TreeView>
        </div>)}
    <div><span className={`${className} current-page`}>{history.current.url}</span></div>
    {history.forward.map((page, i) =>
        <div key={i}>
          <TreeView
              key={i}
              nodeLabel={page.url}>

          </TreeView>
        </div>)}
  </TreeView>
);

const StateTree = ({state}) => (
  <div className="history-tree">
      {state.groups ? state.groups.map(group =>
          <div key={group.index}>
            <TreeView key={group.index} nodeLabel={'Group ' + group.index}>
              <HistoryTree history={group.history} className="group" />
              {group.containers.map(container =>
                <div key={container.index}>
                  <TreeView
                    key={container.index}
                    nodeLabel={'Container ' + container.index}>
                    <HistoryTree history={container.history} className="container" />
                    </TreeView>
                </div>
              )}
            </TreeView>
          </div>) : ''}
  </div>
);

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    addChangeListener(state => this.setState(state));
  }

  render() {
    return <StateTree state={this.state} />;
  }
}