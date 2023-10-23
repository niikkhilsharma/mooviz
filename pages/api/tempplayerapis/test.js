import io from "socket.io-client";
import nc from "next-connect";
const socket = io(
  "https://a117-2405-201-5c0d-b847-78b4-7164-fa22-106d.ngrok.io",
  {
    auth: {
      user: "super",
      token:
        "a2dmeWp0c3lmaGprZ2Z0eWp0aDdnNmRkdDd5dWV0ZjdzNmY1dXk4N3k4NzlndmpjZ2hvODd0dWhjdHlpcG9oamdmZTQ2cnhjZ2U1NHdpN2hydmRieWlrb2J5ZGZpa3V2YnlraWRyYnZ0aXVrZGZiYmlreWVkdWpieWVkdWlrdnR1aWtyYmN2aWt1ZTRkYml2azhlM2J5YzRrcmJ5Y3J0bG84ZXJ5bnY1aWtlY3Zpa3ViZWRjdHlpa3U1dnRieGV1aWtvZ3R2dWlrY2RydmptYmdlZGNyamlidGdoamRjcmtiNWpta3Vjcm5pa3VibmRyZGlrdXZibnVpa2ZnYnZyNXVpa3JjYnV5azV0ZXl1ZHQ1aWs3cmRpdXlidTVmdmVydWlrZGtiZ3R2NXVpa2Z2YmNndHZpdWtyZHRidnRpa3V4ZWR2aWt1ZWRiZ3ZranV5aXBvZHI1eGRnZTV5aXVjdm5kZ3J5dWh2ZnlpeW9raGdqY2Z6c3FldzIzNWU0NnV0aXlbMDA9aztoa3V0eWU1dHJkZmd5dDY4NzVyeWdnODc3NXJ5ZGZnaHU4NzZyNzV5ZGZoZ2podTh5N3Q2cjdkeWZnY2hndmpoa3U4NzY1cjdkZmNoYmppdXk3dHJmeWhjZ3ZqYmhoanV5dHVmeWNodmpiaGp1eXR1Znk4NmZncmVzZ2Rl",
      // token:
      //   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkxNmI4Zjk4OTAyZjdkY2VmZWNkOWMiLCJpYXQiOjE2NzA1NDA3MjAsImF1ZCI6IlB1YmxpYyIsImlzcyI6Ik1vdml6eiIsInN1YiI6IlVzZXJfQXV0aCJ9.mrWtc26n4VUVpA2NCALYbfgAlkgNbvPcYXOljhCHRTd_7ibhNeiLNcxOHbaq4wOJ8F3MyyDUZjfU3pkPEVg71zBF9rREzrcle29_dzNBSVFhNzL3QGDukQWaY9CCdFTGz4Aa50Yx806yQW1CMyCekZgThVfRnxzUBz_Xcj2zcoU",
    },
  }
);
const router = nc({
  onError(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Internal Server Error");
  },
}).get(async (req, res) => {
  console.log(socket.connected);
  if (!socket.connected) {
    socket.connect();
  }
  //   socket.on("connect_error", (err) => {
  //     console.log(err instanceof Error); // true
  //     console.log(err.message); // not authorized
  //     console.log(err.data); // { content: "Please retry later" }
  //   });
  var interval = setInterval(() => {
    if (socket.connected) {
      console.log(socket.connected);
      clearInterval(interval);
      socket.emit("validate-user", "63916b8f98902f7dcefecd9c");

      socket.off("validate-user-resp");
      socket.on("validate-user-resp", (data) => {
        socket.disconnect();
        res.json(data);
        console.log(data);
      });
    }
  }, 500);

  //   res.send("ok");
  //   await socket.disconnect();
});

export default router;
