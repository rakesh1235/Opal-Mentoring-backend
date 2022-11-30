const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProgramSchema = new Schema({
  program : {}
});

module.exports = mongoose.model('program', ProgramSchema)
