const mongoose = require("mongoose");

const reqCache = mongoose.Schema({
  cacheid: { type: String },
  cachetime: { type: Number },
  timestring: { type: String },
  cache: { type: Object },
});
module.exports =
  mongoose.models["request_cache"] || mongoose.model("request_cache", reqCache);
