import nc from "next-connect";

var axios = require("axios");
// fffffff

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get((req, res) => {
  (async () => {
    try {
      let t = new Date();
      t.setDate(t.getDate() - 1);
      let t1 = t.getTime();
      var { type, genre, sort, page } = req.query;

      var release = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;

      // console.log();

      let data = [];

      if (sort == "latest") {
        // while (data.length < 15) {

        let res = await getLatest(type, genre, page, release);

        console.log(res);
        if (res) {
          data = data.concat(res);
          console.log([data.length, page]);
        } else {
          data = "Something Went Wrong";
        }
        page = parseInt(page) + 1;
        // }
      } else if (sort == "topRated") {
        // while (data.length < 15) {
        let res = await getTopRated(type, genres, page);
        if (res) {
          data = data.concat(res);
          console.log([data.length, page]);
        } else {
          data = "Something Went Wrong";
        }
        // page = parseInt(page) + 1;
        // }
      }

      //   console.log(data);

      ///stuffs here
      // let respTime = new Date().getTime() - t1;
      res.send({ data });
    } catch (error) {
      res.status(404).end("Something went wrong");

      console.log(error);
    }
  })();
});

// async function getLatest(type, genres, page) {
//   try {
//     getLatestList(type, genres);
//   } catch (err) {
//     // console.log(err);
//   }
// }

async function getStreamable(imdbID) {
  //   console.log(`${process.env.HOST_URL}/api/getStream?imdb=${imdbID}`);
  // let { data } = await axios.get(
  //   `${process.env.HOST_URL}/api/getStream?imdb=${imdbID}`
  // );
  // console.log(data.streamable);
  return true;
}

async function getLatest(type, genres, page, release) {
  try {
    const sort_by =
      type == "movie" ? "release_date.desc" : "first_air_date.desc";
    const include_adult = true;
    const include_video = false;
    const region = "IN";
    const releasedBefore = release;
    const lang = "hi||en";
    const release_type = "3||4";

    let responseContents = [];

    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${
        process.env.TMDB_API
      }&sort_by=${sort_by}&include_adult=${include_adult}&include_video=${include_video}&page=${page}&region=${region}&${
        type == "movie" ? "release_date.lte" : "air_date.lte"
      }=${releasedBefore}&with_original_language=${lang}&with_release_type=${release_type}`
    );

    let contents = data.results;

    let filtred = contents.filter(
      (item) => item.poster_path != null && item.backdrop_path != null
    );

    let newContent = filtred.map((item) => {
      return {
        poster: `https://image.tmdb.org/t/p/original${item.poster_path}`,
        banner: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
        title: item.title,
        tid: item.id,
        link: item.id,
        overview: item.overview,
        genre: item.genre_ids,
      };
    });

    // for (let index in contents) {
    //   let content = contents[index];

    //   // console.log();
    //   // let extIds = await axios.get(
    //   //   `https://api.themoviedb.org/3/${type}/${content.id}/external_ids?api_key=${process.env.TMDB_API}`
    //   // );

    //   // let imdb_id = extIds.data.imdb_id;

    //   // if (content.) {
    //   //   (await getStreamable(imdb_id))
    //   //     ? responseContents.push({ ...content, imdb_id })
    //   //     : null;
    //   // }
    // }

    return newContent;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getTopRated(type, genres, page) {
  try {
    const sort_by = "popularity.desc";
    const include_adult = true;
    const include_video = true;
    const region = "IN";
    const releasedBefore = "2022-09-10";
    const lang = "hi||en";

    let responseContents = [];

    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${
        process.env.TMDB_API
      }&sort_by=${sort_by}&include_adult=${include_adult}&include_video=${include_video}&page=${page}&watch_region=${region}&region=${region}&${
        type == "movie" ? "release_date.lte" : "air_date.lte"
      }=${releasedBefore}&with_original_language=${lang}`
    );

    let contents = data.results;

    for (let index in contents) {
      let content = contents[index];
      let extIds = await axios.get(
        `https://api.themoviedb.org/3/${type}/${content.id}/external_ids?api_key=${process.env.TMDB_API}`
      );

      let imdb_id = extIds.data.imdb_id;

      if (imdb_id) {
        (await getStreamable(imdb_id))
          ? responseContents.push({ ...content, imdb_id })
          : null;
      }
    }

    return responseContents;
  } catch (err) {
    return false;
  }
}

async function getContent(type, genres, page, sort) {
  try {
    const sort_by =
      sort == "topRated"
        ? "popularity.desc"
        : type == "movie"
        ? "release_date.desc"
        : "first_air_date.desc";
    const include_adult = true;
    const include_video = true;
    const region = "IN";
    const releasedBefore = "2022-09-10";
    const lang = "hi||en";

    let responseContents = [];

    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${
        process.env.TMDB_API
      }&sort_by=${sort_by}&include_adult=${include_adult}&include_video=${include_video}&page=${page}&watch_region=${region}&region=${region}&${
        type == "movie" ? "release_date.lte" : "air_date.lte"
      }=${releasedBefore}&with_original_language=${lang}${
        genres ? `&with_genres=${genres}` : null
      }`
    );

    let contents = data.results;

    for (let index in contents) {
      let content = contents[index];
      let extIds = await axios.get(
        `https://api.themoviedb.org/3/${type}/${content.id}/external_ids?api_key=${process.env.TMDB_API}`
      );

      let imdb_id = extIds.data.imdb_id;

      if (imdb_id) {
        (await getStreamable(imdb_id))
          ? responseContents.push({ ...content, imdb_id })
          : null;
      }
    }

    return responseContents;
  } catch (err) {
    return false;
  }
}

export default handler;
