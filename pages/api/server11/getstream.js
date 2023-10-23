import nc from "next-connect";
var jsdomi = require("jsdom");
const { JSDOM } = jsdomi;
const jqreyi = require("jquery");
//AXIOS
var axios = require("axios");
var cloudscraper = require("cloudscraper");

var getmainlinkdood = async (l) => {
  //   var axres = await axios.get().then((d) => d.data);
  var options1 = {
    uri: "https://dood.re/e/" + l,
    headers: {
      "sec-ch-ua":
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "Windows",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": 1,
      //   "user-agent":
      //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
      //   "user-agent":
      //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0",
      //   cookie:
      //     "aff=436; ref_url=; file_id=74983456; lang=1; __cf_bm=FOSccwz8D3lEM_BRjAf51xY2QXR7qIaOtHTcpJE1uw8-1669225806-0-AUg2IAVWwvFgU/LIdr7oU/ZQITvY/jsLFZ7WgtRG25uyZiyn2Er33vAjcahZqipSUKrasM6j3Or+m3AgyCrJgiUitYyK83c8+NIvo/qO9Hre1l2XbBkOn1SxHKPR9hqBXDFKiRJG1oH8l2c9LAgWDec=",
      "User-Agent":
        "Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36",
      "Cache-Control": "private",
      Accept:
        "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
    },
  };

  let data1 = await cloudscraper(options1).catch((error) => console.log(error));
  //   console.log(data1);
  var ltogl =
    "https://dood.re/pass_md5/" +
    JSON.stringify(data1).split("/pass_md5/")[1].split("'")[0];
  var token = data1.split("/pass_md5/")[1].split("'")[0].split("/").pop();
  //   var streamres = await axios
  //     .get(ltogl, {
  //       headers: {
  //         referer: "https://dood.re/e/" + l,
  //         cookie:
  //           "lang=1; __cf_bm=FOSccwz8D3lEM_BRjAf51xY2QXR7qIaOtHTcpJE1uw8-1669225806-0-AUg2IAVWwvFgU/LIdr7oU/ZQITvY/jsLFZ7WgtRG25uyZiyn2Er33vAjcahZqipSUKrasM6j3Or+m3AgyCrJgiUitYyK83c8+NIvo/qO9Hre1l2XbBkOn1SxHKPR9hqBXDFKiRJG1oH8l2c9LAgWDec=",
  //       },
  //     })
  //     .then((d) => d.data);
  var options = {
    uri: ltogl,
    headers: {
      "sec-ch-ua":
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "Windows",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": 1,
      //   "user-agent":
      //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
      //   "user-agent":
      //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0",
      referer: "https://dood.re/e/" + l,
      cookie:
        "aff=436; ref_url=; file_id=74983456; lang=1; __cf_bm=FOSccwz8D3lEM_BRjAf51xY2QXR7qIaOtHTcpJE1uw8-1669225806-0-AUg2IAVWwvFgU/LIdr7oU/ZQITvY/jsLFZ7WgtRG25uyZiyn2Er33vAjcahZqipSUKrasM6j3Or+m3AgyCrJgiUitYyK83c8+NIvo/qO9Hre1l2XbBkOn1SxHKPR9hqBXDFKiRJG1oH8l2c9LAgWDec=",
      "User-Agent":
        "Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36",
      "Cache-Control": "private",
      Accept:
        "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
    },
  };

  let data = await cloudscraper(options).catch((error) => console.log(error));
  return data + getlinkpart(token);
};

function getlinkpart(token) {
  for (
    var a = "",
      t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      n = t.length,
      o = 0;
    10 > o;
    o++
  )
    a += t.charAt(Math.floor(Math.random() * n));
  return a + `?token=${token}&expiry=` + Date.now();
}

var getmainlinkpkembed = async (l) => {
  var axres = await axios.get(l);
  var hostpath = axres.request.res.req.host;
  var protocol = axres.request.res.req.protocol;
  var host = protocol + "//" + hostpath;
  var func = axres.data
    .split("download_video(")[1]
    .split(")")[0]
    .split(",")
    .map((e) => e.replaceAll("'", ""));
  var url1 = host + download_video(func[0], func[1], func[2]);
  var axres1 = await axios.get(url1).then((d) => d.data);
  var dom = new JSDOM(axres1);
  var $ = jqreyi(dom.window);
  var url;
  [].forEach.call(dom.window.document.querySelectorAll("a"), (el) => {
    if ($(el).text().toLowerCase().includes("download")) {
      url = el.href;
    }
  });
  return url;
};
function download_video(code, mode, hash) {
  return "/dl?op=download_orig&id=" + code + "&mode=" + mode + "&hash=" + hash;
}
var getmainlinkpkemb = async (l) => {
  var axres = await axios.get(l).then((d) => d.data);
  var axx = "||||||" + axres.split("'||||||")[1].split("'.split('|')")[0];
  var naxx = axres.split("'||||||")[0].split(",").reverse().slice(1, 3);
  var naxxd = axres.split("return p}('")[1].split("'||||||")[0].split(",");
  naxxd.pop();
  naxxd.pop();
  naxxd.pop();
  naxxd = naxxd.join("").split("");
  naxxd.pop();
  naxxd = naxxd.join("");
  var d = getpkemblin(naxxd, naxx[1], naxx[0], axx.split("|"));
  return d.split('src:"')[1].split('"')[0];
};

function getpkemblin(p, a, c, k) {
  while (c--)
    if (k[c])
      p = p.replace(new RegExp("\\b" + c.toString(a) + "\\b", "g"), k[c]);
  return p;
}

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get(async (req, res) => {
  try {
    var now = new Date();
    if (req.query.l) {
      try {
        var url;
        if (req.query.l.includes("dood")) {
          url = await getmainlinkdood(req.query.l);
        } else if (req.query.l.includes("pkembed")) {
          var url1 = await getmainlinkpkemb(req.query.l);
          var url2 = await getmainlinkpkembed(req.query.l);
          var url = [url1, url2];
        } else {
          res.send({ streamable: false });
        }
        var now = new Date() - now;
        res.send({ streamable: true, url, timeTaken: now });
      } catch (error) {
        console.log(error);
        res.send({ streamable: false });
      }
    } else {
      res.send("error");
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
    res.send(dat);
  }
});

export default handler;
