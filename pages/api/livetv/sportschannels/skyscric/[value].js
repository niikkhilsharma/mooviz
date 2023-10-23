import nc from "next-connect";
//AXIOS
var axios = require("axios");
const cors = require("cors");

//Sky Sports Cricket

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(cors())
  .get(async (req, res) => {
    try {
      var host = "https://gocast2.com";
      var options = { headers: { Referer: host } };

      await axios
        .get("https://gocast2.com/crichdws.php?player=desktop&live=skyscric", {
          headers: {
            referer: "https://gocast2.com",
          },
        })
        .then(async ({ data }) => {
          let url = data.split("sourceUrl")[1].trim().split("'")[1].trim();
          // console.log(url);

          await axios
            .get(url, options)
            .then((d) =>
              res.send(
                d.data.replaceAll(
                  "skyscric",
                  url.split("skyscric")[0] + "skyscric"
                )
              )
            );
        });

      // var host = "https://t20cup.lol/";
      // var options = { headers: { Referer: host } };
      // if (req.query.value.includes("stream.")) {
      //   await axios
      //     .get(
      //       "https://epr11.t20cup.lol/hls/token/hkmayodjnu3gjbj78fy79k8/stream.m3u8",
      //       options
      //     )
      //     .then((d) =>
      //       res
      //         .setHeader("content-type", "application/vnd.apple.mpegurl")
      //         .send(d.data)
      //     );
      // } else {
      //   await axios
      //     .get(
      //       "https://epr11.t20cup.lol/hls/token/hkmayodjnu3gjbj78fy79k8/" +
      //         req.query.value,
      //       options
      //     )
      //     .then((d) =>
      //       res.setHeader("content-type", "video/mp2t").send(d.data)
      //     );
      // }
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
      res.send(dat);
    }
  });
export default handler;