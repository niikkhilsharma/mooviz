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
}).post((req, res) => {
  (async () => {
    try {
      let { url } = req.body;

      let { data } = await axios.get(url);

      //   console.log(streams);
      let src;

      //   if (src.includes("fastdl.in/download")) {
      try {
        await axios.get(url, { maxRedirects: 0 });
      } catch (e) {
        // console.log(e.response.headers.location);
        if (
          typeof e.response.headers.location == "string" &&
          e.response.headers.location.includes("http")
        ) {
          src = e.response.headers.location;
        }
      }
      // }

      res.send({ streamable: true, stream: src });
    } catch (error) {
      res.send({ streamable: false });
      // console.log(error);

      // res.send({ streamable: false });
    }
  })();
});

export default handler;
