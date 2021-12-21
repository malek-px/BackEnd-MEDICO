const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const api = process.env.API_URL;

app.get(`/`,(req, res) => {
    res.send('HELLO');
})

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

//Routes
const usersRoutes = require('./Routes/users');
const authRoutes = require('./Routes/auth')
const medicationsRoutes = require('./Routes/medications');

app.use(`${api}/users`, usersRoutes);
app.use(`${api}`, authRoutes);
app.use(`${api}/medications`, medicationsRoutes);

//Connecting server
app.listen(3000, ()=>{
    console.log('server is running on port 3000');
})

//Connecting DataBase
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'medico-DB',
    
})
.then(()=> {
    console.log('DATABASE CONNECTED')
})
.catch((err) => {
    console.log(err)
})
