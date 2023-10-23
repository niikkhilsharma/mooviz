const mongoose = require("mongoose");

const bgprocessModel = mongoose.Schema({
  processid: { type: String },
  cachetime: { type: Number },
});
module.exports =
  mongoose.models["bg-processes"] ||
  mongoose.model("bg-processes", bgprocessModel);
