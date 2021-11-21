const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express();
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
// mongoose.connect(uri , { useNewUrlParser : true , useUnifiedTopology: true})
// const connection = mongoose.connection;
// connection.once('open', () =>{
//     console.log('MongoDB connection established successfully')
// })
mongoose.connect(uri, ()=> {
    console.log('MongoDB connection established successfully');
})

const users = require('./routes/user')
app.use('/',users);


app.listen(PORT,()=>{
    console.log(`server started on `, PORT)
})