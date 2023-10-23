import nc from "next-connect";
var axios = require("axios");
const { JSDOM } = require("jsdom");
const jquery = require("jquery");
import { decrypthex, encrypthex } from "../../../lib/encryption/encryption";
import verifyToken from "../../../lib/jsonWebToken/verifytoken";
import verifyAuth from "../../../lib/socket/socketAuth";
import movieAvailable from "../../../lib/database/models/movieAvailable";

const handler = nc({
  onError: (err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(verifyToken)
  .use(verifyAuth)
  .post(async (req, res) => {
    try {
      var imdbID = JSON.parse(
        decrypthex(
          JSON.parse(atob(req.body.imdbID))[0],
          Buffer.from(JSON.parse(atob(req.body.imdbID))[1])
        )
      );
      var server = req.body.server;
      var tosave = new movieAvailable({ IMDB: imdbID, data: server });
      await tosave.save();
      res.send({ success: true, msg: "successfully updated" });
    } catch (error) {
      res.send({ success: false, msg: "update failed" });
    }
  });

export default handler;
