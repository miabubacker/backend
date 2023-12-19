const express = require('express')
require('dotenv').config()

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json('Hello World!')
})

app.get('/login', (req, res) => {
    res.send('<h1>Login page</h1>')
  })
app.listen(port, () => {
  console.log(`Example app  on port ${port}`)
})