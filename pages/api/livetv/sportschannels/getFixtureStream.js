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
  try {
    (async () => {
      let { slug } = req.body;

      let availableChannels = [
        "asportshd",
        "bbtespn",
        "bbtsp1",
        "bbtsp2",
        "bbtsp3",
        "fox501",
        "movizzcricket",
        "ptvpk",
        "skyscric",
        "star1in",
        "starhindi",
        "supercricket",
        "willowusa",
      ];

      let host = "https://movizz-web.vercel.app/api/livetv/sportschannels/";
      try {
        let { data } = await axios.get(`https://${atob(slug)}`);

        // console.log(data);

        const dom = new JSDOM(data, { virtualConsole });
        const $ = jquery(dom.window);

        // let channels = [];
        $("script").each((i, e) => {
          if ($(e).text().includes("fid=")) {
            let cid = $(e).text().split('fid="')[1].split('"')[0];

            if (availableChannels.includes(cid)) {
              res.send({
                streamable: true,
                stream: `${host}${cid}/stream.m3u8`,
              });
            } else {
              let stream = `${host}anycric/${cid}/stream.m3u8`;
              res.send({
                streamable: true,
                stream,
              });

              //   console.log(stream);
            }
          }
        });

        // console.log(channels);

        // let src = $("source").attr("src").replace(/\n/g, "");

        // let host = request.res.req.protocol + "//" + request.res.req.host;

        // let stream = src.includes("http") ? src : host + "/" + src;

        // let forward = stream.includes("googledrivelinks") ? true : false;

        // res.send({ status: true, forward, stream });
        // }
      } catch (e) {
        console.log(e);
        res.send({ status: false });
      }
    })();
  } catch (error) {
    // console.log(error);

    res.send({ streamable: false });
  }
});

export default handler;
