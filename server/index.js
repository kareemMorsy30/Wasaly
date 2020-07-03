const cors = require('cors');
const bodyParser = require('body-parser');

const CORS_WHITELIST = require('./constants/frontend');

const corsOptions = {
  origin: (origin, callback) =>{
  console.log(CORS_WHITELIST);
  console.log(origin);
  console.log(CORS_WHITELIST[0] == origin);
            callback(null, true)

  // if(CORS_WHITELIST[0] == origin){
  //       callback(null, true)
  //   }else{
  //       callback(new Error('Not allowed by CORS'))
  //   } 
      
}};

const configureServer = app => {
  app.use(cors(corsOptions));

  app.use(bodyParser.json());
};

module.exports = configureServer;