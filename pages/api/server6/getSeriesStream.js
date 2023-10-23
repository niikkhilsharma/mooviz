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
      const episode = req.query.e;

      const link = req.query.link;

      let Response = await getStream(link, episode);

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

async function getStream(link, episode) {
  try {
    let { data } = await axios.get(
      `${process.env.HOST_URL}/api/server6/getEpisodes?link=${link}`
    );

    console.log(
      `${process.env.HOST_URL}/api/server6/getStream?l=${
        data.data[
          data.data.map((item) => item.episode).indexOf(`Episode ${episode}`)
        ].link
      }`
    );

    let streamLink = (
      await axios.get(
        `${process.env.HOST_URL}/api/server6/getStream?l=${
          data.data[
            data.data.map((item) => item.episode).indexOf(`Episode ${episode}`)
          ].link
        }`,
        { timeout: 50000 }
      )
    ).data;

    console.log(streamLink);

    if (typeof streamLink != "undefined") {
      return streamLink;
    }
  } catch (e) {
    console.log(e);
  }
}
