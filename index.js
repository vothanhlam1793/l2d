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
app.get("/janus", function(req,res){
  res.render("janus");
})

app.get("/control", (req, res)=>{
  console.log("control");
  res.render("control_device");
})

app.get("/l2d", function(req, res){
  res.render("l2d", {
    bot: req.query.bot,
    map: req.query.map
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

app.get("/lz", function(req, res){
  res.render('lz', {
    index: req.query.index || "draw3"
  });
});

app.get("/draw3", function(req, res){
  res.render('draw3', {
    index: req.query.index || "draw3",
    up: req.query.up || 45,
    down: req.query.down || 20
  });
});
app.get("/draw4", function(req, res){
  var render = req.query.index || "/draw4";
  res.render(render, {
    index: req.query.index || "draw3",
    up: req.query.up || 45,
    down: req.query.down || 20,
  });
});

app.get("/drawv", function(req, res){
  res.render('drawv', {
    index: req.query.index || "draw3"
  });
});

app.get("/draw2", function(req, res){
  res.render("draw2");
});

app.use(function(req, res, next){
  console.log("NEX")
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server ${process.env.APP_NAME || "Noname"} ${port}`)
})