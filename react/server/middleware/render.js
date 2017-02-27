import React from 'react';
import App from '../../src/components/App'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router'

export default function render(req, res) {
  const context = {};

  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>,
  );

  //res.setHeader('Content-Type', 'text/html charset=utf-8')

  if (context.url) {
    return res.redirect(302, context.url);
  }

  //res.render('index.ejs', { reactOutput: html} )
  return res
    .status(context.status || 200)
    .send(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>React Starter</title>
          <link rel="stylesheet" href="/static/style.css" />
        </head>
        <body>
          <div id="root">${html}</div>
          <script src="/static/client.js"></script>
        </body>
      </html>
    `);
}