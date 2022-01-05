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

//swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "MEDICO",
      description: "MEDICO: mobile application to assist elder people. in order to remind them to have their medication ",
      version:"1.0.0",
      contact: {
        name: "us via email",
        email:"medico.for.health@gmail.com"
      },
      server: ["http://localhost:3000"],
    }
  },
  apis: ["./Routes/users.js","./Routes/medications.js","./Routes/auth.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//Routes
const usersRoutes = require('./Routes/users');
const authRoutes = require('./Routes/auth')
const medicationsRoutes = require('./Routes/medications');

app.use(`${api}/users`, usersRoutes);
app.use(`${api}`, authRoutes);
app.use(`${api}/medications`, medicationsRoutes);
app.use(express.static('Public'));

app.use('/Uploads', express.static(__dirname + '/Uploads'));

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
