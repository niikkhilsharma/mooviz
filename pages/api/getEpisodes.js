import nc from "next-connect";
// var jsdomi = require("jsdom");
// const { JSDOM } = jsdomi;
// const jqreyi = require("jquery");
//AXIOS
var axios = require("axios");
import { encrypthex, decrypthex } from "../../lib/encryption/encryption";
import verifyToken from "../../lib/jsonWebToken/verifytoken";
import verifyAuth from "../../lib/socket/socketAuth";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(verifyToken)
  .use(verifyAuth)
  .get((req, res) => {
    //   console.log(req);

    (async () => {
      try {
        const imdbID = JSON.parse(
          decrypthex(
            JSON.parse(atob(req.query.imdb))[0],
            Buffer.from(JSON.parse(atob(req.query.imdb))[1])
          )
        );
        const tmdbID = JSON.parse(
          decrypthex(
            JSON.parse(atob(req.query.tmdb))[0],
            Buffer.from(JSON.parse(atob(req.query.tmdb))[1])
          )
        );
        const querySeasons = [].concat(req.query.s.split(","));

        //   console.log(querySeasons);
        //   seasonChecker();

        var SeriesEpisodes = await getSeriesEpisodes(
          imdbID,
          req.query.imdb,
          tmdbID,
          querySeasons
        );
        //   console.log("Data Sent");
        res.send(SeriesEpisodes);
      } catch (error) {
        res.status(404).end("Something went wrong");

        console.log(error);
      }
    })();
  });

async function getSeriesEpisodes(imdbID, enimdb, tmdbID, querySeasons) {
  let SeriesEpisodes = [];
  // console.log(tmdbID);

  let { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/${tmdbID}?api_key=${process.env.TMDB_API}&language=en-US`
  );

  if (
    seasonChecker(data.seasons, querySeasons) ||
    querySeasons.includes("all")
  ) {
    let targetSeasons = querySeasons.includes("all")
      ? data.seasons
      : getTargetSeasons(data.seasons, querySeasons);

    // console.log(targetSeasons);

    let seriesUrl = await axios.get(
      `https://movizz-web.vercel.app/api/getStream?imdb=${enimdb}`
    );

    let available = seriesUrl.data.data;
    // let seasonAvailable = available.map((item) => item.id);
    // console.log(availabl);
    let episodesStreamable = [];

    if (seriesUrl.data.streamable == true) {
      available.map((item) => {
        item.folder.map((item) => {
          episodesStreamable.push(item.id);
        });
      });
    } else {
      episodesStreamable = [];
    }

    // console.log(episodesStreamable);

    // console.log(episodesStreamable);

    for (let seasonIndex in targetSeasons) {
      let episodeDetails = (
        await axios.get(
          `https://api.themoviedb.org/3/tv/${tmdbID}/season/${targetSeasons[seasonIndex].season_number}?api_key=${process.env.TMDB_API}&language=en-US`
        )
      ).data.episodes;

      // console.log("episodes", episodeDetails);

      let season = targetSeasons[seasonIndex].season_number;
      let poster = `https://image.tmdb.org/t/p/original${targetSeasons[seasonIndex].poster_path}`;
      let plot = targetSeasons[seasonIndex].overview;
      let name = targetSeasons[seasonIndex].name;

      //   console.log(season.some((item) => seasons.includes(item)));
      let episodeCount = targetSeasons[seasonIndex].episode_count;

      SeriesEpisodes.push({ index: seasonIndex, season, name, poster, plot });
      let latestEpisode = data.last_episode_to_air.episode_number;
      // console.log(epRelaseDate);

      SeriesEpisodes[seasonIndex].episodes = [];

      // console.log(seasonIndex, targetSeasons.length);

      for (let episode = 1; episode <= episodeCount; episode++) {
        let streamable, released;

        if (
          episode <= latestEpisode ||
          seasonIndex < targetSeasons.length - 1
        ) {
          // if (episodesStreamable.includes(`${season}-${episode}`)) {
          //   // console.log([`${season}-${episode}`]);
          streamable = true;
          // } else {
          //   streamable = false;
          // }

          // console.log(tmdbMovData.data);

          released = true;
        } else {
          released = false;
          streamable = false;
        }
        SeriesEpisodes[seasonIndex].episodes.push({
          name: `Episode ${episode}`,
          released,
          streamable,
          episodeDetails: episodeDetails[episode - 1],
        });

        // SeriesEpisodes[seasonIndex][`Episode ${episode}`] = {
        //   released,
        //   streamable,
        //   episodeDetails: episodeDetails[episode - 1],
        // };
      }
      // console.log(
      //   data.seasons[seasonIndex].season_number,
      //   data.seasons[seasonIndex].episode_count
      // );
    }

    //   console.log(SeriesEpisodes);
    return SeriesEpisodes;
  } else {
    return "Some of Provided Seasons Seems To Be Invalid";
  }
  //  return episodesGrp.data.seasons;
}

function seasonChecker(ses, qSeasons) {
  let allSeason = () => {
    let d = [];
    ses.forEach((season) => {
      d.push(String(season.season_number));
    });
    return d;
  };
  //   console.log(allSeason(), qSeasons);
  //   console.log(qSeasons);
  let success = true;

  qSeasons.forEach((item) => {
    !allSeason().includes(item) ? (success = false) : null;
  });
  //   console.log(success);
  return success;
}

function getTargetSeasons(allSes, querySeasons) {
  let t = [];
  allSes.forEach((ses) => {
    querySeasons.includes(String(ses.season_number)) ? t.push(ses) : null;
  });
  return t;
}

export default handler;
