const express = require('express')
const app = express()
const dotenv = require('dotenv')
var logger = require('morgan')
var bodyParser = require('body-parser')
const path = require('path')

// Configure Environment
dotenv.config()
const port = process.env.PORT || 8080;

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
});

app.get("/control", (req, res)=>{
  console.log("control");
  res.render("control_device");
})

app.get("/l2d", function(req, res){
  res.render("l2d", {
    index: req.query.index,
    bot: req.query.bot
  });
})

app.get('/css', (req, res) => {
  res.render("example");
})

app.get('/map', (req, res) => {
  res.render("map");
})

app.get('/map/:version', (req, res) => {
  res.render("map");
})

app.get("/draw", function(req, res){
  res.render('draw', {
    index: req.query.index || "draw3"
  });
});

app.get("/drawv", function(req, res){
  res.render('drawv', {
    index: req.query.index || "draw3"
  });
});

app.use(function(req, res, next){
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server ${process.env.APP_NAME || "Noname"} ${port}`)
})