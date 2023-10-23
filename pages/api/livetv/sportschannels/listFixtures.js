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
      let Response = await getMovie();
      if (Response) {
        res.send({ status: true, data: Response });
      } else {
        res.send({ status: false });
      }
    })();
  } catch (error) {
    // console.log(error);

    res.send({ status: false });
  }
});

export default handler;

async function getMovie(name, hostURL, tit) {
  try {
    let { data } = await axios.get(`https://crichd.tv/live-cricket-streaming`);

    const dom = new JSDOM(data, { virtualConsole });
    const $ = jquery(dom.window);

    let keys = [];

    let fixtures = [];

    let timezones = [];

    let currentTimezone = {};

    $("select")
      .children("option")

      .each((ind, el) => {
        if ($(el).attr("selected") == "selected") {
          currentTimezone = { title: $(el).text(), value: $(el).attr("value") };
        }
        timezones.push({ title: $(el).text(), value: $(el).attr("value") });
      });

    $("table")
      .children("thead")
      .children("tr")
      .children()
      .each((ind, el) => {
        keys.push($(el).text());
      });

    $("table")
      .children("tbody")
      .children("tr")
      .each((i, fixture) => {
        let tmpObj = {};

        $(fixture)
          .children("td")
          .each((index, el) => {
            if (keys[index] != "#") {
              // }else {
              tmpObj[keys[index]] =
                keys[index].includes("#") || keys[index].includes("Sts")
                  ? !$(el).children("img").attr("src").includes("notlive")
                  : keys[index].includes("Live")
                  ? $(el).children("a").attr("href").split("/").reverse()[0]
                  : $(el).text();
              // }
            }
          });

        fixtures.push(tmpObj);
      });

    // console.log(fixtures);

    // console.log(url);

    // if (typeof url != "undefined") {
    //   var r = await getVerseHolly(url, tit);
    // } else {
    // }

    return { currentTimezone, fixtures, timezones };
  } catch (e) {
    console.log("Error", e);
  }
}
