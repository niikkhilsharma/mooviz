import nc from "next-connect";
//AXIOS
var axios = require("axios");

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get((req, res) => {
  try {
    res.send({
      status: "ok",
    });
  } catch (error) {
    res.send(error);
  }
});
export default handler;
