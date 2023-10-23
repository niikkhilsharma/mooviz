import nc from "next-connect";
var axios = require("axios");
const { JSDOM } = require("jsdom");
const jquery = require("jquery");
import { decrypthex, encrypthex } from "../../../lib/encryption/encryption";
import verifyToken from "../../../lib/jsonWebToken/verifytoken";
import verifyAuth from "../../../lib/socket/socketAuth";
import movieAvailable from "../../../lib/database/models/movieAvailable";
import userPreference from "../../../lib/database/models/userPreference";

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
      var duration = req.body.duration;
      var userID = req.user;
      var dbresuser = await userPreference.findOne({
        userID: userID,
      });
      if (!dbresuser) {
        var tosave = new userPreference({
          userID: req.user,
          DurationOfMediaWatched: [
            {
              IMDB: imdbID,
              type: req.body.type,
              duration,
            },
          ],
        });
        await tosave.save();
        res.send({ success: true, msg: "successfully updated" });
        return;
      }
      var dbres = await userPreference.findOne({
        userID: userID,
        "DurationOfMediaWatched.IMDB": imdbID,
      });
      if (dbres?.DurationOfMediaWatched) {
        var dbres = await userPreference.findOneAndUpdate(
          {
            userID: userID,
            "DurationOfMediaWatched.IMDB": imdbID,
          },
          { "DurationOfMediaWatched.$.duration": duration }
        );
        res.send({ success: true, msg: "successfully updated" });
      } else {
        var dbres = await userPreference.findOneAndUpdate(
          { userID: req.user },
          {
            $push: {
              DurationOfMediaWatched: {
                IMDB: imdbID,
                type: req.body.type,
                duration,
              },
            },
          }
        );
        res.send({ success: true, msg: "successfully updated" });
      }
    } catch (error) {
      console.log(error);
      res.send({ success: false, msg: "update failed" });
    }
  });

export default handler;
