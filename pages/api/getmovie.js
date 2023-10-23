import nc from "next-connect";
var jsdomi = require("jsdom");
const { JSDOM } = jsdomi;
const jqreyi = require("jquery");

var axios = require("axios");

const fixtitle = (movietitle, qulity, ReleaseYear) => {
  var arr = [
    "Movie",
    "Hindi",
    "AMZN",
    "Web Series",
    "DSNP",
    "Zee5",
    "S01",
    "S02",
    "S03",
    "S04",
    "S05",
    "S06",
    "S07",
    "S08",
    "S09",
    "S10",
    "S11",
    "S12",
    "S13",
    "S14",
    "S15",
    "S16",
    "S17",
    "S18",
    "S19",
    "S20",
    " All Parts Collection",
    "All",
    "Parts",
    "Vol 1",
    "Vol 2",
    "Vol 3",
    "Vol 4",
    "Vol 5",
    "Vol 6",
    "Vol 7",
    "Vol 8",
    "Vol 9",
    "Vol 10",
    "Collection",
    "18+",
    "–",
  ];
  var nowmov = movietitle.split(qulity)[0].trim();
  arr.forEach((element) => {
    nowmov = nowmov.replace(element, "");
  });
  var swcases = nowmov.includes("WebRip")
    ? "WebRip"
    : nowmov.includes("BluRay")
    ? "BluRay"
    : nowmov.includes("PreDvd")
    ? "PreDvd"
    : nowmov.includes("DvdScr")
    ? "DvdScr"
    : nowmov.includes("HDCam")
    ? "HDCam"
    : null;
  // console.log(nowmov);
  if (swcases != null) {
    var curmov = nowmov.split(swcases)[0].trim().split(ReleaseYear)[0].trim();
    return curmov;
  } else {
    return nowmov.split(swcases)[0].trim().split(ReleaseYear)[0].trim();
  }
};

const myPromiseLinks = ($) =>
  new Promise((resolve, reject) => {
    var nnowobbj = new Object();
    $("div[itemprop='description']")
      .children("p[style='text-align: center;']")
      .each((iind, ndat) => {
        // MovLinks
        //   console.log($(ndat).children("span[class='button2']").length);
        if ($(ndat).children("span[class='button2']").length != 0) {
          var nnowarra = new Array();
          if (
            $("div[itemprop='description']").children(
              "div[class='sp-wrap sp-wrap-default']"
            ).length == 0
          ) {
            $("div[itemprop='description']")
              .children("p[style='text-align: center;']")
              .eq(iind + 1)
              .children()
              .not("br")
              .each((iiind, eel) => {
                nnowarra.push({
                  Link:
                    $(eel).attr("href") || $(eel).children("a").attr("href"),
                  DownloadTitle: $(eel)
                    .text()
                    .replace("mkvCinemas", "moviiz-pro"),
                });
                if (
                  iiind ==
                  $("div[itemprop='description']")
                    .children("p[style='text-align: center;']")
                    .eq(iind + 1)
                    .children()
                    .not("br").length -
                    1
                ) {
                  nnowobbj[$(ndat).text()] = nnowarra;
                  resolve(nnowobbj);
                }
              });
          } else {
            $("div[itemprop='description']")
              .children("div[class='sp-wrap sp-wrap-default']")
              // .children()
              .each((innd, eel) => {
                var nnowarra1 = new Array();
                $(eel.lastElementChild.firstElementChild.childNodes).each(
                  (indfi, nowliati) => {
                    if ($(nowliati).attr("href")) {
                      nnowarra1.push({
                        Link:
                          $(nowliati).attr("href") ||
                          $(nowliati).children("a").attr("href"),
                        DownloadTitle: $(nowliati)
                          .text()
                          .replace("mkvCinemas", "moviiz-pro"),
                      });

                      if (
                        eel.lastElementChild.firstElementChild.childNodes
                          .length -
                          1 ==
                        indfi
                      ) {
                        nnowobbj[
                          $(eel.firstElementChild)
                            .text()
                            .trim()
                            .split("Open")[1]
                            .split("GDToT")[0]
                            .trim()
                        ] = nnowarra1;
                      }
                    }
                  }
                );
                if (
                  innd ==
                  $("div[itemprop='description']").children(
                    "div[class='sp-wrap sp-wrap-default']"
                  ).length -
                    1
                ) {
                  resolve(nnowobbj);
                }
              });
          }
        }
      });
  });
const myPromise = ($, which) =>
  new Promise((resolve, reject) => {
    var nowobj = new Object();
    // var workarr = new Array();
    $(`div[class='mvici-${which}']`)
      .children("p")
      .each((ind, now) => {
        if ($(now).text().split(":").length <= 2) {
          nowobj[$(now).text().split(":")[0].trim()] = $(now)
            .text()
            .split(":")[1]
            .trim();
          //   console.log($(now).text(), ind);
        } else {
          // var allstring = null;
          //   if ($(now).text().split(":").length - 1 == ind) {
          nowobj[$(now).text().split(":")[0].trim()] = $(now)
            .text()
            .replace(`${$(now).text().split(":")[0]}:`, "")
            .trim();
          //   console.log($(now).text(), ind);
          //   }
        }
        if (ind == $(`div[class='mvici-${which}']`).children("p").length - 1) {
          resolve(nowobj);
        }
      });
  });

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
      const axres = await axios.get(req.query.movdata);
      const dom = new JSDOM(axres.data);
      const $ = jqreyi(dom.window);
      const MovSlug = $("h3[itemprop='name']").text();
      const MovDesc = $("p[class='f-desc']").text();
      const nowobjnow = new Object();

      var nowobj = new Object();
      var workarr = new Array();
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
      var currentdat = await myPromise($, "left");
      var currentdat2 = await myPromise($, "right");

      var tmdbData = {};

      // var tmdb
      //   console.log(currentdat2["Post Updated"]);
      var nwmovslug = fixtitle(
        MovSlug,
        currentdat2.Quality,
        currentdat2.Release
      );
      // console.log(nwmovslug);

      if (currentdat.Genre != "Sports") {
        let isWebseries = currentdat.Genre.includes("TV Shows Web Series");
        // console.log();
        var tmdbDat = await axios.get(
          `https://api.themoviedb.org/3/search/${
            isWebseries ? "tv" : "movie"
          }?api_key=${process.env.TMDB_API}&query=${nwmovslug.trim()}&${
            isWebseries ? "first_air_date_year" : "year"
          }=${currentdat2.Release}`
        );
        // console.log(tmdbDat);
        tmdbData.type = isWebseries ? "tv" : "movie";

        if (tmdbDat.data.total_results > 0) {
          var tmdbData2 = await getAllData(isWebseries, tmdbDat);

          tmdbData = { ...tmdbData, ...tmdbData2 };

          // console.log(tmdbData);

          // var tmdbMovData = await axios.get(`
          // https://api.themoviedb.org/3/${isWebseries ? "tv" : "movie"}/${
          //   tmdbDat.data.results[0].id
          // }?api_key=${
          //   process.env.TMDB_API
          // }&language=en-US&append_to_response=videos`);

          // tmdbData.banner = `https://image.tmdb.org/t/p/original${tmdbMovData.data.backdrop_path}`;
          // tmdbData.poster = `https://image.tmdb.org/t/p/original${tmdbMovData.data.poster_path}`;
          // tmdbData.imdbID = tmdbMovData.data.imdb_id;
          // tmdbData.tmdbID = tmdbMovData.data.id;
          // tmdbData.tmdbGenre = tmdbMovData.data.genres;
          // tmdbData.adultRated = tmdbMovData.data.adult;
          // tmdbData.tmdbTitle = isWebseries
          //   ? tmdbMovData.data.name
          //   : tmdbMovData.data.title;

          // tmdbMovData.data.videos.results.length > 0
          //   ? (tmdbData.trailer =
          //       tmdbMovData.data.videos.results.reverse()[0].key)
          //   : null;

          // if (typeof tmdbData.imdbID == "undefined") {
          //   let extIds = await axios.get(
          //     `https://api.themoviedb.org/3/${isWebseries ? "tv" : "movie"}/${
          //       tmdbMovData.data.id
          //     }/external_ids?api_key=${process.env.TMDB_API}`
          //   );
          //   // console.log(extIds);
          //   tmdbData.imdbID = extIds.data.imdb_id;
          // }

          // let embdUrl = `https://www.2embed.to/embed/imdb/${
          //   isWebseries ? "tv" : "movie"
          // }?id=${tmdbData.imdbID}${isWebseries ? `&s=${"1"}&e=1` : ""}`;

          // let streamData = await axios.get(embdUrl);

          // // console.log(tmdbMovData.data);
          // tmdbData.streamable = !streamData.data.includes("404 Page Not Found");

          // tmdbData.streamable ? (tmdbData.streamUrl = embdUrl) : null;

          // if (isWebseries) {
          //   let SeriesConfig = await axios.get(
          //     `${process.env.HOST_URL}/api/getSeriesConfig?tmdb=${tmdbData.tmdbID}`
          //   );
          //   tmdbData.SeriesConfig = SeriesConfig.data;
          // }
          // tmdbData.isWebseries = isWebseries;

          // if (isWebseries && tmdbData.streamable) {
          //   console.log(
          //     await getSeriesEpisodes(tmdbData.imdbID, tmdbData.tmdbID)
          //   );
          // }

          // console.log(tmdbData);
        } else {
          if (isWebseries) {
            var tmdbDat2 = await axios.get(
              `https://api.themoviedb.org/3/search/tv?api_key=${
                process.env.TMDB_API
              }&query=${nwmovslug.trim()}`
            );

            if (tmdbDat2.data.total_results > 0) {
              let tmdbData2 = await getAllData(isWebseries, tmdbDat2);
              tmdbData = { ...tmdbData, ...tmdbData2 };
            } else {
              tmdbData.streamable = false;
            }
          } else {
            tmdbData.streamable = false;
          }
          // console.log(tmdbDat.data);
          // console.log("currentdat");
        }
      } else {
        // console.log("Live Match");
        // console.log(currentdat.Genre != "Sports");
        tmdbData.type = "live";
        tmdbData.streamable = false;
      }

      var AllLinks =
        currentdat.Genre != "Sports"
          ? !nwmovslug.includes("All Parts")
            ? await myPromiseLinks($)
            : []
          : [];

      workarr.push({
        MovSlug,
        AllLinks,
        MovDetails: {
          MovTitle: nwmovslug,
          MovDesc,
          ...currentdat,
          ...currentdat2,
          ...tmdbData,
        },
      });
      res.send(workarr);
      // $(allmenu.firstElementChild.childNodes).each((dat, ar) => {

      // });
    })();
  } catch (error) {
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

async function getSeriesEpisodes(imdbID, tmdbID) {
  let SeriesEpisodes = [];
  // console.log(tmdbID);

  let { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/${tmdbID}?api_key=${process.env.TMDB_API}&language=en-US`
  );

  for (let seasonIndex in data.seasons) {
    let season = data.seasons[seasonIndex].season_number;
    let episodeCount = data.seasons[seasonIndex].episode_count;

    SeriesEpisodes.push({ index: seasonIndex, season });
    let latestEpisode = data.last_episode_to_air.episode_number;
    // console.log(epRelaseDate);

    for (let episode = 1; episode <= episodeCount; episode++) {
      let epUrl = `https://www.2embed.to/embed/imdb/tv?id=${imdbID}&s=${season}&e=${episode}`;
      let streamable, released;

      if (episode <= latestEpisode) {
        let epStream = await axios.get(epUrl);

        // console.log(tmdbMovData.data);
        streamable = !epStream.data.includes("404 Page Not Found");
        released = true;
      } else {
        released = false;
        streamable = false;
      }
      SeriesEpisodes[seasonIndex][`Episode ${episode}`] = {
        released,
        streamable,
        streamUrl: epUrl,
      };
    }
    // console.log(
    //   data.seasons[seasonIndex].season_number,
    //   data.seasons[seasonIndex].episode_count
    // );
  }
  // console.log(SeriesEpisodes);
  //  return episodesGrp.data.seasons;
}

async function getAllData(isWebseries, tmdbDat) {
  let tmdbData = {};
  var tmdbMovData = await axios.get(`
          https://api.themoviedb.org/3/${isWebseries ? "tv" : "movie"}/${
    tmdbDat.data.results[0].id
  }?api_key=${process.env.TMDB_API}&language=en-US&append_to_response=videos`);

  tmdbData.banner = `https://image.tmdb.org/t/p/original${tmdbMovData.data.backdrop_path}`;
  tmdbData.poster = `https://image.tmdb.org/t/p/original${tmdbMovData.data.poster_path}`;
  tmdbData.imdbID = tmdbMovData.data.imdb_id;
  tmdbData.tmdbID = tmdbMovData.data.id;
  tmdbData.tmdbGenre = tmdbMovData.data.genres;
  tmdbData.adultRated = tmdbMovData.data.adult;
  tmdbData.tmdbTitle = isWebseries
    ? tmdbMovData.data.name
    : tmdbMovData.data.title;

  tmdbMovData.data.videos.results.length > 0
    ? (tmdbData.trailer = tmdbMovData.data.videos.results.reverse()[0].key)
    : null;

  if (typeof tmdbData.imdbID == "undefined") {
    let extIds = await axios.get(
      `https://api.themoviedb.org/3/${isWebseries ? "tv" : "movie"}/${
        tmdbMovData.data.id
      }/external_ids?api_key=${process.env.TMDB_API}`
    );
    // console.log(extIds);
    tmdbData.imdbID = extIds.data.imdb_id;
  }

  let embdUrl = `https://www.2embed.to/embed/imdb/${
    isWebseries ? "tv" : "movie"
  }?id=${tmdbData.imdbID}${isWebseries ? `&s=${"1"}&e=1` : ""}`;

  let streamData = await axios.get(embdUrl);

  // console.log(tmdbMovData.data);
  tmdbData.streamable = !streamData.data.includes("404 Page Not Found");

  tmdbData.streamable ? (tmdbData.streamUrl = embdUrl) : null;

  if (isWebseries) {
    let SeriesConfig = await axios.get(
      `${process.env.HOST_URL}/api/getSeriesConfig?tmdb=${tmdbData.tmdbID}`
    );
    tmdbData.SeriesConfig = SeriesConfig.data;
  }
  tmdbData.isWebseries = isWebseries;

  // if (isWebseries && tmdbData.streamable) {
  //   console.log(
  //     await getSeriesEpisodes(tmdbData.imdbID, tmdbData.tmdbID)
  //   );
  // }
  return tmdbData;

  // console.log(tmdbData);
}

export default handler;
