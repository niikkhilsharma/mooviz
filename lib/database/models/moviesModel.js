const mongoose = require("mongoose");

const authschema = mongoose.Schema({
  IMDB: { type: String },
  data: { type: Array },
});
module.exports =
  mongoose.models["hollywood-movies_moviezverses"] ||
  mongoose.model("hollywood-movies_moviezverses", authschema);
