import React, { useEffect } from "react";
const { io } = require("socket.io-client");
const socket = io("ws://a117-2405-201-5c0d-b847-78b4-7164-fa22-106d.ngrok.io", {
  auth: {
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkxNmI4Zjk4OTAyZjdkY2VmZWNkOWMiLCJpYXQiOjE2NzA1NDA3MjAsImF1ZCI6IlB1YmxpYyIsImlzcyI6Ik1vdml6eiIsInN1YiI6IlVzZXJfQXV0aCJ9.mrWtc26n4VUVpA2NCALYbfgAlkgNbvPcYXOljhCHRTd_7ibhNeiLNcxOHbaq4wOJ8F3MyyDUZjfU3pkPEVg71zBF9rREzrcle29_dzNBSVFhNzL3QGDukQWaY9CCdFTGz4Aa50Yx806yQW1CMyCekZgThVfRnxzUBz_Xcj2zcoU",
  },
});

function SocketTest() {
  useEffect(() => {
    socket.on("data-bucket", (data) => {
      console.log(data);
    });

    // socket.on("banned", (data) => {
    //   console.log(data);
    // });
  }, []);

  return (
    <button
      onClick={() => {
        console.log("clicked");
        socket.emit("new-user-joined", "shubham", (d) => {
          console.log("res", d);
        });
      }}
    >
      Socket Hai Na Meri Jaan
    </button>
  );
}

export default SocketTest;
