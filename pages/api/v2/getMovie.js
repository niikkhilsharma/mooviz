import nc from "next-connect";
var axios = require("axios");
const { JSDOM } = require("jsdom");
const jquery = require("jquery");
import { decrypthex, encrypthex } from "../../../lib/encryption/encryption";
import verifyToken from "../../../lib/jsonWebToken/verifytoken";
import verifyAuth from "../../../lib/socket/socketAuth";
import movieAvailable from "../../../lib/database/models/movieAvailable";
import userPreference from "../../../lib/database/models/userPreference";

const handler = nc({
  onError: (err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  // .use((req, res, next) => {
  //   verifyToken(req, res, verifysocketauth);
  //   function verifysocketauth() {
  //     verifyAuth(req, res, next);
  //   }
  // })
  .use(verifyToken)
  .use(verifyAuth)
  .get((req, res) => {
    try {
      (async () => {
        var movUrl = "";
        if (req.query.movdata && req.query.mode != "videoid") {
          try {
            movUrl = JSON.parse(
              decrypthex(
                JSON.parse(atob(req.query.movdata))[0],
                Buffer.from(JSON.parse(atob(req.query.movdata))[1])
              )
            );
          } catch (error) {
            console.log(error);
            res.send({ streamable: false, accepted: false });
            return;
          }
        }
        // console.log(req.query.mode);
        const ApiMode = req.query.mode ? req.query.mode : "link";
        // console.log(ApiMode);
        let imdbID = null;
        let tmdbID = null;
        let isWebseries = false;
        let shots = [];

        if (ApiMode == "link") {
          const axres = await axios.get(movUrl);
          const dom = new JSDOM(axres.data);
          const $ = jquery(dom.window);

          if (
            movUrl.includes("allmovieshub") ||
            movUrl.includes("hdbollyhub")
          ) {
            try {
              imdbID =
                $(".imdbwp__link")?.attr("href")?.split("/")[4]?.trim() ||
                axres.data
                  .split("/title/")[1]
                  ?.split("[")[0]
                  ?.trim()
                  .replaceAll("/", "")
                  .trim();
              movUrl.includes("allmovieshub")
                ? $("img[class='aligncenter']").each((ind, elemen) => {
                    shots.push($(elemen).attr("src"));
                  })
                : Array.from(
                    dom.window.document.querySelectorAll("img")
                  ).forEach((el) => {
                    if (el.parentElement.style["text-align"]) {
                      shots.push(el.src);
                    }
                  });
            } catch (e) {
              // console.log("err");
            }

            // console.log(imdbID);

            if (!imdbID) {
              // console.log("jjj");

              let name = axres.data
                .split("Name:")[1]
                .split('"')[0]
                .split(">")[1]
                .split("<")[0]
                .trim()
                .replace(/"/g);
              let year = axres.data
                .split("Year:")[1]
                .split('"')[0]
                .split(">")[1]
                .split("<")[0]
                .trim()
                .replace(/"/g);

              imdbID = await getImdb(name, year);
            }
          } else if (movUrl.includes("extramovies")) {
            $("script").each((index, el) => {
              if ($(el).text().includes("IndStreamPlayerConfigs")) {
                imdbID = $(el)
                  .text()
                  .replace("const IndStreamPlayerConfigs = {", "")
                  .replace("width: 610,", "")
                  .replace("height: 370,", "")
                  .replace("id: 'IndStreamPlayer',", "")
                  .split("src: '")[1]
                  .split("',")[0];
              }
            });

            $(".separator")
              .children("img")
              .each((inddd, ell) => {
                if (!$(ell).attr("src").includes("gif")) {
                  shots.push($(ell).attr("src"));
                }
              });
          } else {
            res.status(404).end("Invalid Data Provided");
          }
        } else if (ApiMode == "imdb") {
          // console.log("g");

          if (!req.query.super) {
            imdbID = JSON.parse(
              decrypthex(
                JSON.parse(atob(req.query.imdbID))[0],
                Buffer.from(JSON.parse(atob(req.query.imdbID))[1])
              )
            );
          } else imdbID = req.query.imdbID;
        } else if (ApiMode == "videoid") {
          let { title, year } = req.query;
          imdbID = await getImdb(title, year);
        } else if (ApiMode == "tmdb") {
          let { data } = await axios.get(`
          https://api.themoviedb.org/3/${req.query.type}/${movUrl}/external_ids?api_key=${process.env.TMDB_API}&language=en-US`);
          // let { title, year } = req.query;
          imdbID = data.imdb_id;
        }
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

        var tmdbData = {};

        if (imdbID != null && imdbID != "undefined") {
          // let isWebseries = currentdat.Genre.includes("TV Shows Web Series");
          // console.log();
          var tmdbDat = await axios.get(
            `https://api.themoviedb.org/3/find/${imdbID}?api_key=${process.env.TMDB_API}&language=en-US&external_source=imdb_id`
          );

          // console.log(tmdbDat);

          Object.keys(tmdbDat.data).forEach((key) => {
            if (tmdbDat.data[key].length > 0) {
              tmdbID = tmdbDat.data[key][0].id;
              tmdbData.shots = shots;
              tmdbData.tmdbID = btoa(
                JSON.stringify(
                  encrypthex(JSON.stringify(tmdbDat.data[key][0].id))
                )
              );
              tmdbData.title = tmdbDat.data[key][0].title;
              tmdbData.overview = tmdbDat.data[key][0].overview;
              tmdbData.imdbID = btoa(
                JSON.stringify(encrypthex(JSON.stringify(imdbID)))
              );
              tmdbData.type = tmdbDat.data[key][0].media_type;
              tmdbData.release = tmdbDat.data[key][0].release_date;
              tmdbData.isWebseries = tmdbData.type.includes("tv")
                ? true
                : false;
              isWebseries = tmdbData.type.includes("tv") ? true : false;
            }
          });

          // console.log(tmdbData);
          // tmdbData.type = isWebseries ? "tv" : "movie";

          var tmdbData2 = await getAllData(isWebseries, tmdbID, imdbID);
          var serverAvailableCheck = await getAvailableServer(imdbID);
          var getuserwatchtime = await getUserWatch(imdbID, req.user);
          tmdbData = {
            ...tmdbData,
            ...tmdbData2,
            ...serverAvailableCheck,
            ...getuserwatchtime,
          };
          res.send({ ...tmdbData });
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

async function getAllData(isWebseries, tmdbID, imdbID) {
  // console.log(`
  //         https://api.themoviedb.org/3/${
  //           isWebseries ? "tv" : "movie"
  //         }/${tmdbID}?api_key=${
  //   process.env.TMDB_API
  // }&language=en-US&append_to_response=videos`);
  let tmdbData = {};
  var tmdbMovData = await axios.get(`
          https://api.themoviedb.org/3/${
            isWebseries ? "tv" : "movie"
          }/${tmdbID}?api_key=${
    process.env.TMDB_API
  }&language=en-US&append_to_response=videos`);

  tmdbData.banner = `https://image.tmdb.org/t/p/original${tmdbMovData.data.backdrop_path}`;
  tmdbData.poster = `https://image.tmdb.org/t/p/original${tmdbMovData.data.poster_path}`;
  tmdbData.tmdbGenre = tmdbMovData.data.genres;
  tmdbData.adultRated = tmdbMovData.data.adult;
  tmdbData.original_title = tmdbMovData.data.original_title;
  tmdbData.tagline = tmdbMovData.data.tagline;
  tmdbData.videos = tmdbMovData.data.videos.results;
  tmdbMovData.data.belongs_to_collection
    ? (tmdbData.belongs_to_collection = {
        id: tmdbMovData.data.belongs_to_collection.id,
        name: tmdbMovData.data.belongs_to_collection.name,
        poster: `https://image.tmdb.org/t/p/original${tmdbMovData.data.belongs_to_collection.poster_path}`,
        banner: `https://image.tmdb.org/t/p/original${tmdbMovData.data.belongs_to_collection.backdrop_path}`,
      })
    : null;
  tmdbData.tmdbTitle = isWebseries
    ? tmdbMovData.data.name
    : tmdbMovData.data.title;

  tmdbMovData.data.videos.results.length > 0
    ? (tmdbData.trailer = tmdbMovData.data.videos.results.reverse()[0].key)
    : null;

  // console.log(tmdbMovData.data);
  tmdbData.streamable = true;

  tmdbData.imdbRating = 0;
  // tmdbData.imdbRating = await getImdbRating(imdbID);

  if (isWebseries) {
    tmdbData.last_episode = tmdbMovData.data.last_episode_to_air;
    tmdbData.release = tmdbMovData.last_air_date;

    // let SeriesConfig = await axios.get(
    //   `${process.env.HOST_URL}/api/getSeriesConfig?tmdb=${tmdbID}`
    // );
    tmdbData.SeriesConfig = {};
  }

  // if (isWebseries && tmdbData.streamable) {
  //   console.log(
  //     await getSeriesEpisodes(tmdbData.imdbID, tmdbData.tmdbID)
  //   );
  // }
  return tmdbData;

  // console.log(tmdbData);
}

async function getImdbRating(imdbID) {
  try {
    // let { data } = await axios.get(`https://www.imdb.com/title/${imdbID}/`);

    // const dom = new JSDOM(data);
    // const $ = jquery(dom.window);
    // const allhomelists =
    //   dom.window.document.getElementsByClassName("sc-7ab21ed2-1");

    // return $(allhomelists[0]).text();
    return 0;
  } catch {
    return null;
  }
}

async function getImdb(title, year) {
  try {
    // console.log(title, year);
    var nowurl = `https://v3.sg.media-imdb.com/suggestion/x/${encodeURI(
      title.includes("(")
        ? title
            .split("(")[0]
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .trim()
        : title.replace(/[^a-zA-Z0-9\s]/g, "").trim()
    )}%20${encodeURI(year.includes("-") ? year.split("-")[0] : year)}.json`;
    let d = await axios.get(nowurl).then((d) => d.data.d);
    return d[0].id;
  } catch (e) {
    console.log(e);
    return null;
    // res.send({ streamable: false });
  }
}
async function getAvailableServer(imdbID) {
  var data = await movieAvailable.findOne({ IMDB: imdbID });
  return { available: data?.data || "none" };
}
async function getUserWatch(imdbID, userID) {
  var dbres = await userPreference.findOne({
    userID: userID,
    "DurationOfMediaWatched.IMDB": imdbID,
  });
  if (dbres) {
    return {
      duration: dbres.DurationOfMediaWatched.filter(
        (el) => el.IMDB == imdbID
      )[0].duration,
    };
  } else {
    return { duration: 0 };
  }
  // return {duration:dbres.DurationOfMediaWatched}
}

export default handler;
