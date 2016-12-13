import React, { Component } from 'react'
import { addChangeListener } from '../../../../dist/tab-history-library'
import './StateTree.css'

const HistoryTree = ({history, className}) => (
  <div>
    <div>
      {history.back.map((page, i) => <div key={i}>{page.url}</div>)}
    </div>
    <div>
      <span className={`${className} current-page`}>{history.current.url}</span>
    </div>
    <div>
      {history.forward.map((page, i) => <div key={i}>{page.url}</div>)}
    </div>
  </div>
)

const StateTree = ({state}) => (
  <div className="history-tree">
      {state.groups ? state.groups.map(group =>
          <div key={group.index}>
            <div>{'Group ' + group.index}</div>
              <HistoryTree history={group.history} className="group" />
              <div>
                {group.containers.map(container =>
                  <div key={container.index}>
                    <div>{'Container ' + container.index}</div>
                    <HistoryTree history={container.history} className="container" />
                  </div>
                )}
              </div>
          </div>) : ''}
  </div>
)

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    addChangeListener(state => this.setState(state))
  }

  render() {
    return <StateTree state={this.state} />
  }
}