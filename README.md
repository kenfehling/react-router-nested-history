react-router-nested-history
---------------------------

A library to help build [React](https://facebook.github.io/react) apps
with nested tabs and other containers that have their own history, complete
with automatic altering of the browser's back and forward history to
make it behave as you would expect a mobile app like Facebook or
Twitter to behave.

### Live demo
[react-router-nested-history.herokuapp.com](https://react-router-nested-history.herokuapp.com)

### Installation
```
npm install --save kenfehling/react-router-nested-history
```

### react-router
This library is built to support
[react-router 4](https://github.com/ReactTraining/react-router/tree/v4). It's
been developed and tested against
[v4.0.0-alpha.6](https://github.com/ReactTraining/react-router/releases/tag/v4.0.0-alpha.6). When
version 4 is officially released the library will be updated for that API.

This library is very new and not battle-tested, although it does have
unit tests, end-to-end tests, [examples](https://react-router-nested-history.herokuapp.com),
and is used on my [personal webpage](http://kenfehling.com)). I
would **very much** appreciate any feedback as I continue to solidify it.

Right now this library only works with browserHistory (HTML5 History API, not with hash history)

### Roadmap
- [x] Nested container groups
- [x] End to end tests using [Nightwatch.js](http://nightwatchjs.org)
- [x] Support for title libraries like [react-helmet](https://github.com/nfl/react-helmet)
- [ ] Support for server rendering

## API

### HistoryRouter
Use this in place of react-router's `BrowserRouter` component to enable this library.

#### props (in addition to the existing `BrowserRouter` props)
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>required</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>zeroPage</td>
          <td>string</td>
          <td align="center"></td>
          <td>
            Specify the page at the beginning of the history stack.
            Default: initialPage of the first group's first container
          </td>
        </tr>
    </tbody>
</table>

### HistoryMatch
Use this in place of react-router's `Match` component to prevent a match's previous content from disappearing.

### HistoryLink
Use this in place of react-router's `Link` component to enable history tracking for a link.

### HeaderLink
Use this for a container's header link (typically a tab-like thing)

#### props
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>required</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>toContainer</td>
          <td>string</td>
          <td align="center">✓</td>
          <td>The name of the container this links to</td>
        </tr>
        <tr>
          <td>className</td>
          <td>string</td>
          <td align="center"></td>
          <td>The CSS class for styling this element</td>
        </tr>
        <tr>
          <td>activeClassName</td>
          <td>string</td>
          <td align="center"></td>
          <td>An alternate CSS class for styling the active item</td>
        </tr>
    </tbody>
</table>

### BackLink
Use this to place a back link (which only shows if there is back history)

#### props
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>required</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>nameFn</td>
          <td>({params}) =&gt; string</td>
          <td align="center"></td>
          <td>A function that takes URL params and returns name to show as back link text</td>
        </tr>
    </tbody>
</table>

### Container
Use this component to wrap one or more `HistoryMatch` components to enable history for a container (a nested tab or window).

#### props
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>required</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>name</td>
          <td>string</td>
          <td align="center">✓</td>
          <td>The name of this container (must be unique)</td>
        </tr>
        <tr>
          <td>initialUrl</td>
          <td>string</td>
          <td align="center">✓</td>
          <td>The path that the container starts on</td>
        </tr>
        <tr>
          <td>patterns</td>
          <td>string[]</td>
          <td align="center">✓</td>
          <td>A list of path patterns that will load in this container from a URL in the address bar</td>
        </tr>
        <tr>
          <td>className</td>
          <td>string</td>
          <td align="center"></td>
          <td>The CSS class for styling this element</td>
        </tr>
    </tbody>
</table>

### ContainerGroup
Wraps one or more `Container` components that act as a group (a group of tabs, etc.)

#### props
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>default</th>
        <th>required</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>name</td>
          <td>string</td>
          <td></td>
          <td align="center">✓</td>
          <td>The name of this group (must be unique)</td>
        </tr>
        <tr>
          <td>currentContainerIndex</td>
          <td>number</td>
          <td></td>
          <td align="center"></td>
          <td>Allows you to set the index of the active container</td>
        </tr>
        <tr>
          <td>onContainerActivate</td>
          <td>Function</td>
          <td></td>
          <td></td>
          <td>Runs when a new container is activated</td>
        </tr>
        <tr>
          <td>useDefaultContainer</td>
          <td>boolean</td>
          <td>true</td>
          <td></td>
          <td>Consider the first container in the group as the default</td>
        </tr>
        <tr>
          <td>gotoTopOnSelectActive</td>
          <td>boolean</td>
          <td>false</td>
          <td></td>
          <td>Go to the top of a tab if it's selected while already active</td>
        </tr>
        <tr>
          <td>hideInactiveContainers</td>
          <td>boolean</td>
          <td>true</td>
          <td></td>
          <td>Don't show the content of inactive containers</td>
        </tr>
        <tr>
          <td>resetOnLeave</td>
          <td>boolean</td>
          <td>false</td>
          <td></td>
          <td>Reset container's history when switching to another container</td>
        </tr>
        <tr>
          <td>children</td>
          <td>ReactNode or function</td>
          <td></td>
          <td></td>
          <td>The children of this ContainerGroup</td>
        </tr>
    </tbody>   
</table>

#### context
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>activePage</td>
          <td>{url:string, params:Object}</td>
          <td>The active page of this Container</td>
        </tr>
        <tr>
          <td>lastAction</td>
          <td>string</td>
          <td>The type of the last action performed</td>
        </tr>
    </tbody>
</table>

#### `onContainerActivate` params
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>currentContainerIndex</td>
          <td>number</td>
          <td>The index of the current container</td>
        </tr>
        <tr>
          <td>indexedStackOrder</td>
          <td>number[]</td>
          <td>The indexed stack order of the containers</td>
        </tr>
    </tbody>
</table>

#### `children` function params
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>currentContainerIndex</td>
          <td>number</td>
          <td>The index of the current container</td>
        </tr>
        <tr>
          <td>indexedStackOrder</td>
          <td>number[]</td>
          <td>The indexed stack order of the containers</td>
        </tr>
        <tr>
          <td>setCurrentContainerIndex</td>
          <td>(number)=>void</td>
          <td>Switch the current container by index</td>
        </tr>
        <tr>
          <td>setCurrentContainerName</td>
          <td>(string)=>void</td>
          <td>Switch the current container by name</td>
        </tr>
    </tbody>
</table>


### WindowGroup
A convenience component that wraps a `ContainerGroup` and is meant for
creating a group of `Window` components that overlap and are layered in
the order that they were last accessed.

#### props
Same as `WindowGroup` but with some changes in defaults.
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>default</th>
        <th>required</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>useDefaultContainer</td>
          <td>boolean</td>
          <td>false</td>
          <td></td>
          <td>Consider the first container in the group as the default</td>
        </tr>
        <tr>
          <td>hideInactiveContainers</td>
          <td>boolean</td>
          <td>false</td>
          <td></td>
          <td>Don't show the content of inactive containers</td>
        </tr>
    </tbody>
</table>

### Window
A single window inside a `WindowGroup`

#### props
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>required</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>top</td>
          <td>number</td>
          <td></td>
          <td>The top of the window in px</td>
        </tr>
        <tr>
          <td>left</td>
          <td>number</td>
          <td></td>
          <td>The left of the window in px</td>
        </tr>
        <tr>
          <td>className</td>
          <td>string</td>
          <td></td>
          <td>The CSS class used to style this window</td>
        </tr>
        <tr>
          <td>children</td>
          <td>ReactNode or function</td>
          <td></td>
          <td></td>
          <td>The children of this ContainerGroup</td>
        </tr>
    </tbody>   
</table>

#### `children` function params
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>isOnTop/td>
          <td>boolean</td>
          <td>Is this window on the top of the stack in its `WindowGroup`</td>
        </tr>
    </tbody>
</table>
