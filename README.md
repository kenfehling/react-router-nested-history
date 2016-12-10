### react-router

##### HistoryMatch
Use this component in place of `Match` to enable history.

#### HistoryLink
Use this component in place of `Link` to enable history tracking for a link.

#### Container
Use this component to wrap one or more HistoryMatch components to enable history for a container (a nested tab or window).

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