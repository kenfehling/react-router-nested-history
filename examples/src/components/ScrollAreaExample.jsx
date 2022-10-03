import React, {Component} from 'react'
import {Tab as ReactTab, Tabs as ReactTabs, TabList, TabPanel} from 'react-tabs'
import {
  Container, ContainerGroup, HistoryRoute, ScrollArea
} from 'react-router-nested-history'
import './ScrollAreaExample.css'
import Head from './Head'

const ScrollArea1 = () => (
  <div>
    <div className='tab-title'>Tab 1</div>
    <p>
      This is scroll tab #1.
    </p>
    <p>
      When you switch to another tab it will remember
      the position of this tab's scroll.
    </p>
    <p>
      You could also make it forget the scroll when leaving the container
      by using the `resetOnLeave` boolean prop, but in this case it's not set.
    </p>
    <p>
      When you switch to another tab it will remember
      the position of this tab's scroll.
    </p>
    <p>
      You could also make it forget the scroll when leaving the container
      by using the `resetOnLeave` boolean prop, but in this case it's not set.
    </p>
    <Head title='Scroll 1' />
  </div>
)

const ScrollArea2 = () => (
  <div>
    <div className='tab-title'>Tab 2</div>
    <p>
      This is scroll tab #2.
    </p>
    <p>
      When you switch to another tab it will remember
      the position of this tab's scroll.
    </p>
    <Head title='Scroll 2' />
  </div>
)

const ScrollArea3 = () => (
  <div>
    <div className='tab-title'>Tab 3</div>
    <p>
      This is scroll tab #3.
    </p>
    <p>
      When you switch to another tab it will remember
      the position of this tab's scroll.
    </p>
    <Head title='Scroll 3' />
  </div>
)

const Scroll = ({number, children}) => {
  const path = `/scroll/${number}`
  return (
    <Container name={`scroll${number}`} initialUrl={path} patterns={[path]}>
      <HistoryRoute exact path={path}>
        {() => (
          <ScrollArea vertical={true}>
            {children}
          </ScrollArea>
        )}
      </HistoryRoute>
    </Container>
  )
}

const Scroll1 = () => <Scroll number={1}><ScrollArea1 /></Scroll>
const Scroll2 = () => <Scroll number={2}><ScrollArea2 /></Scroll>
const Scroll3 = () => <Scroll number={3}><ScrollArea3 /></Scroll>

export default class ScrollAreaExample extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTabIndex: 0
    }
  }

  onContainerActivate({currentContainerIndex}) {
    this.setState({activeTabIndex: currentContainerIndex})
  }

  render() {
    return (<div>
      <h2>ScrollArea example</h2>
      <div className="description">
        <p>Each tab remembers its own scroll position.</p>
      </div>
      <ContainerGroup name='scroll'
                      currentContainerIndex={this.state.activeTabIndex}
                      onContainerActivate={this.onContainerActivate.bind(this)}
                      gotoTopOnSelectActive={true}
      >
        <ReactTabs onSelect={activeTabIndex => this.setState({activeTabIndex})}
                   selectedIndex={this.state.activeTabIndex}>
          <TabList>
            <ReactTab>One</ReactTab>
            <ReactTab>Two</ReactTab>
            <ReactTab>Three</ReactTab>
          </TabList>
          <TabPanel><div className="tab-content"><Scroll1 /></div></TabPanel>
          <TabPanel><div className="tab-content"><Scroll2 /></div></TabPanel>
          <TabPanel><div className="tab-content"><Scroll3 /></div></TabPanel>
        </ReactTabs>
      </ContainerGroup>
    </div>)
  }
}