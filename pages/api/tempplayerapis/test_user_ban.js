import io from "socket.io-client";
import nc from "next-connect";
import DB from "../../../lib/database/dbconnect";
import usermodel from "../../../lib/database/models/usermodel";
const socket = io("wss://movizz-socket-io.onrender.com", {
  auth: {
    user: "super",
    token:
      "a2dmeWp0c3lmaGprZ2Z0eWp0aDdnNmRkdDd5dWV0ZjdzNmY1dXk4N3k4NzlndmpjZ2hvODd0dWhjdHlpcG9oamdmZTQ2cnhjZ2U1NHdpN2hydmRieWlrb2J5ZGZpa3V2YnlraWRyYnZ0aXVrZGZiYmlreWVkdWpieWVkdWlrdnR1aWtyYmN2aWt1ZTRkYml2azhlM2J5YzRrcmJ5Y3J0bG84ZXJ5bnY1aWtlY3Zpa3ViZWRjdHlpa3U1dnRieGV1aWtvZ3R2dWlrY2RydmptYmdlZGNyamlidGdoamRjcmtiNWpta3Vjcm5pa3VibmRyZGlrdXZibnVpa2ZnYnZyNXVpa3JjYnV5azV0ZXl1ZHQ1aWs3cmRpdXlidTVmdmVydWlrZGtiZ3R2NXVpa2Z2YmNndHZpdWtyZHRidnRpa3V4ZWR2aWt1ZWRiZ3ZranV5aXBvZHI1eGRnZTV5aXVjdm5kZ3J5dWh2ZnlpeW9raGdqY2Z6c3FldzIzNWU0NnV0aXlbMDA9aztoa3V0eWU1dHJkZmd5dDY4NzVyeWdnODc3NXJ5ZGZnaHU4NzZyNzV5ZGZoZ2podTh5N3Q2cjdkeWZnY2hndmpoa3U4NzY1cjdkZmNoYmppdXk3dHJmeWhjZ3ZqYmhoanV5dHVmeWNodmpiaGp1eXR1Znk4NmZncmVzZ2Rl",
    // token:
    //   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkxNmI4Zjk4OTAyZjdkY2VmZWNkOWMiLCJpYXQiOjE2NzA1NDA3MjAsImF1ZCI6IlB1YmxpYyIsImlzcyI6Ik1vdml6eiIsInN1YiI6IlVzZXJfQXV0aCJ9.mrWtc26n4VUVpA2NCALYbfgAlkgNbvPcYXOljhCHRTd_7ibhNeiLNcxOHbaq4wOJ8F3MyyDUZjfU3pkPEVg71zBF9rREzrcle29_dzNBSVFhNzL3QGDukQWaY9CCdFTGz4Aa50Yx806yQW1CMyCekZgThVfRnxzUBz_Xcj2zcoU",
  },
});
const router = nc({
  onError(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Internal Server Error");
  },
}).get(async (req, res) => {
  await DB();
  if (!socket.connected) {
    socket.connect();
  }
  // return;
  //   if (socket.connected) {
  //   console.log(socket.connected);
  //   clearInterval(interval);
  // socket.on("connect", () => {
  //   console.log("try6");
  // });
  socket.emit("validate-user", req.query.id);
  socket.off("validate-user-resp");
  socket.on("validate-user-resp", async (data) => {
    if (data.validation) {
      socket.emit("ban-user", req.query.id);
      socket.off("banned");
      socket.on("banned", async (data) => {
        await usermodel.findByIdAndUpdate(req.query.id, { Isbanned: true });
        res.send({ status: true, LiveBanned: true, msg: "Banned" });
        socket.disconnect();
      });
    } else {
      await usermodel.findByIdAndUpdate(req.query.id, { Isbanned: true });
      res.send({ status: true, LiveBanned: false, msg: "Banned" });
    }
  });
  //   }
  //   var interval = setInterval(() => {
  //   }, 500);
});

export default router;
