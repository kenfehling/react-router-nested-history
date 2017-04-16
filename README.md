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
[react-router 4](https://github.com/ReactTraining/react-router/tree/v4).

This library is very new and not battle-tested, although it does have
unit tests, end-to-end tests, [examples](https://react-router-nested-history.herokuapp.com),
and is used on my (soon to be released) [personal webpage](http://kenfehling.com). I
would **very much** appreciate any feedback as I continue to solidify it.

Right now this library only works with browserHistory (HTML5 History API, not with hash history)

### Roadmap
- [x] Nested container groups
- [x] End to end tests using [Nightwatch.js](http://nightwatchjs.org)
- [x] Support for title libraries like [react-helmet](https://github.com/nfl/react-helmet)
- [x] Transition animations (slide-in, slide-out)
- [x] Support for SSR (server-side rendering)
- [x] Support for components that lazy render (many existing React tab libraries)

## API

### HistoryRouter
Use this in place of react-router's `BrowserRouter` component to enable this library.

#### props (in addition to the existing `BrowserRouter` props)
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>zeroPage</td>
          <td>string</td>
          <td>/</td>
          <td>The page at the beginning of the history stack</td>
        </tr>
    </tbody>
</table>

### HistoryRoute
Use this in place of react-router's `Route` component to prevent a match's previous content from disappearing.

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
          <td></td>
          <td>The CSS class for styling this element</td>
        </tr>
        <tr>
          <td>activeClassName</td>
          <td>string</td>
          <td></td>
          <td>An alternate CSS class for styling the active item</td>
        </tr>
        <tr>
          <td>onClick</td>
          <td>Function</td>
          <td></td>
          <td>
            Do an additional action when this HeaderLink is clicked,
            in addition to activating its associated Container
          </td>
        </tr>
        <tr>
          <td>children</td>
          <td>ReactNode or Function</td>
          <td align="center"></td>
          <td>The children of this HeaderLink</td>
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
          <td>isActive</td>
          <td>boolean</td>
          <td>Is this HeaderLink's associated Container active?</td>
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
          <td>children</td>
          <td>ReactNode or ({params}) =&gt; ReactNode</td>
          <td align="center"></td>
          <td>Defines what appears in the back link (default: 'Back')</td>
        </tr>
    </tbody>
</table>

### Container
Use this component to wrap one or more `HistoryRoute` components to enable history for a container (a nested tab or window).

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
          <td>The name of this container (must be unique)</td>
        </tr>
        <tr>
          <td>initialUrl</td>
          <td>string</td>
           <td></td>
          <td align="center">✓</td>
          <td>The path that the container starts on</td>
        </tr>
        <tr>
          <td>patterns</td>
          <td>string[]</td>
            <td></td>
          <td align="center">✓</td>
          <td>A list of path patterns that will load in this container from a URL in the address bar</td>
        </tr>
        <tr>
          <td>isDefault</td>
          <td>boolean</td>
          <td>false</td>
          <td></td>
          <td>Consider this the default tab</td>
        </tr>
        <tr>
            <td>animate</td>
            <td>boolean</td>
            <td>true</td>
            <td align="center"></td>
            <td>Should this container use slide transition animations?</td>
        </tr>
        <tr>
          <td>className</td>
          <td>string</td>
            <td></td>
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
          <td>isDefault</td>
          <td>boolean</td>
          <td>false</td>
          <td></td>
          <td>Consider this the default tab (only for a nested group)</td>
        </tr>
        <tr>
          <td>allowInterContainerHistory</td>
          <td>boolean</td>
          <td>false</td>
          <td></td>
          <td>Allow history that would cause containers to switch</td>
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
          <td>ReactNode or Function</td>
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
          <td>currentContainerIndex</td>
          <td>number</td>
          <td>The index of the current container</td>
        </tr>
        <tr>
          <td>currentContainerName</td>
          <td>string</td>
          <td>The name of the current container</td>
        </tr>
        <tr>
          <td>stackOrder</td>
          <td>Container[]</td>
          <td>The containers ordered by how recently they were activated</td>
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
creating a group of `HistoryWindow` components that overlap and are layered in
the order that they were last accessed.

#### props
Same as `ContainerGroup` but with changes in defaults.
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
          <td>hideInactiveContainers</td>
          <td>boolean</td>
          <td>false</td>
          <td></td>
          <td>Don't show the content of inactive containers</td>
        </tr>
    </tbody>
</table>

#### `children` function params
Same as `ContainerGroup` except with these additions:
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
          <td>openWindow</td>
          <td>({name:string}|{index:number}) => void</td>
          <td>Open a window in this group</td>
        </tr>
        <tr>
          <td>resetWindowPositions</td>
          <td>() => void</td>
          <td>Restore the positions of the windows in this group to their original values</td>
        </tr>
    </tbody>
</table>

### HistoryWindow
A single window inside a `WindowGroup`

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
          <td>forName</td>
          <td>string</td>
          <td align="center">✓</td>
          <td></td>
          <td>The name of the container or group this window wraps</td>
        </tr>
        <tr>
          <td>visible</td>
          <td>boolean</td>
          <td>true</td>
          <td></td>
          <td>Is this window visible?</td>
        </tr>
         <tr>
           <td>draggable</td>
           <td>boolean</td>
           <td>false</td>
           <td></td>
           <td>Uses [react-draggable](https://github.com/mzabriskie/react-draggable) to make window draggable</td>
         </tr>
         <tr>
           <td>draggableProps</td>
           <td>Object</td>
           <td>{}</td>
           <td></td>
           <td>Props passed to the Draggable component</td>
         </tr>
         <tr>
           <td>rememberPosition</td>
           <td>boolean</td>
           <td>true if draggable</td>
           <td></td>
           <td>Remember the position this window was dragged to?</td>
         </tr>
        <tr>
          <td>left/center/right</td>
          <td>number (in pixels)</td>
          <td></td>
          <td></td>
          <td>Position horizontally based on (only) one of these anchor points</td>
        </tr>
       <tr>
          <td>top/middle/bottom</td>
          <td>number (in pixels)</td>
          <td></td>
          <td></td>
          <td>Position vertically based on (only) one of these anchor points</td>
        </tr>
        <tr>
          <td>className</td>
          <td>string</td>
          <td></td>
          <td></td>
          <td>The CSS class used to style this window</td>
        </tr>
        <tr>
          <td>topClassName</td>
          <td>string</td>
          <td></td>
          <td></td>
          <td>The CSS class used when this window is on top</td>
        </tr>
        <tr>
          <td>children</td>
          <td>ReactNode or Function</td>
          <td></td>
          <td align="center">✓</td>
          <td>The children of this HistoryWindow</td>
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
          <td>open</td>
          <td>() => void</td>
          <td>Make this window visible</td>
        </tr>
        <tr>
          <td>close</td>
          <td>() => void</td>
          <td>Make this window invisible</td>
        </tr>
        <tr>
          <td>switchTo</td>
          <td>() => void</td>
          <td>Switch to this window</td>
        </tr>
    </tbody>
</table>


### ScrollArea
Keeps track of scrolling inside a container

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
          <td>resetOnLeave</td>
          <td>boolean</td>
          <td>false</td>
          <td></td>
          <td>Reset the scroll position when the container is left</td>
        </tr>
        <tr>
          <td>horizontal</td>
          <td>boolean</td>
          <td>false</td>
          <td></td>
          <td>Use horizontal scrolling</td>
        </tr>
        <tr>
          <td>vertical</td>
          <td>boolean</td>
          <td>false</td>
          <td></td>
          <td>Use vertical scrolling</td>
        </tr>
    </tbody>
</table>