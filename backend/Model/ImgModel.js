const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImgSchema = new Schema({
  image: {
    type: String, //dataType
    required: true, //Validate
  },
});

module.exports = mongoose.model(
  "ImgModel", //file name
  ImgSchema //function name
);
