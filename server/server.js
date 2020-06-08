const express = require('express')
const mongoose= require('mongoose')
const cors= require('cors')
const app = express()
const port= process.env.PORT
const DB_HOST= process.env.DB_HOST
const DB_PORT= process.env.DB_PORT
const DB_DATABASE= process.env.DB_DATABASE

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
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
    console.log("Started connection to mongo");
  }
  else console.log(err);
});

app.listen(port, () => console.log(`Server is listening at http://localhost:${port}`))
