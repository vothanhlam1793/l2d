const express = require('express')
const app = express()
const dotenv = require('dotenv')
var logger = require('morgan')
var bodyParser = require('body-parser')
const path = require('path')

// Configure Environment
dotenv.config()
const port = process.env.PORT || 3000;

// Configure app
app.use(logger('dev'));
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.render("index");
})

app.get('/css', (req, res) => {
  res.render("example");
})

app.listen(port, () => {
  console.log(`Server ${process.env.APP_NAME || "Noname"} ${port}`)
})