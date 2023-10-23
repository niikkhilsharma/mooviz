import nc from "next-connect";
var axios = require("axios");
const { JSDOM } = require("jsdom");
const jquery = require("jquery");
const { http, https } = require("follow-redirects");

const handler = nc({
  onError: (err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .get((req, res) => {
    try {
      (async () => {
        const sort = req.query.sort;

        const year = sort == "year" ? req.query.year : null;
        const quality = sort == "quality" ? req.query.quality : null;
        const genre = sort == "genre" ? req.query.genre : null;
        const provider = sort == "provider" ? req.query.provider : null;
        let page = req.query.page || 1;
        const type = req.query.type;
        const wood = req.query.wood;
        const collection = req.query.collection;
        let imdbID = null;
        let tmdbID = null;
        let isWebseries = false;
        let targetUrl = "https://allmovieshub.site/";

        if (wood == "holly") {
          if (sort == "quality") {
            if (type == "movie") {
              targetUrl = `https://allmovieshub.site/${quality}-movies/`;
            } else {
              targetUrl = `https://allmovieshub.site/${quality}-series/`;
            }
          } else if (sort == "genre") {
            targetUrl = `https://allmovieshub.site/${genre}/`;
          } else if (sort == "provider") {
            if (type == "tv") {
              targetUrl = `https://allmovieshub.site/${provider}-series/`;
            }
          } else if (sort == "home") {
            targetUrl = "https://allmovieshub.site/";
          } else if (sort == "year") {
            if (type == "movie") {
              targetUrl = `https://allmovieshub.site/${year}-movies/`;
            } else {
              targetUrl = `https://allmovieshub.site/${year}-series/`;
            }
          }
          targetUrl = `${targetUrl}page/${page}/`;
        } else if (wood == "bolly") {
          if (sort == "home") {
            targetUrl = "https://hdbollyhub.lol/";
          }
          if (sort == "provider") {
            if (type == "tv") {
              targetUrl = `https://extramovies.loan/category/web-series/${
                provider != "all" ? provider : ""
              }/`;
            }
          }

          targetUrl = `${targetUrl}page/${page}/`;
        }

        // targetUrl = `${targetUrl}page/${page}/`;

        let response = await getCollection(targetUrl);

        res.send(response);

        //   console.log(imdb);
        //   var nowobj = new Object();
        //   var workarr = new Array();
        //   $("div[class='mvici-left']")
        //     .children("p")
        //     .each((ind, now) => {
        //       nowobj[$(now).text().split(":")[0].trim()] = $(now)
        //         .text()
        //         .split(":")[1]
        //         .trim();
        //       //   console.log($(now).text(), ind);
        //       if (ind == $("div[class='mvici-left']").children("p").length - 1) {
        //         console.log(workarr);
        //       }
        //     });
        //   var currentdat = await myPromise($, "left");
        //   var currentdat2 = await myPromise($, "right");

        // console.log(tmdbData);
        // tmdbData.type = isWebseries ? "tv" : "movie";
      })();
    } catch (error) {
      //   console.log(error);
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
  })
  .post((req, res) => {
    // console.log("hello");
    if (req.query.key == "itssecret") {
      let resData = {
        wood: ["bolly", "holly"],
        type: ["movie", "tv"],
        sort: ["genre", "quality", "provider", "home"],
        provider: {
          tv: {
            holly: [
              "netflix",
              "amazon-prime-video",
              "amc",
              "cw",
              "dc",
              "dual-audio",
              "english",
              "hindi-dubbed",
              "history",
              "korean-web",
              "marvel-dc",
              "sci-fi",
              "space",
              "web",
              "apple-tv",
            ],
            bolly: ["netflix", "amazon-prime", "zee5", "hotstar", "all"],
          },
        },
        year: ["any year till now ,type is nessacry"],
        quality: ["480p", "720p", "1080p", "300mb", "800mb"],
        genre: ["18-hollywood-movies", "Rest Find it yourself"],
      };
      res.setHeader("Cache-Control", "s-maxage=86400");
      res.send(resData);
    } else {
      res.status(404).end("unautorized request");
    }
  });

async function getCollection(targetUrl) {
  try {
    if (
      targetUrl.includes("allmovieshub") ||
      targetUrl.includes("hdbollyhub")
    ) {
      try {
        await axios.get(targetUrl);
      } catch (error) {
        await axios
          .get(`https://cors-anywhere-c1ph.onrender.com/${targetUrl}`, {
            headers: {
              origin: "null",
            },
          })
          .then((d) => {
            targetUrl = d.headers["x-final-url"];
          });
        // Array.from(dom.window.document.querySelectorAll("div.row.details"))
        //   .slice(-1)[0]
        //   .querySelector("div.cell.url")
        //   .querySelector("a")
        //   .href.split("/")
        //   .splice(0, 3)
        //   .join("/") +
        //   "/" +
        //   targetUrl.split(".")[1].split("/").splice(1).join("/");

        // console.log(targetUrl.split(".")[1].split("/").splice(1).join("/"));
        // });

        // await axios
        //   .post(
        //     "https://wheregoes.com/trace/",
        //     `url=${targetUrl}&ua=Wheregoes.com+Redirect+Checker%2F1.0&phn=&php=15V2hlcmVHb2VzIGhvbmV5cG90IDIwMjItMTEtMTU%3D%3D`,
        //     {
        //       credentials: "omit",
        //       headers: {
        //         "User-Agent":
        //           "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0",
        //         Accept:
        //           "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        //         "Accept-Language": "en-US,en;q=0.5",
        //         "Content-Type": "application/x-www-form-urlencoded",
        //         "Upgrade-Insecure-Requests": "1",
        //         "Sec-Fetch-Dest": "document",
        //         "Sec-Fetch-Mode": "navigate",
        //         "Sec-Fetch-Site": "same-origin",
        //         "Sec-Fetch-User": "?1",
        //       },
        //       referrer: "https://wheregoes.com/trace/20225428470/",
        //       method: "POST",
        //       mode: "cors",
        //     }
        //   )
        //   .then((d) => {
        //     const dom = new JSDOM(d.data);
        // targetUrl =
        //   Array.from(
        //     dom.window.document.querySelectorAll("div.row.details")
        //   )
        //     .slice(-1)[0]
        //     .querySelector("div.cell.url")
        //     .querySelector("a")
        //     .href.split("/")
        //     .splice(0, 3)
        //     .join("/") +
        //   "/" +
        //   targetUrl.split(".")[1].split("/").splice(1).join("/");

        // console.log(targetUrl.split(".")[1].split("/").splice(1).join("/"));
        // });
      }

      let { data } = await axios.get(targetUrl);
      // await fetch(targetUrl)
      //   .then((d) => d.json())
      //   .then((d) => console.log(d))
      //   .catch((e) => console.log(e));

      const dom = new JSDOM(data);
      const $ = jquery(dom.window);
      const allhomelists =
        dom.window.document.getElementsByClassName("blog-grid");
      const arrallhomelists = Array.from(allhomelists);
      var DataArray = [];

      arrallhomelists.forEach((el, inde) => {
        $(el)
          .children()
          .each((index, el) => {
            let tmpData = {};
            let d = $(el)
              .children("div")
              .each((ind, elem) => {
                tmpData.link = $(elem)
                  .children("header")
                  .children("h2")
                  .children("a")
                  .attr("href");

                tmpData.title = titleFormatter(
                  $(elem).children("header").text().trim()
                );
                tmpData.poster = $(elem)
                  .children("div")
                  .children("a")
                  .children("img")
                  .attr("src");

                let created = DataArray.map((item) => item.title);

                if (!created.includes(tmpData.title)) {
                  DataArray.push(tmpData);
                }

                // titleFormatter(tmpData.title);

                // console.log(elem);
                // $(elem).children("header").each((inh2,elh2)=>{
                // console.log(tmpData);
                // })
              });
            // console.log(d);
            // console.log(index, el);
          });
      });

      return DataArray;
    } else if (targetUrl.includes("extramovies")) {
      let { data } = await axios.get(targetUrl);

      const dom = new JSDOM(data);
      const $ = jquery(dom.window);
      const allhomelists = dom.window.document.getElementById("content");
      //   const arrallhomelists = Array.from(allhomelists);
      //   console.log(allhomelists);
      var DataArray = [];
      //   console.log(allhomelists);

      $(allhomelists)
        .children(".imag")
        .each((index, elem) => {
          let tmpData = {};
          tmpData.link = $(elem)
            .children(".thumbnail")
            .children("a")
            .attr("href");
          tmpData.title = titleFormatterExtraMovies(
            $(elem).children(".post").children("h2").children("a").text().trim()
          );

          tmpData.poster = $(elem)
            .children(".thumbnail")
            .children("a")
            .children("img")
            .attr("src")
            .replace("s200", "h1000");

          let created = DataArray.map((item) => item.title);

          if (!created.includes(tmpData.title)) {
            DataArray.push(tmpData);
          }

          //   console.log(tmpData.title);

          // console.log($(el).children("a").html());
          // console.log(index, $(el).children("a").children("img").attr("src"));

          // $(el).each((i, e) => {});

          // $(el)
          //   .children(".thumbn")
          //   .each((ind, elem) => {
          //     // console.log(ind);
          //     tmpData.link = $(elem)
          //       .children("header")
          //       .children("h2")
          //       .children("a")
          //       .attr("href");

          //     tmpData.title = titleFormatter(
          //       $(elem).children("header").text().trim()
          //     );
          //     tmpData.poster = $(elem)
          //       .children("div")
          //       .children("a")
          //       .children("img")
          //       .attr("src");
          //     DataArray.push(tmpData);

          //     titleFormatter(tmpData.title);

          //     // console.log(elem);
          //     // $(elem).children("header").each((inh2,elh2)=>{
          //     // console.log(tmpData);
          //     // })
          //   });
          // console.log(d);
          // console.log(index, el);
        });

      return DataArray;
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
}

function titleFormatter(rawTitle) {
  let splits = [
    "(Part",
    "(2",
    "(1",

    "(Season",
    "Netflix Original",
    "–",
    "Season",
  ];
  let replacements = [
    "Netflix",
    "[18+]",
    "Download",
    "[Appletv+]",
    "Appletv+",
    "AppleTv+",
    "Apple Tv+",
    "Apple",
    "Tv+",
    "TV+",
    "tv+",
    "[]",
    "Amazon Original",
    "{Amazon Prime Video}",
  ];

  let d = rawTitle;

  splits.forEach((item) => {
    d = d.split(item)[0];
  });

  replacements.forEach((item) => {
    d = d.replace(item, "");
  });

  d = d.trim();

  return d;
}

function titleFormatterExtraMovies(rawTitle) {
  let splits = [
    "(Part",
    "(202",
    "(201",
    "(199",
    "(198",
    "(197",
    "(196",
    "(195",
    "202",
    "201",
    "199",
    "198",
    "197",
    "196",
    "195",

    "(Season",
    "Netflix Original",
    "Season",
    "Episode",
  ];
  let replacements = [
    "Netflix",
    "(18+)",
    "[18+]",
    "Download",
    "[Appletv+]",
    "Appletv+",
    "AppleTv+",
    "Apple Tv+",
    "Apple",
    "Tv+",
    "TV+",
    "tv+",
    "[]",
    "Amazon Original",
    "{Amazon Prime Video}",
  ];

  let d = rawTitle;

  splits.forEach((item) => {
    d = d.split(item)[0];
  });

  replacements.forEach((item) => {
    d = d.replace(item, "");
  });

  d = d.trim();

  return d;
}

export default handler;
