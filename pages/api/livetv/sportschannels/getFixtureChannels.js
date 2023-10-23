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

      let host = "https://crichd.tv/";
      try {
        // if (url.includes("starplushdstream")) {
        //   res.send({
        //     status: true,
        //     forward: true,
        //     stream:
        //       "http://144.217.70.181:9587/hin2/STARPLUSUK/tracks-v1a1/mono.m3u8?token=test",
        //   });
        // } else if (url.includes("allrounderindex")) {
        //   let ChannelData = (
        //     await axios.get(
        //       "https://is9dx8po0ye6bv9allrounder.bluestar.live/api/channel/by/filtres/0/0/0/4F5A9C3D9A86FA54EACEDDD635185/d506abfd-9fe2-4b71-b979-feff21bcad13/"
        //     )
        //   ).data;

        //   res.send({
        //     status: true,
        //     forward: false,
        //     stream: ChannelData[url.split(":")[1]].sources[0].url,
        //   });
        // } else {
        let { data } = await axios.get(`${host}${slug}`);

        // console.log(data);

        const dom = new JSDOM(data, { virtualConsole });
        const $ = jquery(dom.window);

        let channels = [];
        $("script").each((i, e) => {
          if ($(e).text().includes("<iframe")) {
            let jstext = $(e).text();

            let mainData = jstext
              .split("$")[0]
              .split("titles = new Array();")[1];

            // console.log(mainData);

            let iframes = [];
            let titles = [];
            // let channels = [];

            // iframes = mainData
            //   .split('iframe src="')
            //   .slice(1)
            //   .map(
            //     (item) =>
            //       item.split('"')[0].split("/").reverse()[0].split(".")[0]
            //   );

            mainData
              .split(";")
              .reverse()
              .slice(1)
              .reverse()
              .map((item) => {
                // return {
                if (item.includes("iframe src=")) {
                  iframes.push(
                    item
                      .split('iframe src="')[1]
                      .split('"')[0]
                      .replace("//", "")
                    //   .split("/")
                    //   .reverse()[0]
                    //   .split(".")[0]
                  );

                  //   console.log(iframes);
                } else if (item.includes("titles[")) {
                  titles.push(item.split("] = '")[1].split("'")[0].trim());
                }

                // };
              });

            iframes.map((item, index) => {
              channels.push({
                title: titles[index],
                id: btoa(iframes[index]),
              });
            });

            // .map(
            //   (item) =>
            //     item.split('"')[0].split("/").reverse()[0].split(".")[0]
            // );

            // console.log(channels);

            if (channels.length > 0) {
              res.send({ status: true, channels });
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
  } catch (e) {
    console.log(e);
  }
}
