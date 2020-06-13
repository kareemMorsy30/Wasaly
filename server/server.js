require('dotenv').config();

const express = require('express')
const mongoose= require('mongoose')
const cors= require('cors')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
exports.io = io;
const port= process.env.PORT
const DB_HOST= process.env.DB_HOST
const DB_PORT= process.env.DB_PORT
const DB_DATABASE= process.env.DB_DATABASE
const {
  serviceRouter
} = require('./routes/allRoutes');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoutes = require('../server/routes/user.routes');

app.use(cors())
app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) =>{ 
    console.log(`\n\nnew request, its method: ${req.method}`);
    console.log(`the url requested: ${req.url}\n`);
    res.send('Server running!')
})

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log(`Started connection to mongo ::  ${DB_DATABASE}`);
    console.log(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`);
    
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

app.use('/users',userRoutes);
// Customer routes
app.use('/services', serviceRouter);
//___________________________ERRRORRS_____________________


app.use((req, res, next) => { //404 Not Found
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const error = err.message || 'Error processing your request';

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