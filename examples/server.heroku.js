const express = require('express')
const path = require('path')
const app = express()


const root = path.resolve(__dirname, 'build')

// Serve static assets
app.use(express.static(root))

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.join(root, 'index.html'))
})

const PORT = process.env.PORT || 9000

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))