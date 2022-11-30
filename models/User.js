const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  mentor: {
    type: String
  },
  programs:{
    type:Array,
  },
  role:{
    type:String
  },
  programList:{
    type:String
  }
});

module.exports = mongoose.model('user', UserSchema)
