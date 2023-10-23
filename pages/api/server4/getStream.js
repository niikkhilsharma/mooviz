//Based on https://hdmovies4u.pics  get data with imdb id

import nc from "next-connect";
var axios = require("axios");
const { JSDOM } = require("jsdom");
const jquery = require("jquery");
import { decrypthex } from "../../../lib/encryption/encryption";
import verifyToken from "../../../lib/jsonWebToken/verifytoken";
import verifyAuth from "../../../lib/socket/socketAuth";

var maindomurl = "";
var getmaindomurl = async () => {
  // try {
  //   await axios.get("https://hdmovie2.rip");
  //   maindomurl = "hdmovie2.rip";
  // } catch (error) {
  var d = await axios.get(
    "https://cors-anywhere-c1ph.onrender.com/https://hdmovie2.rip",
    {
      headers: {
        origin: "null",
      },
    }
  );
  maindomurl = d.headers["x-final-url"].split("/")[2];
  // }
};

const handler = nc({
  onError: (err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(verifyToken)
  .use(verifyAuth)
  .get((req, res) => {
    try {
      (async () => {
        await getmaindomurl();
        const imdbID = JSON.parse(
          decrypthex(
            JSON.parse(atob(req.query.imdb))[0],
            Buffer.from(JSON.parse(atob(req.query.imdb))[1])
          )
        );

        if (imdbID != null) {
          // let isWebseries = currentdat.Genre.includes("TV Shows Web Series");
          // console.log();

          let movie = (
            await axios.get(
              `https://v3.sg.media-imdb.com/suggestion/x/${imdbID}.json`
            )
          ).data.d;

          if (movie.length > 0) {
            let title = movie[0].l;
            let year = movie[0].y;

            let postIDs = (
              await axios.get(
                `https://${maindomurl}/wp-json/dooplay/search/?keyword=${title} ${year}&nonce=673e7a7e54`,
                {
                  followRedirects: true,
                  maxRedirects: 5,
                }
              )
            ).data;

            if (!Object.keys(postIDs).includes("error")) {
              let postID = Object.keys(postIDs)[0];

              let vidId = await getVidID(postID, "2", "movie");

              if (typeof vidId != "undefined") {
                let source = await getSource(vidId);

                if (typeof source.vidSource != "undefined") {
                  res.send({ source, streamable: true });
                } else {
                  res.send({ streamable: false });
                }
              } else {
                res.send({ streamable: false });
              }
            } else {
              res.send({ streamable: false });
            }
          } else {
            res.send({ streamable: false });
          }

          // console.log(title);

          // var lists = await getList(imdbID);

          // tmdbData = { ...tmdbData, ...tmdbData2 };
        } else {
          res.send({ streamable: false });
        }
      })();
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
      res.send({ streamable: false });
    }
  });

async function getVidID(postID, nume, type) {
  try {
    var options = {
      method: "POST",
      url: `https://${maindomurl}/wp-admin/admin-ajax.php`,
      headers: {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },

      followRedirects: true,
      maxRedirects: 5,

      data: `action=doo_player_ajax&post=${postID}&nume=${nume}&type=${type}`,
    };

    let { data } = await axios(options);
    // console.log(data);
    return (
      data.embed_url.split('"')[1].split("video/")[1] ||
      data.embed_url.split('"')[1].split("data=")[1]
    );
  } catch (e) {
    return "error";
  }
}

async function getSource(vidId) {
  try {
    let Sources = await axios(
      `https://gmplayer.xyz/player/index.php?data=${vidId}&do=getVideo`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          Referer:
            "https://gmplayer.xyz/video/fc95fa5740ba01a870cfa52f671fe1e4",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: `hash=fc95fa5740ba01a870cfa52f671fe1e4&r=https%3A%2F%2F${maindomurl}%2F`,
        method: "POST",
      }
    );

    let securedLink = Sources.data.securedLink;
    let vidSource = Sources.data.videoSource;

    return { securedLink, vidSource };
  } catch (e) {
    return "error";
  }
  //   console.log(Res);
}

export default handler;
