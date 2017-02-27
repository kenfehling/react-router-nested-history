require('source-map-support').install()

import express from 'express'
import favicon from 'serve-favicon'
import path from 'path'
import compression from 'compression'
import renderMiddleware from './middleware/render'

const app = express()
app.use('/static', express.static(path.join(__dirname, 'build')))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
//app.set('views', path.join(__dirname, 'views'))
//app.set('view engine', 'ejs')

const isProduction = process.env.NODE_ENV === 'production'

app.use(compression())

/*
if (isProduction) {
  app.use(compression())
} else {
  const {
    webpackDevMiddleware,
    webpackHotMiddleware,
  } = require('./middleware/webpack')

  app.use(webpackDevMiddleware)
  app.use(webpackHotMiddleware)
}
*/

app.use(renderMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server running on port ${port}`));