const mongoose = require("mongoose");

const authschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  emailOrignal: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: Array,
    required: true,
  },
  Isbanned: {
    type: Boolean,
    default: false,
  },
});
module.exports =
  mongoose.models?.movizz_users || mongoose.model("movizz_users", authschema);
