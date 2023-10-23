const mongoose = require("mongoose");

const authschema = mongoose.Schema({
  IMDB: { type: String },
  data: { type: Array },
});
module.exports =
  mongoose.models["Movies-VegaMovies"] ||
  mongoose.model("Movies-VegaMovies", authschema);
