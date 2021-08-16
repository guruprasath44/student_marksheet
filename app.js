const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require('dotenv').config();

const uri = process.env.ATLAS_URI;
const app = express();
const auth = require('./routes/auth');
const addmarks = require('./routes/addmarks');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(auth);
app.use(addmarks);

app.set('views', [`${__dirname}/views`, `${__dirname}/views/admin`, `${__dirname}/views/student`]);
app.set('view engine', 'ejs');


mongoose.Promise = global.Promise;

mongoose
.connect(uri, 
  { useNewUrlParser: true,
     useCreateIndex: true, 
     useUnifiedTopology: true 
    }).then((res)=> {
  console.log('Connected Database Successfully');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is listening at 5000');
});
