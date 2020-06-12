const express = require('express')
const mongoose= require('mongoose')
const cors= require('cors')
const bodyParser = require("body-parser");

const app = express()
const port= process.env.PORT
const DB_HOST= process.env.DB_HOST
const DB_PORT= process.env.DB_PORT
const DB_DATABASE= process.env.DB_DATABASE
const searchRouter= require("./routes/search")
const productRouter= require("./routes/product")

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('public'))


app.get('/', (req, res) =>{ 
    console.log(`\n\nnew request, its method: ${req.method}`);
    console.log(`the url requested: ${req.url}\n`);
    res.send('Server running!')
})
app.use('/search', searchRouter)
app.use('/product', productRouter)


mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, async (err) => {
  if (!err) {
    console.log("Started connection to mongo");
  }
  else console.log(err);
});
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

app.listen(port, () => console.log(`Server is listening at http://localhost:${port}`))
