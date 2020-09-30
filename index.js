const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routers/home')
const session = require("express-session")

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true}))
app.use(session({
  secret: "newsteller",
  resave: false,
  saveUninitialized: true
}))

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})