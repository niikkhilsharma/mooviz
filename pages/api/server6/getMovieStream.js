const axios = require("axios");
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
      const link = req.query.link;

      let Response = await getStream(link);

      if (Response) {
        res.send(Response);
      } else {
        res.send({ streamable: false });
      }
    })();
  } catch (error) {
    // console.log(error);
    res.send({ streamable: false });
  }
});

export default handler;

async function getStream(link) {
  try {
    let { data } = (
      await axios.get(`${process.env.HOST_URL}/api/server6/getUrl?link=${link}`)
    ).data;

    // console.log(data);

    let streamLink = (
      await axios.get(
        `${process.env.HOST_URL}/api/server6/getStream?l=${data}`,
        { timeout: 50000 }
      )
    ).data;

    // console.log(streamLink);

    if (typeof streamLink != "undefined") {
      return streamLink;
    }
  } catch (e) {
    console.log(e);
  }
}
