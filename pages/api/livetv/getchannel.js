import axios from "axios";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jquery = require("jquery");
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {
  // No-op to skip console errors.
});

let jiotvhost = "https://tv.googledrivelinks.com";
// let jiotvhost = "https://tv.personalpc.ml";

import nc from "next-connect";

var extraChannels = {
  Star_Plus_HD: "https://hls5092709.r-cdn.com/trn_61805/4603/playlist.m3u8",
  // Star_Plus_HD: "https://hls5092709.r-cdn.com/trn_61805/4603/playlist.m3u8",
  // Star_Plus_HD:
  //   "http://144.217.70.181:9587/hin2/STARPLUSUK/tracks-v1a1/mono.m3u8?token=test",
  Star_Sports_3:
    "https://movizz-web.vercel.app/api/livetv/sportschannels/star1in/stream.m3u8",
  Star_Sports_HD_1:
    "https://movizz-web.vercel.app/api/livetv/sportschannels/star1in/stream.m3u8",
  Star_Bharat_HD:
    "http://watchindia.net:8880/live/dharmend/PTukavDWzh/780.m3u8",
  Star_Bharat:
    "http://144.217.70.181:9587/hin2/STARBHARATUK/playlist.m3u8?token=test",
  Star_Gold_HD:
    "http://144.217.70.181:9587/hin2/STARGOLDUK/tracks-v1a1/mono.m3u8?token=test",
  Star_Gold_Select: "https://hls5092709.r-cdn.com/trn_61805/4607/playlist.m3u8",
  Star_Gold_Select_HD:
    "http://watchindia.net:8880/live/dharmend/PTukavDWzh/785.m3u8",
};

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
      let { key, p } = req.body;

      if (p && p == "web") {
        jiotvhost = "https://secure.movizzlive.tk";
      }

      //   let host = "https://snehiptv.netlify.app";
      try {
        if (key.includes("anycric-")) {
          let host = "https://movizz-web.vercel.app/api/livetv/sportschannels/";

          res.send({
            status: true,
            forward: true,
            stream: `${host}anycric/${key
              .split("anycric-")[1]
              .trim()}/stream.m3u8`,
          });
        } else if (Object.keys(extraChannels).includes(key)) {
          res.send({
            status: true,
            forward: true,
            stream: extraChannels[key],
          });
        } else if (key.includes("server2")) {
          let channelServer2 = (
            await axios.post(
              `${process.env.HOST_URL}/api/livetv/server2/channels/getChannel`,
              {
                slug: key.split("maal")[0].replace("server2", "").trim(),
                token: key.split("maal")[1].trim(),
              }
            )
          ).data;

          res.send({
            status: true,
            forward: true,
            stream: channelServer2.stream,
          });
        } else if (key.includes("allrounderindex")) {
          let ChannelData = (
            await axios.get(
              "https://is9dx8po0ye6bv9allrounder.bluestar.live/api/channel/by/filtres/0/0/0/4F5A9C3D9A86FA54EACEDDD635185/d506abfd-9fe2-4b71-b979-feff21bcad13/"
            )
          ).data;

          res.send({
            status: true,
            forward: false,
            stream: ChannelData[url.split(":")[1]].sources[0].url,
          });
        } else {
          // let { data, request } = await axios.get(
          //   jiotvhost + "/play.php?c=" + key
          // );

          // const dom = new JSDOM(data, { virtualConsole });
          // const $ = jquery(dom.window);

          // let src = $("source").attr("src").replace(/\n/g, "");

          // let host = request.res.req.protocol + "//" + request.res.req.host;

          // let stream = src.includes("http") ? src : host + "/" + src;
          let stream = `${jiotvhost}/autoq.php?c=${key}`;

          let forward = true;
          // let forward = stream.includes("personalpc") ? true : false;

          res.send({ status: true, forward, stream });
        }

        // console.log(stream);

        // if(!src.includes("http"))

        // await $("source").each(async (index, el) => {
        //   console.log(index);

        //   //   console.log(index, $(el).attr("src"));

        //   console.log($(el).attr("src"));

        //   //   let src = $(el).attr("src");

        //   //   if (src && src.includes("js/main")) {
        //   //     let target = host + $(el).attr("src");

        //   //     let main = (await axios.get(target)).data;

        //   //     let channels = JSON.parse(
        //   //       main.split("JSON.parse('")[1].split("')")[0].trim()
        //   //     );

        //   //     // console.log(channels);

        //   //     if (channels.length > 0) {
        //   //       res.send({ status: true, channels });
        //   //     } else {
        //   //       res.send({ status: false });
        //   //     }
        //   //   }
        // });

        // if (typeof url != "undefined") {
        //   var r = await getVerseHolly(url, tit);
        // } else {
        // }

        // return r;
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

// async function getTitle(imdb) {
//   try {
//     let {
//       data: { d },
//     } = await axios.get(
//       `https://v3.sg.media-imdb.com/suggestion/x/${imdb}.json`
//     );

//     return d[0].l;
//   } catch (e) {
//     console.log(e);
//     res.send({ streamable: false });
//   }
// }

async function getList(name, hostURL, tit) {
  //   console.log("hiii");
  let host = "https://snehiptv.netlify.app";
  try {
    let { data } = await axios.get(host);

    const dom = new JSDOM(data, { virtualConsole });
    const $ = jquery(dom.window);

    // console.log(data);

    await $("script").each(async (index, el) => {
      //   console.log(data);

      //   console.log(index, $(el).attr("src"));

      let src = $(el).attr("src");

      if (src && src.includes("js/main")) {
        let target = host + $(el).attr("src");

        let main = (await axios.get(target)).data;

        let channels = JSON.parse(
          main.split("JSON.parse('")[1].split("')")[0].trim()
        );

        // console.log(channels);

        return channels;
      }
    });

    // if (typeof url != "undefined") {
    //   var r = await getVerseHolly(url, tit);
    // } else {
    // }

    // return r;
  } catch (e) {
    console.log(e);
  }
}

// async function getVerseHolly(url, tit) {
//   try {
//     let { data } = await axios.get(url);

//     const dom = new JSDOM(data, { virtualConsole });
//     const $ = jquery(dom.window);

//     let links = [];
//     let qualities = [];
//     let types = [];
//     let newoobb = {};
//     Array.from(dom.window.document.querySelectorAll("a")).forEach((el) => {
//       if (el.href.includes("archives")) {
//         links.push(el.href);
//         var qual = $(el.parentElement.previousElementSibling)
//           .text()
//           .toUpperCase()
//           .match(/\d{3,4}[P]/)[0];
//         qualities.push(qual);
//         types.push(
//           $(el.parentElement.previousElementSibling)
//             .text()
//             .split(/\d{3,4}[p]/)[0]
//             .split(tit)[1]
//             .replace(/[(]\d{4}[)]/, "")
//             .trim()
//         );
//       }
//     });

//     // $("div[style='text-align: center;']")
//     //   .children()
//     //   .each((ind, el) => {
//     //     if ($(el).text().includes("Download Links")) {
//     //       links.push($(el).children("a").attr("href"));
//     //     } else {
//     //       qualities.push($(el).text().split("}")[1].trim().split("p")[0] + "p");
//     //       types.push($(el).text().split("}")[1].split("p")[1].split("[")[0]);
//     //     }
//     //   });

//     var obj = links.map((item) => {
//       return {
//         quality: qualities[links.indexOf(item)],
//         link: item,
//         type: types[links.indexOf(item)],
//       };
//     });
//     return obj;
//   } catch (e) {
//     console.log(e);
//   }
// }
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

// async function getQuality(qualityIndex, linkArray) {
//   let { data } = await axios.get(linkArray[qualityIndex].link);
//   const dom = new JSDOM(data, { virtualConsole });
//   const $ = jquery(dom.window);

//   let gLink = $(".maxbutton-fast-server-gdrive").attr("href");

//   return gLink;
// }
