//Based on https://hdmovies4u.pics  get data with imdb id

import nc from "next-connect";
var axios = require("axios");
const { JSDOM } = require("jsdom");
const jquery = require("jquery");

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
      const imdbID = req.query.imdb;

      var tmdbData = {};
      let isWebseries = false;

      if (imdbID != null) {
        // let isWebseries = currentdat.Genre.includes("TV Shows Web Series");
        // console.log();
        var tmdbDat = await axios.get(
          `https://api.themoviedb.org/3/find/${imdbID}?api_key=${process.env.TMDB_API}&language=en-US&external_source=imdb_id`
        );

        // console.log(tmdbDat.data);
        // console.log(tmdbDat);

        Object.keys(tmdbDat.data).forEach((key) => {
          if (tmdbDat.data[key].length > 0) {
            isWebseries = key.includes("tv") ? true : false;
          }
        });

        // console.log(isWebseries);

        // console.log(tmdbData);
        // tmdbData.type = isWebseries ? "tv" : "movie";

        var lists = await getList(imdbID, isWebseries);

        // tmdbData = { ...tmdbData, ...tmdbData2 };
        res.send({ isWebseries, lists });
      }
    })();
  } catch (error) {
    // console.log(error);
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

async function getList(imdbID, isWebseries) {
  let targetUrl = `https://hdmovies4u.pics/?s=${imdbID}`;

  let { data } = await axios.get(
    `https://cors-proxy-snowy.vercel.app/${targetUrl.replace("https://", "")}`,
    {
      headers: {
        Origin: null,
      },
    }
  );

  const dom = new JSDOM(data);
  const $ = jquery(dom.window);
  const allhomelists =
    dom.window.document.getElementsByClassName("text-center");
  const arrallhomelists = Array.from(allhomelists);
  var DataArray = [];
  let imdb = imdbID;
  //   console.log(imdbID);
  let years = (
    await axios.get(`https://v3.sg.media-imdb.com/suggestion/x/${imdb}.json`)
  ).data.d[0];

  let year = years.y;
  let yearRange = years.yr;

  //   console.log(yearRange);

  arrallhomelists.forEach((el, inde) => {
    $(el)
      .children()
      .each(async (ind, e) => {
        if (
          $(e).children("a").attr("class") &&
          $(e)
            .children("a")
            .attr("class")
            .includes("cursor-pointer overflow-hidden group block shadow-sm")
        ) {
          let tmpDat = {};

          tmpDat.title = titleFormatter(
            $(e).children("div").children(".text-white").text(),
            yearRange,
            year,
            isWebseries
          );

          if (isWebseries) {
            tmpDat.season = getSeason(
              $(e).children("div").children(".text-white").text()
            );

            tmpDat.yearRange = yearRange;
            tmpDat.year = year;

            if (
              $(e)
                .children("div")
                .children(".text-white")
                .text()
                .toLowerCase()
                .includes("vol.")
            ) {
              tmpDat.vol = $(e)
                .children("div")
                .children(".text-white")
                .text()
                .toLowerCase()
                .split("vol. ")[1]
                .split(" ")[0];
            }

            tmpDat.id = `${tmpDat.season.split(" ")[1]}${
              tmpDat.vol ? `-${tmpDat.vol}` : ""
            }`;
          } else {
            tmpDat.id = 1;
            tmpDat.year = year;
          }

          tmpDat.link = $(e).children("a").attr("href");
          tmpDat.poster = $(e)
            .children("a")
            .children("div")
            .children("img")
            .attr("src");

          // console.log(tmpDat);

          DataArray.push(tmpDat);
        }
      });
  });

  return DataArray;
}

function titleFormatter(rawTitle, yrRange, year, isWebseries) {
  //   console.log(rawTitle);
  let trash = ["(Part", "(", "(Season", "Netflix Original", "–"];

  // console.log(yearRange);
  let yearRange;

  //   console.log();

  if (typeof yrRange == "undefined") {
    yearRange = `${year}-${new Date().getFullYear()}`;
  } else {
    yearRange = yrRange;
  }

  //   console.log(yearRange);

  let d = rawTitle;

  if (isWebseries) {
    for (
      let y = parseInt(yearRange.split("-")[0]);
      y <= parseInt(yearRange.split("-")[1]);
      y++
    ) {
      // console.log(year);
      d = d.split(y)[0];
    }
  } else {
    d = d.split(year)[0];
  }
  // console.log(year);

  d = d.replace("[18+]", "").replace("Download", "").trim();

  return d;
}

function getSeason(rawTitle) {
  return `Season ${rawTitle.split("Season ")[1].split(" ")[0]}`;
}

export default handler;
