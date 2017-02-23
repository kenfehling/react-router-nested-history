import React, {Component} from 'react'
import {addChangeListener, isGroupActive} from 'react-router-nested-history'
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

const GroupTree = ({group}) => (
  <div>
    <div>{'Group: ' + group.name}</div>
    <HistoryTree history={group.history}
                 className={isGroupActive(group.name) ? 'active group' : 'group'} />
    <div>
      {group.containers.map(container =>
        <div key={group.name + ' ' + container.name}>
          {container.isGroup ? <GroupTree group={container} /> : (
            <div>
              <div>{'Container: ' + container.name}</div>
              <HistoryTree history={container.history} className={`container`} />
            </div>
          )}
        </div>
      )}
    </div>
  </div>
)

const StateTree = ({groups, activeGroup}) => (
  <div className="state-tree">
    {groups.map(group => (
      <GroupTree key={group.name}
                 group={group}
                 activeGroup={activeGroup}
      />
    ))}
  </div>
)

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: []
    }
  }

  componentWillMount() {
    this.unlisten = addChangeListener(({state:{groups}}) => {
      this.setState({
        groups
      })
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    return <StateTree {...this.state} />
  }
}