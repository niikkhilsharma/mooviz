import nc from "next-connect";
var jsdomi = require("jsdom");
const { JSDOM } = jsdomi;
const jqreyi = require("jquery");
//AXIOS
var axios = require("axios");
import { decrypthex } from "../../lib/encryption/encryption";

import verifyToken from "../../lib/jsonWebToken/verifytoken";
import verifyAuth from "../../lib/socket/socketAuth";
async function aws(imdbid, AwsIndStreamDomain) {
  const IndStreamPlayerConfigs = {
    width: 610,
    height: 370,
    id: "IndStreamPlayer",
    src: imdbid,
    tr: false,
  };
  // const AwsIndStreamDomain = process.env.AWS_BASE_URL;
  const AwsIndStreamIframeParamTr =
    IndStreamPlayerConfigs.tr !== false && IndStreamPlayerConfigs.tr > 0
      ? "?tr=" + parseInt(IndStreamPlayerConfigs.tr)
      : "";
  //   const AwsIndStreamPlayerIframe = document.createElement("iframe");
  const AwsIndStreamIframeID = btoa(
    IndStreamPlayerConfigs.src + "-" + new Date().getTime()
  );
  var Urlpb = `${AwsIndStreamDomain}/pb/${AwsIndStreamIframeID}${AwsIndStreamIframeParamTr}`;
  // var Urlplay = `${AwsIndStreamDomain}/play/${IndStreamPlayerConfigs.src}${AwsIndStreamIframeParamTr}`;
  return { Urlpb };
  var initIndStreamPlayer = false;
}

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET"
    );
    if (req.method == "OPTIONS") {
      res.setHeader(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  })
  .use(verifyToken)
  .use(verifyAuth)
  .get((req, res) => {
    (async () => {
      // var { data } = await axios.get("https://awsind.site/player.js");
      // data = data.split("AwsIndStreamDomain")[1].split("'")[1].trim();
      let { data } = await axios.get(
        `https://streamappsindia.com/rest-api/v130/single_details?type=movie&id=242`,
        {
          headers: {
            Authorization: "Basic YWRtaW46MTIzNA==",
            "Api-Key": "6c923821c08024a",
          },
        }
      );
      data = data.videos[0].file_url.includes("tt")
        ? "https://" + data.videos[0].file_url.split("/")[2]
        : data.videos.forEach((element) => {
            if (el.file_url.includes("tt")) {
              data = "https://" + element.file_url.split("/")[2];
            }
          });
      var prevtimenew = new Date().getTime();
      req.query.imdb = JSON.parse(
        decrypthex(
          JSON.parse(atob(req.query.imdb))[0],
          Buffer.from(JSON.parse(atob(req.query.imdb))[1])
        )
      );
      if (req.query.imdb) {
        var allurls = await aws(req.query.imdb, data);
        try {
          var datar = await axios.get(allurls.Urlpb, {
            headers: { referer: "https://allmovieshub.site/" },
          });
          if (datar?.data.includes("Video Not Found !")) {
            res.status(200).json({
              streamable: false,
              data: "Data For Given Id Will Be Uploaded Very Soon!! ",
            });
          } else {
            // const dom = new JSDOM(data?.data);
            // const $ = jqreyi(dom.window);
            var matchX = null;
            // var matchXY = $("html").find("script").last().text();

            if (datar?.data.includes("let playerConfigs =")) {
              matchX = datar?.data
                .split("let playerConfigs =")[1]
                .trim()
                .split(";")[0]
                .trim();
            } else {
              matchX = datar?.data
                .split("new HDVBPlayer(")[1]
                .trim()
                .split(");")[0]
                .trim();
            }
            if (matchX) {
              var alldata = JSON.parse(matchX);
              var nowaxi = await axios.get(data + alldata.file, {
                headers: {
                  "x-csrf-token": alldata.key,
                  referer: allurls.Urlpb,
                },
              });
              res.status(200).json({
                status: 200,
                streamable: true,
                data: nowaxi?.data,
                key: alldata.key,
                referer: allurls.Urlpb,
                time: new Date().getTime() - prevtimenew,
              });
            }
          }
        } catch (error) {
          console.log(error);
          const dat = `
          <style type='text/css'>
          @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&family=Roboto:wght@100;300&display=swap");
          :root {
            --button: #b3b3b3;
                --button-color: #0a0a0a;
                --shadow: #000;
                --bg: #737373;
                --header: #7a7a7a;
                --color: #fafafa;
                --lit-header: #e6e6e6;
                --speed: 2s;
            }

            * {
                box-sizing: border-box;
                transform-style: preserve-3d;
            }

            @property --swing-x {
                initial-value: 0;
                inherits: false;
                syntax: '<integer>';
            }

            @property --swing-y {
                initial-value: 0;
                inherits: false;
                syntax: '<integer>';
            }

            body {
                min-height: 100vh;
                display: flex;
                font-family: 'Roboto', sans-serif;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: black;
                color: var(--color);
                perspective: 1200px;
            }

            a {
                text-transform: uppercase;
                text-decoration: none;
                background: var(--button);
                color: var(--button-color);
                padding: 1rem 4rem;
                border-radius: 4rem;
                font-size: 0.875rem;
                letter-spacing: 0.05rem;
            }

            p {
                font-weight: 100;
            }

            h1 {
                -webkit-animation: swing var(--speed) infinite alternate ease-in-out;
                animation: swing var(--speed) infinite alternate ease-in-out;
                font-size: clamp(5rem, 40vmin, 20rem);
                font-family: 'Open Sans', sans-serif;
                margin: 0;
                margin-bottom: 1rem;
                letter-spacing: 1rem;
                transform: translate3d(0, 0, 0vmin);
                --x: calc(50% + (var(--swing-x) * 0.5) * 1%);
                background: radial-gradient(var(--lit-header), var(--header) 45%) var(--x) 100%/200% 200%;
                -webkit-background-clip: text;
                color: transparent;
            }

            h1:after {
                -webkit-animation: swing var(--speed) infinite alternate ease-in-out;
                animation: swing var(--speed) infinite alternate ease-in-out;
                content: "404";
                position: absolute;
                top: 0;
                left: 0;
                color: var(--shadow);
                filter: blur(1.5vmin);
                transform: scale(1.05) translate3d(0, 12%, -10vmin) translate(calc((var(--swing-x, 0) * 0.05) * 1%), calc((var(--swing-y) * 0.05) * 1%));
            }

            .cloak {
                animation: swing var(--speed) infinite alternate-reverse ease-in-out;
                height: 100%;
                width: 100%;
                transform-origin: 50% 30%;
                transform: rotate(calc(var(--swing-x) * -0.25deg));
                background: radial-gradient(40% 40% at 50% 42%, transparent, #000 35%);
            }

            .cloak__wrapper {
                position: fixed;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                overflow: hidden;
            }

            .cloak__container {
                height: 250vmax;
                width: 250vmax;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .info {
                text-align: center;
                line-height: 1.5;
                max-width: clamp(16rem, 90vmin, 25rem);
            }

            .info>p {
                margin-bottom: 3rem;
            }

            @-webkit-keyframes swing {
                0% {
                    --swing-x: -100;
                    --swing-y: -100;
                }

                50% {
                    --swing-y: 0;
                }

                100% {
                    --swing-y: -100;
                    --swing-x: 100;
                }
            }

            @keyframes swing {
                0% {
                    --swing-x: -100;
                    --swing-y: -100;
                }

                50% {
                    --swing-y: 0;
                }

                100% {
                    --swing-y: -100;
                    --swing-x: 100;
                }
            }
        </style>
              <h1>404</h1>
              <div class="cloak__wrapper">
                <div class="cloak__container">
                  <div class="cloak"></div>
                </div>
              </div>
              <div class="info">
                <h2>We can't find that page</h2>
                <p>We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's behalf.</p><a href="/" rel="noreferrer noopener">Home</a>
              </div>`;
          if (error.response?.data.includes("Video Not Found !")) {
            res.status(200).json({
              streamable: false,
              data: "Data For Given Id Will Be Soon Uploaded!",
              time: new Date().getTime() - prevtimenew,
            });
          } else {
            res.send(dat);
          }
        }
      }
      // }
    })();
  })
  .post((req, res) => {
    (async () => {
      req.query.imdb = JSON.parse(
        decrypthex(
          JSON.parse(atob(req.query.imdb))[0],
          Buffer.from(JSON.parse(atob(req.query.imdb))[1])
        )
      );
      console.log(req.query.imdb);
      if (req.query.f) {
        (async () => {
          if (req.body.key) {
            var nowaxi = await axios.get(
              `${process.env.AWS_BASE_URL.trim()}` +
                "/playlist/" +
                String(req.body.file).substring(0).concat(".txt"),
              {
                headers: {
                  "x-csrf-token": req.body.key,
                  referer: req.body.referer,
                },
              }
            );
            res.status(200).json({ status: 200, data: nowaxi.data });
          }
        })();
      } else {
        var prevtimenew = new Date().getTime();
        if (req.query.imdb) {
          var allurls = aws(req.query.imdb);
          try {
            var data = await axios.get(allurls.Urlpb, {
              headers: { referer: "https://allmovieshub.site/" },
            });
            res.status(200).json({
              time: `${new Date().getTime() - prevtimenew} ms`,
              streamable: true,
            });
            // console.log);
          } catch (error) {
            res.status(200).json({
              time: new Date().getTime() - prevtimenew,
              streamable: true,
            });
            // console.log(new Date().getTime());
          }
        }
      }
    })();
  });
export default handler;
