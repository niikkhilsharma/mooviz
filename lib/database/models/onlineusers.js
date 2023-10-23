const mongoose = require("mongoose");
const onlineUserSchema = mongoose.Schema({
  UID: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
  connectedAt: {
    type: Number,
    required: true,
  },
});

module.exports =
  mongoose.models.onlineUsers ||
  mongoose.model("onlineUsers", onlineUserSchema);
