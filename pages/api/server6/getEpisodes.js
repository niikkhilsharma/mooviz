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

      let Response = await getEpisodes(link);

      if (Response) {
        res.send({ streamable: true, data: Response });
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

async function getEpisodes(link) {
  try {
    let Episodes = [];
    let { data } = await axios.get(
      `https://cors-anywhere-c1ph.onrender.com/${link}`,
      {
        headers: {
          origin: "null",
          cookie:
            "__cf_bm=5pAAAngUjwWsH7lgSKyXnswysvdvQ34r0kUpTO.SoaQ-1664293855-0-AUiBkeOsXA5Mh3hTtPTErSMpX01L/rQ1VbDj/u2Qdi5MBOppx2TgtNikOjnSEkcJRXRPCWxg/vqAYRMtJ30FzjBRn9syRlgNvFY5ETRHExc3oy9D4PySXi+WjQjWRDheQg==",
        },
      }
    );
    const dom = new JSDOM(data, { virtualConsole });
    const $ = jquery(dom.window);

    $("h3").each((inde, el) => {
      if ($(el).text().toLowerCase().includes("episode")) {
        Episodes.push({
          episode: $(el).text().trim(),
          link: $(el).children("a").attr("href"),
        });
      }
    });

    // if (typeof gLink != "undefined") {
    //   return gLink;

    return Episodes;
    // }
  } catch (e) {
    console.log(e);
  }
}
