import React, {Component, PropTypes} from 'react'
import matchPath from 'react-router/matchPath'
import AnimatedPage from './AnimatedPage'

const computeMatch = (pathname, { computedMatch, path, exact, strict }) =>
computedMatch || matchPath(pathname, path, { exact, strict })

/**
 * The public API for matching a single path and rendering.
 */
class HistoryRoute extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired
  }

  static propTypes = {
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

  static childContextTypes = {
    router: PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      router: this.router
    }
  }

  componentWillMount() {
    const parentRouter = this.context.router
    const pathname = this.context.pathname

    if (parentRouter) {
      this.router = {
        ...parentRouter,
        match: computeMatch(pathname, this.props)
      }

      // Start listening here so we can <Redirect> on the initial render.
      this.unlisten = parentRouter.listen(() => {
        Object.assign(this.router, parentRouter, {
          match: computeMatch(pathname, this.props)
        })

        this.forceUpdate()
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const pathname = this.context.pathname
    Object.assign(this.router, {
      match: computeMatch(pathname, nextProps)
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    const { children, component, render} = this.props
    const props = { ...this.router }

    return (
      component ? ( // component prop gets first priority, only called if there's a match
          props.match ? React.createElement(component, props) : null
        ) : render ? ( // render prop is next, only called if there's a match
            props.match ? render(props) : null
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

export default ({component, ...props}) => (
  <HistoryRoute {...props} children={routeProps => (
    <AnimatedPage {...routeProps}>
      {routeProps.match ?
        React.createElement(component || props.children, routeProps) : null}
    </AnimatedPage>
  )} />
)