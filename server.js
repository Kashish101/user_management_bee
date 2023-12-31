const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path=require('path');
const connectDB=require('./server/database/connection')
const app = express();

// dotenv -> keep passwords, API keys, and other sensitive data out of your code
dotenv.config({ path: 'config.env' });

// now port is running on env file if there is any error then it will run on 8080
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser  -> an HTTP request body that usually helps when you need to know more than just the URL being hit
app.use(bodyParser.urlencoded({extended: true}))

//set view engine
app.set('view engine','ejs');
// app.set('views',path.resolve(__dirname,'views/ejs'));

//load assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')));
app.use('/img',express.static(path.resolve(__dirname,'assets/img')));
app.use('/js',express.static(path.resolve(__dirname,'assets/js')));

//load routes
app.use('/',require('./server/routes/router'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
