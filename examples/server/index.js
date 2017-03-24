require('source-map-support').install()
import express from 'express'
import favicon from 'serve-favicon'
import path from 'path'
import compression from 'compression'
import React from 'react'
import App from '../src/components/App'
import {renderToString} from 'react-dom/server'
import {HistoryRouter} from 'react-router-nested-history'

const app = express()
app.use('/static', express.static(path.join(__dirname, 'build')))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(compression())

app.use((req, res) => {
  const context = {};

  const html = renderToString(
    <HistoryRouter location={req.url} context={context}>
      <App />
    </HistoryRouter>,
  );

  if (context.url) {
    return res.redirect(302, context.url);
  }

  return res
    .status(context.status || 200)
    .render('index.ejs', {html})
})

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server running on port ${port}`));