import React, {Component} from 'react'
import {connectToStore} from 'react-router-nested-history'
import './StateTree.css'

const HistoryTree = ({history, className}) => (
  history ?
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
  : ''
)

const GroupTree = ({group, activeGroupName}) => (
  <div>
    <div>{'Group: ' + group.name}</div>
    <HistoryTree history={group.history}
                 className={activeGroupName === group.name ?
                    'active group' : 'group'} />
    <div>
      {group.containers.map(container =>
        <div key={group.name + ' ' + container.name}>
          {container.isGroup ?
            <GroupTree group={container} activeGroupName={activeGroupName} />
            : (
              <div>
                <div>{'Container: ' + container.name}</div>
                <HistoryTree history={container.history} className={`container`} />
              </div>
            )
          }
        </div>
      )}
    </div>
  </div>
)

const DumbStateTree = ({groups, activeGroupName}) => (
  <div className="state-tree">
    {groups.map(group => (
      <GroupTree key={group.name}
                 group={group}
                 activeGroupName={activeGroupName}
      />
    ))}
  </div>
)

const StateTree = (state) => (
  <DumbStateTree groups={state.groups} activeGroupName={state.activeGroupName} />
)

export default connectToStore(StateTree)