const mongoose = require("mongoose");

const authschema = mongoose.Schema({
  drivepro: { type: Object },
  driveace: { type: Object },
  drivesharer: { type: Object },
  drivehub: { type: Object },
});
module.exports =
  mongoose.models["cookie_gdrives"] ||
  mongoose.model("cookie_gdrives", authschema);
