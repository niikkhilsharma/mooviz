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
  (async () => {
    try {
      let { data } = await axios.get(
        `https://www.live4wap.click/page-cat/3/Highlights.html`
      );

      const dom = new JSDOM(data, { virtualConsole });
      const $ = jquery(dom.window);

      let tmparray = [];

      $("section")
        .children("div")
        .each((index, el) => {
          let poster = $(el).children("figure").children("img").attr("src");
          let title = $(el)
            .children("figure")
            .children("figcaption")
            .children("a")
            .text();

          let lang = $(el)
            .children("figure")
            .children("figcaption")
            .children(".lang")
            .text();

          let ref = $(el)
            .children("figure")
            .children("figcaption")
            .children("a")
            .attr("href");

          tmparray.push({ id: Math.random(), title, lang, poster, ref });

          // console.log({ image, title, lang, ref });
          // $(el)
          //   .children()
          //   .each((i, e) => {
          //     console.log($(e).children().text());
          //   });
        });

      res.send({ status: true, hlts: tmparray });

      // console.log(lists);

      // if (typeof url != "undefined") {
      //   var r = await getVerseHolly(url, tit);
      // } else {
      // }

      // return r;'
    } catch (error) {
      res.send({ status: false, hlts: [] });
      // console.log(error);

      // res.send({ status: false });
    }
  })();
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

async function getList(name, hostURL, tit) {}

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
        link: item,
        type: types[links.indexOf(item)],
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
