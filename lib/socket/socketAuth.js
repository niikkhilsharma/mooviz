import onlineusersmodel from "../database/models/onlineusers.js";
import dbConnect from "../database/dbconnect.js";
const { io } = require("socket.io-client");
// var socket = io("wss://movizz-socket-io.onrender.com", {
//   auth: {
//     user: "super",
//     token:
//       "a2dmeWp0c3lmaGprZ2Z0eWp0aDdnNmRkdDd5dWV0ZjdzNmY1dXk4N3k4NzlndmpjZ2hvODd0dWhjdHlpcG9oamdmZTQ2cnhjZ2U1NHdpN2hydmRieWlrb2J5ZGZpa3V2YnlraWRyYnZ0aXVrZGZiYmlreWVkdWpieWVkdWlrdnR1aWtyYmN2aWt1ZTRkYml2azhlM2J5YzRrcmJ5Y3J0bG84ZXJ5bnY1aWtlY3Zpa3ViZWRjdHlpa3U1dnRieGV1aWtvZ3R2dWlrY2RydmptYmdlZGNyamlidGdoamRjcmtiNWpta3Vjcm5pa3VibmRyZGlrdXZibnVpa2ZnYnZyNXVpa3JjYnV5azV0ZXl1ZHQ1aWs3cmRpdXlidTVmdmVydWlrZGtiZ3R2NXVpa2Z2YmNndHZpdWtyZHRidnRpa3V4ZWR2aWt1ZWRiZ3ZranV5aXBvZHI1eGRnZTV5aXVjdm5kZ3J5dWh2ZnlpeW9raGdqY2Z6c3FldzIzNWU0NnV0aXlbMDA9aztoa3V0eWU1dHJkZmd5dDY4NzVyeWdnODc3NXJ5ZGZnaHU4NzZyNzV5ZGZoZ2podTh5N3Q2cjdkeWZnY2hndmpoa3U4NzY1cjdkZmNoYmppdXk3dHJmeWhjZ3ZqYmhoanV5dHVmeWNodmpiaGp1eXR1Znk4NmZncmVzZ2Rl",
//   },
// });

const verifyauth = async (req, res, next) => {
  try {
    await dbConnect();
    var alldat = await onlineusersmodel.find({ UID: req.user });
    if (alldat[0]) {
      //   console.log("authenticated");
      next();
    } else {
      //   console.log("unauthenticated");
      res.send({ accepted: false, msg: "Try Again ..." });
    }
  } catch (error) {
    console.log(error);
  }
  //   if (!socket.connected) {
  //     socket.connect();
  //   }
  //   socket.once("connect", () => {
  //     socket.emit("validate-user", req.user);
  //     socket.once("validate-user-resp", async (data) => {
  //       try {
  //         if (data.validation) {
  //           next();
  //         } else {
  //           throw new error();
  //         }
  //       } catch {
  //         try {
  //           res.send({ accepted: false, msg: "Try Again ..." });
  //         } catch {}
  //       }
  //     });
  //   });
};

module.exports = verifyauth;
