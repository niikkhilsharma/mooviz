import axios from "axios";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jquery = require("jquery");
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {
  // No-op to skip console errors.
});

import nc from "next-connect";

const handler = nc({
  onError: (err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get((req, res) => {
  try {
    (async () => {
      try {
        let { type, count } = req.query;

        let { data } = await axios.get(
          `https://apiv2.cricket.com.au/web/views/fixtures?CompletedFixturesCount=12&InProgressFixturesCount=12&UpcomingFixturesCount=12`
        );

        if (type) {
          res.send({ status: true, data: data[type] });
        } else {
          res.send({ status: true, data });
        }
      } catch (e) {
        console.log(e);
        res.send({ status: false });
      }
    })();
  } catch (error) {
    // console.log(error);

    res.send({ status: false });
  }
});

export default handler;
