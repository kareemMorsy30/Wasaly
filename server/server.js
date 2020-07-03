require('dotenv').config();

const express = require('express')
const mongoose= require('mongoose')
const cors= require('cors')
const bodyParser = require("body-parser");
var path = require('path'); 
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
exports.io = io;
const port= process.env.PORT
const DB_HOST= process.env.DB_HOST
const DB_PORT= process.env.DB_PORT
const DB_DATABASE= process.env.DB_DATABASE
const {
  serviceRouter,
  serviceOwnerRouter,
  productRouter,
  searchRouter,
  userRoutes,
  adminRouter,
  productOwnerRouter,
  OrderRouter,
  CategoryRouter,
  CustomerRouter
} = require('./routes/allRoutes');
const passport = require('passport');
const morgan = require('morgan');
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = require("stripe")("sk_test_51GyFlZASd8wCD66zQnZ6lVzneK62YhprG2iBtZdVmN4lknDDp5idlD5BA0vW0SCHtULgyabjPghW4lLlLpyFhQGp00yQmrYy3G");

io.sockets.on('connection', function (socket) {

  socket.on('subscribe', function(data) { socket.join(data.room); })

  socket.on('unsubscribe', function(data) { socket.leave(data.room); })

});
app.use(cors({origin: "http://localhost:3000", credentials: true,methods:"GET,POST,PUT,PATCH,DELETE,OPTIONS"}));
app.use(express.json())
// app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public'))) ;
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) =>{ 
    console.log(`\n\nnew request, its method: ${req.method}`);
    console.log(`the url requested: ${req.url}\n`);
    res.send('Server running!')
})

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
}, async (err) => {
  if (!err) {
    console.log(`Started connection to mongo ::  ${DB_DATABASE}`);
    
  }
  else console.log(err);
});


//__________________________________MiddleWares_______________________________________________________
//For logging 
app.use(cors({origin: true, credentials: true}));
app.use(morgan('dev'));

//Passport
app.use(passport.initialize());
app.use(passport.session());
//Config Passport
require('./config/passport')(passport);

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public")); 

//___________________________Routes_____________________
app.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
app.use('/users',userRoutes);

/* --------------- Customer routes -------------------------*/
app.use('/services', serviceRouter);
// app.use('/users',userRouter);
app.get('/', (req, res) =>{ 
  console.log(`\n\nnew request, its method: ${req.method}`);
  console.log(`the url requested: ${req.url}\n`);
  res.send('Server running!')
})
app.use('/search', searchRouter)
app.use('/product', productRouter)
app.use('/orders', OrderRouter)
app.use('/category', CategoryRouter)
app.use('/customers', CustomerRouter)


/*-------------payment---------------------------*/
const SERVER_CONFIGS = require('./constants/backend');

const configureServer = require('./index');
const configureRoutes = require('./routes/paymentIndex');

// // const app = express();

configureServer(app);
configureRoutes(app);

// app.listen(SERVER_CONFIGS.PORT, error => {
//   if (error) throw error;
//   console.log('Server running on port: ' + SERVER_CONFIGS.PORT);
// });

/* --------------- Product owner routes -------------------------*/
app.use('/product-owners', productOwnerRouter);

/* --------------- Service owner routes -------------------------*/

app.use('/service-owners', serviceOwnerRouter);

/* --------------- Admin routes -------------------------*/
app.use('/admin', adminRouter);
//___________________________ERRRORRS_____________________
app.use(function handleDatabaseError(error, request, response, next) {
  console.log(error)
  if (error.name==='MongoError') {
    if (error.code === 11000) {
      return response
        .status(HttpStatus.CONFLICT)
        .json({
          httpStatus: HttpStatus.CONFLICT,
          type: 'DatabaseError',
          message: error.message
        });
    } else {
      return response.status(503).json({
        httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
        type: 'DatabaseError',
        message: error.message
      });
    }
  }
  else if(error.name=="SyntaxError"){
    return response.status(503).json({
      httpStatus: 503,
      type: 'Syntax Error',
    });
  }
  else if(error.name=="CastError"){
    return response.status(503).json({
      httpStatus: 503,
      type: 'Cast Error',
    });
  }
  else if(error.name=="ValidationError"){
    return response.status(503).json({
      httpStatus: 503,
      type: 'ValidationError',
      message: error.message
    });
  }
  else if(error=="Duplicate product"){
    return response.status(503).json({
      httpStatus: 503,
      type: 'Duplicate Product',
      message: "Duplicat Product"
    });
  }

  next(error);
});

app.use((req, res, next) => { //404 Not Found
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const error = err.message || 'Error processing your request';
console.log("app.use",error);

  res.status(status).send({
      error
  })
});



server.listen(port, () => console.log(`Server is listening at http://localhost:${port}`))


/** just in case some thing wrong happend in port
 * First, you would want to know which process is using port 5000/3000

sudo lsof -i :5000
this will list all PID listening on this port, once you have the PID you can terminate it with the following:
PID: Is anum :)
kill -9 {PID}
 */
