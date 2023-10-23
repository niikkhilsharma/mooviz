const mongoose = require("mongoose");

const authschema = mongoose.Schema({
  movizzdatabase: { type: Object },
  movizzdatabase2: { type: Object },
  movizzdatabase3: { type: Object },
  movizzdatabase4: { type: Object },
  movizzdatabase5: { type: Object },
  movizzdatabase6: { type: Object },
  movizzdatabase7: { type: Object },
});
module.exports =
  mongoose.models["all_servers_locations"] ||
  mongoose.model("all_servers_locations", authschema);
