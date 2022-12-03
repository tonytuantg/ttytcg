var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { google } = require('googleapis');
// var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const giaobanRouter = require('./routes/giaoban');
const chuyenvienRouter = require('./routes/chuyenvien');


const { Console } = require('console');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// app.use(session({
//   secret: 'TTYT',
//   resave: true,
//   saveUninitialized: true
// }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://ttytcg.epizy.com/',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// app.use('/', indexRouter);
app.use("/", loginRouter)
app.use('/users', usersRouter);
app.use('/giaoban', giaobanRouter);
app.use('/chuyenvien', chuyenvienRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 6969, () => {
  console.log("Is start");
})
module.exports = app;
