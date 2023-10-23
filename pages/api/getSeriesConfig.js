import nc from "next-connect";
// var jsdomi = require("jsdom");
// const { JSDOM } = jsdomi;
// const jqreyi = require("jquery");

//AXIOS
var axios = require("axios");

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get((req, res) => {
  //   console.log(req);

  (async () => {
    try {
      const tmdbID = req.query.tmdb;
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${tmdbID}?api_key=${process.env.TMDB_API}&language=en-US`
      );

      let Series = [];
      for (let seasonIndex in data.seasons) {
        let { name, season_number, episode_count, overview, poster_path } =
          data.seasons[seasonIndex];

        let responseObj = {
          name,
          season_number,
          episode_count,
          overview,

          poster: `https://image.tmdb.org/t/p/original${poster_path}`,
        };
        Series.push(responseObj);
      }

      res.send(Series);

      //   for(let seasonIndex in data.seasons){
      //     let {season_number,episode_count,seas} = data.season[seasonIndex]
      //     Series.push()

      //   }

      //   res.send({});
    } catch (error) {
      console.log(error);
    }
  })();
});

async function getSeriesEpisodes(imdbID, tmdbID, querySeasons) {
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

    for (let seasonIndex in targetSeasons) {
      let season = targetSeasons[seasonIndex].season_number;

      //   console.log(season.some((item) => seasons.includes(item)));
      let episodeCount = targetSeasons[seasonIndex].episode_count;

      SeriesEpisodes.push({ index: seasonIndex, season });
      let latestEpisode = data.last_episode_to_air.episode_number;
      // console.log(epRelaseDate);
      let st = true;

      for (let episode = 1; episode <= episodeCount; episode++) {
        // console.log(
        //   `Getting ${
        //     season +
        //     " , " +
        //     episode +
        //     " , totalSeason : " +
        //     data.seasons.length +
        //     " , SeasonEp : " +
        //     episodeCount
        //   }`
        // );
        let epUrl = `https://www.2embed.to/embed/imdb/tv?id=${imdbID}&s=${season}&e=${episode}`;
        let streamable, released;

        if (episode <= latestEpisode) {
          if (episode == 1 || episode == episodeCount) {
            let epStream = await axios.get(epUrl);
            streamable = !epStream.data.includes("404 Page Not Found");
            st = !epStream.data.includes("404 Page Not Found");
          } else {
            streamable = st;
          }

          // console.log(tmdbMovData.data);

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
