const express = require('express')
const path = require('path')
const cors = require('cors')
const todoController = require('./controller')
const pool = require('./db')
const PORT = 3000
const cookieParser = require('cookie-parser')

const app = express()
//routers?

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())

//serve static files
app.use(express.static(path.resolve(__dirname, '../index.html')))

//add new todo
app.post(
  '/addnew',
  (req, res) => console.log(req.body),
  todoController.addnew,
  (req, res, next) => {
    return res.status(200).json(res.locals.todo)
  },
)
//update existing todo

//delete existing todo

//checkoff existing todo

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  }
  const errorObj = Object.assign({}, defaultErr, err)
  console.log(errorObj.log)
  return res.status(errorObj.status).json(errorObj.message)
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
