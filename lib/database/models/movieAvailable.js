const mongoose = require("mongoose");

const authschema = mongoose.Schema({
  IMDB: { unique: true, type: String },
  data: { type: String },
});
module.exports =
  mongoose.models["movies_available_on_server"] ||
  mongoose.model("movies_available_on_server", authschema);
