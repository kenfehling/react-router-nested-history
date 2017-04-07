import * as React from 'react'
import {Component, PropTypes, ReactNode} from 'react'
import matchPath from 'react-router/matchPath'
import AnimatedPage from './AnimatedPage'

const computeMatch:(...args:any[])=>any = (pathname, options) => {
    const { computedMatch, path, exact, strict } = options
    return computedMatch || matchPath(pathname, {path, exact, strict})
  }

const r = ({component, children, render, match, props}) => {
  return (
    component ? ( // component prop gets first priority, only called if there's a match
        match ? React.createElement(component, props) : null
      ) : render ? ( // render prop is next, only called if there's a match
          match ? render(props) : null
        ) : children ? ( // children come last, always called
            typeof children === 'function' ? (
                children(props)
              ) : !Array.isArray(children) || children.length ? ( // Preact defaults to empty children array
                  React.Children.only(children)
                ) : (
                  null
                )
          ) : (
            null
          )
  )
}

interface InnerHistoryRouteProps {
  pathname: string,
  children?: ReactNode,
  component?: Component<any, any>,
  render: Function
}

class InnerHistoryRoute extends Component<InnerHistoryRouteProps, undefined> {

  shouldComponentUpdate(nextProps) {
    return this.props.pathname !== nextProps.pathname
  }

  render() {
    const {pathname, children, component, render} = this.props
    const match = computeMatch(pathname, this.props)
    const props = {match, location: {pathname}}
    return r({component, children, render, match, props})
  }
}

const HistoryRoute:any = ({component, children, render, ...props}:any, {pathname}) => (
  <InnerHistoryRoute {...props} pathname={pathname} children={p => (
    <AnimatedPage {...p}>
      {p.match && r({component, children, render, match: p.match, props: p})}
    </AnimatedPage>
  )} />
)

HistoryRoute.contextTypes = {
  pathname: PropTypes.string
}

HistoryRoute.propTypes = {
  computedMatch: PropTypes.object, // private, from <Switch>
  path: PropTypes.string,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  component: PropTypes.func,
  render: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ])
}

export default HistoryRoute