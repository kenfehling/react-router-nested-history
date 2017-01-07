react-router-nested-history
---------------------------

A library to help build [React](https://facebook.github.io/react) apps with nested tabs and other containers that have their own history, complete with automatic altering of the browser's back and forward history to make it behave as you would expect.

## Live demo
[react-router-nested-history.herokuapp.com](https://react-router-nested-history.herokuapp.com)

## Installation
```
npm install --save kenfehling/react-router-nested-history
```

## react-router
This library is built to support [react-router 4](https://github.com/ReactTraining/react-router/tree/v4).
It's been developed and tested against [v4.0.0-alpha.6](https://github.com/ReactTraining/react-router/releases/tag/v4.0.0-alpha.6) and
when version 4 is officially released the library will be updated for that API.

This library is very new and untested
(except for unit tests, [examples](https://react-router-nested-history.herokuapp.com), and its use on my
[personal webpage](http://kenfehling.com)) so it's not really production ready. I
would **very much** appreciate any feedback as I continue to solidify it.

Right now this library only works with browserHistory (HTML5 History API, not with hash history)

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
          <td>String</td>
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
          <td>({params}) =&gt; String</td>
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
          <td>initialUrl</td>
          <td>String</td>
          <td align="center">✓</td>
          <td>The path that the container starts on</td>
        </tr>
        <tr>
          <td>pattern</td>
          <td>String</td>
          <td></td>
          <td>A pattern of paths that will load in this container from a URL in the address bar</td>
        </tr>
        <tr>
          <td>patterns</td>
          <td>Array&lt;String&gt;</td>
          <td></td>
          <td>A list of path patterns that will load in this container from a URL in the address bar</td>
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
          <td>currentContainerIndex</td>
          <td>number</td>
          <td></td>
          <td align="center"></td>
          <td>Allows you to set the index of the active container</td>
        </tr>
        <tr>
          <td>onContainerSwitch</td>
          <td>Function</td>
          <td></td>
          <td></td>
          <td>Runs when a container is switched (typically useful when loading from a URL (deep link/bookmark)</td>
        </tr>
        <tr>
          <td>useDefaultContainer</td>
          <td>boolean</td>
          <td>true</td>
          <td></td>
          <td>Consider the first container in the group as the default</td>
        </tr>
        <tr>
          <td>keepHistory</td>
          <td>boolean</td>
          <td>true</td>
          <td></td>
          <td>Keep container's history when switching to another container</td>
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