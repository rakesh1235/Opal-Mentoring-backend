const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/MentoringDB'

const mongoConnect = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Databaseeee")
    })
}

module.exports = mongoConnect