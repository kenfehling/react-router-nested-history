import React, {Component, PropTypes} from 'react'
import matchPath from 'react-router/matchPath'
import AnimatedPage from './AnimatedPage'

const computeMatch = (pathname, { computedMatch, path, exact, strict }) =>
computedMatch || matchPath(pathname, path, { exact, strict })

class InnerHistoryRoute extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.pathname !== nextProps.pathname
  }

  render() {
    const {pathname, children, component, render} = this.props
    const match = computeMatch(pathname, this.props)
    const props = {match, location: {pathname}}
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
}

const HistoryRoute = ({component, ...props}, {pathname}) => (
  <InnerHistoryRoute {...props} pathname={pathname} children={routeProps => (
    <AnimatedPage {...routeProps}>
      {routeProps.match ?
        React.createElement(component || props.children, routeProps) : null}
    </AnimatedPage>
  )} />
)

HistoryRoute.contextTypes = {
  pathname: PropTypes.string.isRequired
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