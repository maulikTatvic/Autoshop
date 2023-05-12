
const mongoose = require('mongoose');
const dotenv = require("dotenv");  //require dotenv package
dotenv.config({ path: ".env" }); 
const uri = process.env.DB_LOCAL_URI;
const connectDatabase = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase

