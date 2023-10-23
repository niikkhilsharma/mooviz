import axios from "axios";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jquery = require("jquery");
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {
  // No-op to skip console errors.
});
import { encrypthex } from "../../../../lib/encryption/encryption";
import { createkey } from "../../../../lib/encryption/encryption";

import nc from "next-connect";

var IMDBIDGLOBAL = "";
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
      const imdb = req.query.imdb;
      IMDBIDGLOBAL = req.query.imdb;
      let hostURL = "nexmovies.xyz";
      let title = await getTitle(imdb);
      // console.log(title);

      let Response = await getMovie(title, hostURL, title);
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

async function getTitle(imdb) {
  try {
    let {
      data: { d },
    } = await axios.get(
      `https://v3.sg.media-imdb.com/suggestion/x/${imdb}.json`
    );

    return d[0].l;
  } catch (e) {
    console.log(e);
    res.send({ streamable: false });
  }
}

async function getMovie(name, hostURL, tit) {
  try {
    let { data } = await axios.get(
      `https://${hostURL}/wp-admin/admin-ajax.php?action=mts_search&q=${name}`
    );

    const dom = new JSDOM(data, { virtualConsole });
    const $ = jquery(dom.window);

    let url = $("ul").children("li").first().children("a").attr("href");

    if (typeof url != "undefined") {
      var r = await getVerseHolly(url, tit);
    } else {
    }

    return r;
  } catch (e) {
    console.log("Error");
  }
}

async function getVerseHolly(url, tit) {
  try {
    let { data } = await axios.get(url);

    const dom = new JSDOM(data, { virtualConsole });
    const $ = jquery(dom.window);

    let links = [];
    let qualities = [];
    let types = [];
    let newoobb = {};
    Array.from(dom.window.document.querySelectorAll("a")).forEach((el) => {
      if (el.href.includes("archives")) {
        links.push(el.href);
        var qual = $(el.parentElement.previousElementSibling)
          .text()
          .toUpperCase()
          .match(/\d{3,4}[P]/)[0];
        qualities.push(qual);
        types.push(
          $(el.parentElement.previousElementSibling)
            .text()
            .split(/\d{3,4}[p]/)[0]
            .split(tit)[1]
            .replace(/[(]\d{4}[)]/, "")
            .trim()
        );
      }
    });

    // $("div[style='text-align: center;']")
    //   .children()
    //   .each((ind, el) => {
    //     if ($(el).text().includes("Download Links")) {
    //       links.push($(el).children("a").attr("href"));
    //     } else {
    //       qualities.push($(el).text().split("}")[1].trim().split("p")[0] + "p");
    //       types.push($(el).text().split("}")[1].split("p")[1].split("[")[0]);
    //     }
    //   });
    var obj = links.map((item) => {
      return {
        quality: qualities[links.indexOf(item)],
        type: types[links.indexOf(item)],
        key: btoa(
          JSON.stringify(
            encrypthex(
              JSON.stringify({
                quality: qualities[links.indexOf(item)],
                link: item,
                type: types[links.indexOf(item)],
                IMDB: IMDBIDGLOBAL,
              }),
              createkey(process.env.SecretCipherKey)
            )
          )
        ),
      };
    });
    return obj;
  } catch (e) {
    console.log(e);
  }
}
// async function getVerseHolly(url) {
//   try {
//     let { data } = await axios.get(url);

//     const dom = new JSDOM(data, { virtualConsole });
//     const $ = jquery(dom.window);

//     let links = [];
//     let qualities = [];
//     let types = [];
//     console.log($("div[style='text-align: center;']"));

//     $("div[style='text-align: center;']")
//       .children()
//       .each((ind, el) => {
//         if ($(el).text().includes("Download Links")) {
//           links.push($(el).children("a").attr("href"));
//         } else {
//           qualities.push($(el).text().split("}")[1].trim().split("p")[0] + "p");
//           types.push($(el).text().split("}")[1].split("p")[1].split("[")[0]);
//         }
//       });

//     let obj = qualities.map((item) => {
//       return {
//         quality: item,
//         link: links[qualities.indexOf(item)],
//         type: types[qualities.indexOf(item)],
//       };
//     });

//     return obj;
//   } catch (e) {
//     console.log("Error");
//   }
// }

async function getQuality(qualityIndex, linkArray) {
  let { data } = await axios.get(linkArray[qualityIndex].link);
  const dom = new JSDOM(data, { virtualConsole });
  const $ = jquery(dom.window);

  let gLink = $(".maxbutton-fast-server-gdrive").attr("href");

  return gLink;
}
