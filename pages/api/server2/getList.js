import nc from "next-connect";
var jsdomi = require("jsdom");
const { JSDOM } = jsdomi;
const jqreyi = require("jquery");
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
    (async () => {
      // "Hindi Movie 67mB V2 DVDScr";
      const axres = await axios.get(
        "https://hdmovies50.net/?s=" + req.query.imdb
      );
      const virtualConsole = new jsdomi.VirtualConsole();
      virtualConsole.on("error", () => {
        // No-op to skip console errors.// -=> tt10857160
      });
      const dom = new JSDOM(axres.data, { virtualConsole });
      const $ = jqreyi(dom.window);

      var nowrl = await axios.get(
        `https://v3.sg.media-imdb.com/suggestion/x/${req.query.imdb}.json`
      );
      if (nowrl.data.d[0]) {
        nowrl = nowrl.data.d[0].y;

        var nowarr = [];
        $('section[class="home-wrapper thumbnail-wrapper"]')
          .children()
          .each((inn, dd) => {
            if (
              $(dd).text().trim() &&
              !$(dd).text().trim().toUpperCase().includes("TRAILER") &&
              !$(dd).text().trim().toUpperCase().includes("SONG")
            ) {
              var nowobj = {};
              var qualdat = /\d{3,4}[p]/.test(
                $(dd)
                  .text()
                  .trim()
                  .replaceAll("\n", "")
                  .replaceAll("Download", "")
                  .trim()
                  .split(nowrl)[1]
              )
                ? $(dd)
                    .text()
                    .trim()
                    .replaceAll("\n", "")
                    .replaceAll("Download", "")
                    .trim()
                    .split(nowrl)[1]
                    .match(/\d{3,4}[p]/)[0]
                : $(dd)
                    .text()
                    .trim()
                    .replaceAll("\n", "")
                    .replaceAll("Download", "")
                    .trim()
                    .split(nowrl)[1]
                    ?.split(" ")[
                    $(dd)
                      .text()
                      .trim()
                      .replaceAll("\n", "")
                      .replaceAll("Download", "")
                      .trim()
                      .split(nowrl)[1]
                      .split(" ").length - 1
                  ];
              var nowQUALobj = {};

              var nowtitfix = (tittl) => {
                var tttt = "";
                tittl?.split(" ").forEach((el, ii) => {
                  if (
                    el.toUpperCase().includes("GB") ||
                    el.toUpperCase().includes("MB")
                  ) {
                    tttt = tittl.split(" ").slice(0, ii).join(" ").trim();
                  }
                  return;
                });
                return tttt;
              };
              const tit = /\d{3,4}[p]/.test(
                $(dd)
                  .text()
                  .trim()
                  .replaceAll("\n", "")
                  .replaceAll("Download", "")
                  .trim()
                  .split(nowrl)[1]
                  ?.trim()
              )
                ? $(dd)
                    .text()
                    .trim()
                    .replaceAll("\n", "")
                    .replaceAll("Download", "")
                    .trim()
                    .split(nowrl)[1]
                    .trim()
                    .split(/\d{3,4}[p]/)[0]
                    .trim()
                    .replace(" Dual Audio", "")
                    .trim()
                    .replace("ORG", "")
                    .trim()
                    .replace("Movie", "")
                    .trim()
                : nowtitfix(
                    $(dd)
                      .text()
                      .trim()
                      .replaceAll("\n", "")
                      .replaceAll("Download", "")
                      .trim()
                      .split(nowrl)[1]
                      ?.trim()
                      .split(/\d{3,4}[p]/)[0]
                      .trim()
                      .replace(" Dual Audio", "")
                      .trim()
                      .replace("ORG", "")
                      .trim()
                      .replace("Movie", "")
                      .trim()
                  );
              nowQUALobj[qualdat] = {
                Link: $(dd).find("figure").children("a").attr("href"),
                Title: $(dd)
                  .text()
                  .trim()
                  .replaceAll("\n", "")
                  .replaceAll("Download", "")
                  .trim(),
                Image: $(dd).find("img").attr("src"),
              };
              nowobj[tit] = nowQUALobj;
              var nowtempobj = {};
              nowtempobj[tit] = nowQUALobj;
              var topush = true;
              nowarr.forEach((el, ind) => {
                if (tit == Object.keys(el)[0]) {
                  nowarr[ind][Object.keys(el)[0]] = {
                    ...nowarr[ind][Object.keys(el)[0]],
                    ...nowQUALobj,
                  };
                  topush = false;
                } else {
                  topush = true;
                }
              });
              if (topush) {
                nowarr.push(nowobj);
              }
            }
            if (
              inn ==
              $('section[class="home-wrapper thumbnail-wrapper"]').children()
                .length -
                1
            ) {
              //   var nowobj = new Object();
              //   nowarr.forEach((el, inf) => {
              //     nowobj[Object.keys(el)[0]] = Object.values(el)[0];
              //     if (inf == nowarr.length - 1) {
              //       return;
              //     }
              //   });
              res.json({ streamble: true, data: nowarr });
            }
          });
      } else {
        res.json({ streamable: false, data: [] });
      }
    })();
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

export default handler;
