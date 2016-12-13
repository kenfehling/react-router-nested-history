### react-router
<br>

#### HistoryRouter
Use this in place of react-router's `BrowserRouter` component to enable this library.
<br>

#### HistoryLink
Use this in place of react-router's `Link` component to enable history tracking for a link.
<br>

#### Container
Use this component to wrap one or more `HistoryMatch` components to enable history for a container (a nested tab or window).

##### props
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
<br>

#### ContainerGroup
Wraps one or more `Container` components that act as a group (a group of tabs, etc.)

##### props
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
          <td>currentContainerIndex</td>
          <td>number</td>
          <td align="center"></td>
          <td>Allows you to set the index of the active container</td>
        </tr>
        <tr>
          <td>onContainerSwitch</td>
          <td>Function</td>
          <td></td>
          <td>Runs when a container is switched (typically useful when loading from a URL (deep link/bookmark)</td>
        </tr>
    </tbody>   
</table>
