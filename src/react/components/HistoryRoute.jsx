import React, {Component, PropTypes} from 'react'
import matchPath from 'react-router/matchPath'
import AnimatedPage from './AnimatedPage'

const computeMatch = (location, { computedMatch, path, exact, strict }) =>
computedMatch || matchPath(location.pathname, path, { exact, strict })

/**
 * The public API for matching a single path and rendering.
 */
export default class HistoryRoute extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
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
    const location = this.context.location

    if (parentRouter) {
      this.router = {
        ...parentRouter,
        match: computeMatch(location, this.props)
      }

      // Start listening here so we can <Redirect> on the initial render.
      this.unlisten = parentRouter.listen(() => {
        Object.assign(this.router, parentRouter, {
          match: computeMatch(location, this.props)
        })

        this.forceUpdate()
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const location = this.context.location
    Object.assign(this.router, {
      match: computeMatch(location, nextProps)
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    const { children, component, render } = this.props
    const props = { ...this.router }

    return (
      <AnimatedPage>
        {component ? ( // component prop gets first priority, only called if there's a match
          props.match ? React.createElement(component, props) : null
        ) : render ? ( // render prop is next, only called if there's a match
            props.match ? render(props) : null
          ) : children ? ( // children come last, always called
              typeof children === 'function' ? (
                  children(props)
                ) : !Array.isArray(children) || children.length ? ( // Preact defaults to empty children array
                    React.Children.only(children)
                  ) : (
                    <div></div>
                  )
            ) : (
                <div></div>
            )}
      </AnimatedPage>
    )
  }
}