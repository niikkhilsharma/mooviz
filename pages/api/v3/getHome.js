import nc from "next-connect";
import dbConnect from "../../../lib/database/dbconnect";
import bgprocessModel from "../../../lib/database/models/bgprocessModel";
import reqCacheModel from "../../../lib/database/models/reqCacheModel";
import { encrypthex } from "../../../lib/encryption/encryption";
import verifyToken from "../../../lib/jsonWebToken/verifytoken";

var axios = require("axios");
var jquery = require("jquery");
var jsdom = require("jsdom");
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
  .get((req, res) => {
    (async () => {
      try {
        await dbConnect();

        var homeCache = await reqCacheModel.findOne({ cacheid: "home" });

        //   console.log(homeCache);
        let current = new Date().getTime();

        if (homeCache != null && req.query.force != "true") {
          if (
            homeCache.cachetime &&
            current - parseInt(homeCache.cachetime) < 3600000 //120000
          ) {
            res.send({ accepted: true, data: homeCache.cache });
          } else {
            var processCache = await bgprocessModel.findOne({
              cacheid: "homeCache",
            });

            if (processCache == null) {
              console.log("Updating Cache");

              var new_process = new bgprocessModel({
                processid: "homeCache",
                cachetime: current,
              });

              await new_process.save();

              getData(current);
            } else {
              if (current - processCache.cachetime > 60000) {
                console.log("Process Expired Trying Again");
                await bgprocessModel.updateOne(
                  { cacheid: "home" },
                  {
                    processid: "homeCache",
                    cachetime: current,
                  }
                );

                getData(current);
              } else {
                console.log("Process Already Running");
              }
            }

            res.send({ accepted: true, data: homeCache.cache });
          }
        } else {
          console.log("New");
          await getData(current);

          res.send({ accepted: true, data: [] });
        }
      } catch (error) {
        res.status(404).end("Something went wrong");

        console.log(error);
      }
    })();
  });

export default handler;

async function getData(current) {
  //   console.log("jj");

  let t = new Date();
  t.setDate(t.getDate() - 1);

  var release = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;

  let latestMovies = await getLatestM("movie", "", "1", release, false);
  let popularMovies = await getPopularM("movie", "", "1", release, false);
  let NowPlayingMovies = await getNowPlaying("movie", "", "1", release, false);
  // let SeriesOnAir = await getNowPlaying("tv", "", "1", release, false);
  let latestSeries = await getLatestM("tv", "", "1", release, false);
  let popularSeries = await getPopularM("tv", "", "1", release, false);
  var popularSeriesImdb = await getPopularImdbSeries();
  var AllBanners = await getAllBanner();
  // let latestNetflix = await getLatestM("tv", "", "1", release, "213");
  // let latestHotstar = await getLatestM(
  //   "tv",
  //   "",
  //   "1",
  //   release,
  //   "3919||6029||6074"
  // );
  // let latestPrime = await getLatestM("tv", "", "1", release, "1024");
  // let latestVoot = await getLatestM("tv", "", "1", release, "2532");

  let OldApiData = await getOldApiData();

  let resp = {
    "In Theaters": NowPlayingMovies,
    "Latest Movies": latestMovies,
    "Trending Series": popularSeriesImdb,
    "Popular Movies": popularMovies,
    // "Series OnAir": SeriesOnAir,
    "Latest Series": latestSeries,
    "Popular Series": popularSeries,
    Trending: AllBanners,
    ...OldApiData,

    // latestHotstar,
    // latestNetflix,
    // latestPrime,
    // latestVoot,
  };
  reqCacheModel.updateOne(
    { cacheid: "home" },
    {
      cacheid: "home",
      cachetime: current,
      cache: resp,
      timestring: new Date(current).toISOString(),
    },
    (err, data) => {
      if (err) {
        console.error(err);
      } else {
        bgprocessModel.deleteOne({ processid: "homeCache" }, () => {
          console.log("Home Cache Updated");
        });
      }
    }
  );

  return resp;
}

async function getPopularImdbSeries() {
  var data = await axios
    .post("https://www.imdb.com/chart/tvmeter/?ref_=nv_tvv_mptv")
    .then((d) => d.data);
  var dom = new jsdom.JSDOM(data);
  var $ = jquery(dom.window);
  // console.log()
  var dataarray = [];
  $(".lister-list")
    .children()
    .each((ind, el) =>
      dataarray.push({
        overview: "",
        type: "tv",
        mode: "imdb",
        poster:
          el.querySelector("img").src.split(".").slice(0, -2).join(".") +
          "." +
          "_V1_QL75_UX380_CR0,0,380,562_" +
          "." +
          el.querySelector("img").src.split(".").at(-1),
        title: el.querySelectorAll("a")[1].innerHTML,
        tid: btoa(
          JSON.stringify(
            encrypthex(
              JSON.stringify(el.querySelectorAll("a")[1].href.split("/")[2])
            )
          )
        ),
        link: btoa(
          JSON.stringify(
            encrypthex(
              JSON.stringify(el.querySelectorAll("a")[1].href.split("/")[2])
            )
          )
        ),
      })
    );
  return dataarray;
}

async function getAllBanner() {
  var axres = await axios
    .get("https://api.themoviedb.org/3/trending/all/week?language=en-US", {
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjcyZTgyNzI3NTA2MGY1MzRmZjE5MGU3N2E2Zjc3ZSIsInN1YiI6IjY0N2E3MDk5ZTMyM2YzMDEwNjE0YTJlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Ep9W3DHx0HBEq2aYP2pVyyGdxvRYIXx8fFLZwhXWrw",
      },
    })
    .then((d) => d.data);
  var movielist = axres.results;
  for (const movie of movielist) {
    var imdb_id = await getImdbId(movie.id);
    if (imdb_id) {
      var index = movielist.indexOf(movie);
      movielist[index]["imdb_id"] = imdb_id;
      movielist[index]["poster"] =
        "https://image.tmdb.org/t/p/w200/" + movie.poster_path;
      movielist[index]["tid"] = btoa(
        JSON.stringify(encrypthex(JSON.stringify(movie.id)))
      );
      movielist[index]["link"] = btoa(
        JSON.stringify(encrypthex(JSON.stringify(movie.id)))
      );
      movielist[index]["type"] = movie.media_type;
      movielist[index]["mode"] = "tmdb";
    }
  }
  return movielist;
}

async function getImdbId(tmdb_id) {
  try {
    var axres = await axios
      .get("https://api.themoviedb.org/3/movie/" + tmdb_id, {
        headers: {
          Authorization:
            "bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjcyZTgyNzI3NTA2MGY1MzRmZjE5MGU3N2E2Zjc3ZSIsInN1YiI6IjY0N2E3MDk5ZTMyM2YzMDEwNjE0YTJlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Ep9W3DHx0HBEq2aYP2pVyyGdxvRYIXx8fFLZwhXWrw",
        },
      })
      .then((d) => d.data)
      .catch((er) => console.log(er));
    return axres.imdb_id;
  } catch (error) {
    return "";
  }
}

async function getLatestM(type, genres, page, release, provider) {
  try {
    const sort_by =
      type == "movie" ? "release_date.desc" : "first_air_date.desc";
    const include_adult = true;
    const include_video = false;
    const region = "IN";
    const releasedBefore = release;
    const lang = "hi||en";
    const release_type = "3||4";

    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${
        process.env.TMDB_API
      }&sort_by=${sort_by}&include_adult=${include_adult}&include_video=${include_video}&page=${page}&region=${region}&${
        type == "movie" ? "release_date.lte" : "air_date.lte"
      }=${releasedBefore}&with_original_language=${lang}${
        provider ? `&with_watch_providers=${provider}` : ""
      }&with_release_type=${release_type}`
    );

    let contents = data.results;

    let filtred = contents.filter(
      (item) =>
        item.poster_path != null &&
        item.backdrop_path != null &&
        item.overview != null &&
        item.overview != "" &&
        (type == "tv" || !item.title.includes("Live"))
    );

    let newContent = filtred.map((item) => {
      return {
        poster: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
        // banner: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
        title: type == "movie" ? item.title : item.name,
        tid: btoa(JSON.stringify(encrypthex(JSON.stringify(item.id)))),
        link: btoa(JSON.stringify(encrypthex(JSON.stringify(item.id)))),
        overview: item.overview,
        genre: item.genre_ids,
        type: type,
        mode: "tmdb",
      };
    });

    // console.log(JSON.stringify(filtred.map((item) => item.popularity)));

    return newContent;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getPopularM(type, genres, page, release) {
  try {
    const sort_by = type == "movie" ? "popularity.desc" : "popularity.desc";
    const include_adult = true;
    const include_video = false;
    const region = "IN";
    const releasedBefore = release;
    const lang = "hi||en";
    const release_type = "3||4";

    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/popular?api_key=${process.env.TMDB_API}&page=${page}`
    );
    let data2 = await axios
      .get(
        `https://api.themoviedb.org/3/${type}/popular?api_key=${
          process.env.TMDB_API
        }&page=${page + 1}`
      )
      .then((d) => d.data);

    // console.log(data);

    let contents = [...data.results, ...data2.results];
    console.log(contents);
    let filtred = contents.filter(
      (item) =>
        item.poster_path != null &&
        item.backdrop_path != null &&
        item.overview != null &&
        item.overview != "" &&
        !item?.origin_country?.includes("IN")
    );

    // console.log(filtred);
    let newContent = filtred.map((item) => {
      return {
        poster: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
        banner: `https://image.tmdb.org/t/p/w200${item.backdrop_path}`,
        title: type == "movie" ? item.title : item.name,
        tid: btoa(JSON.stringify(encrypthex(JSON.stringify(item.id)))),
        link: btoa(JSON.stringify(encrypthex(JSON.stringify(item.id)))),
        overview: item.overview,
        genre: item.genre_ids,
        type: type,
        mode: "tmdb",
      };
    });

    // console.log(newContent);

    return newContent;
  } catch (err) {
    console.log(err);

    return false;
  }
}

async function getNowPlaying(type, genres, page, release) {
  try {
    const sort_by = type == "movie" ? "popularity.desc" : "popularity.desc";
    const include_adult = true;
    const include_video = false;
    const region = "IN";
    const releasedBefore = release;
    const lang = "hi||en";
    const release_type = "3||4";

    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${
        type == "movie" ? "now_playing" : "on_the_air"
      }?api_key=${process.env.TMDB_API}&page=${page}&region=${region}`
    );

    // console.log(data);

    let contents = data.results;

    let filtred = contents.filter(
      (item) =>
        item.poster_path != null &&
        item.backdrop_path != null &&
        item.overview != null &&
        item.overview != ""
    );

    let newContent = filtred.map((item) => {
      return {
        poster: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
        banner: `https://image.tmdb.org/t/p/w200${item.backdrop_path}`,
        title: type == "movie" ? item.title : item.name,
        tid: btoa(JSON.stringify(encrypthex(JSON.stringify(item.id)))),
        link: btoa(JSON.stringify(encrypthex(JSON.stringify(item.id)))),
        overview: item.overview,
        genre: item.genre_ids,
        type: type,
        mode: "tmdb",
      };
    });

    // console.log(newContent);

    return newContent;
  } catch (err) {
    console.log(err);

    return false;
  }
}

async function getOldApiData() {
  let tmpObj = {};

  // await axios
  //   .get(
  //     process.env.HOST_URL + "/api/v2/getCollection?sort=home&wood=bolly&page=1"
  //   )
  //   .then((response) => {
  //     if (response.data && response.data.length > 0) {
  //       tmpObj["Featured Bollywood"] = response.data.map((item) => {
  //         return { ...item, mode: "link" };
  //       });
  //       console.log(Object.keys(tmpObj));
  //     }
  //     // setdatasec((dat) => ({ ...dat, FeaturedBollywood: response.data }));
  //     // nowmovcontext.setAllHomeMoviesData((dat) => ({
  //     //   ...dat,
  //     //   FeaturedBollywood: response.data,
  //     // }));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  await axios
    .get(
      process.env.HOST_URL +
        "/api/v2/getCollection?sort=provider&wood=holly&type=tv&provider=marvel-dc&page=1"
    )
    .then((response) => {
      if (response.data && response.data.length > 0) {
        tmpObj["Most Viewed"] = response.data.map((item) => {
          return {
            ...item,
            mode: "link",
            link: btoa(JSON.stringify(encrypthex(JSON.stringify(item.link)))),
          };
        });
        // console.log(Object.keys(tmpObj));
      }
      // setdatasec((dat) => ({ ...dat, MostViewed: response.data }));
      // nowmovcontext.setAllHomeMoviesData((dat) => ({
      //   ...dat,
      //   MostViewed: response.data,
      // }));
    })
    .catch((error) => {
      console.log(error);
    });

  await axios
    .get(
      process.env.HOST_URL +
        "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=hotstar"
    )
    .then((response) => {
      if (response.data && response.data.length > 0) {
        tmpObj["Hotstar Specials"] = response.data.map((item) => {
          return {
            ...item,
            mode: "link",
            link: btoa(JSON.stringify(encrypthex(JSON.stringify(item.link)))),
          };
        });
        // console.log(Object.keys(tmpObj));
      }
      // setdatasec((dat) => ({ ...dat, Hotstar: response.data }));
      // nowmovcontext.setAllHomeMoviesData((dat) => ({
      //   ...dat,
      //   Hotstar: response.data,
      // }));
    })
    .catch((error) => {
      console.log(error);
    });

  await axios
    .get(
      process.env.HOST_URL +
        "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=zee5"
    )
    .then((response) => {
      if (response.data && response.data.length > 0) {
        tmpObj["Zee5 Originals"] = response.data.map((item) => {
          return {
            ...item,
            mode: "link",
            link: btoa(JSON.stringify(encrypthex(JSON.stringify(item.link)))),
          };
        });
        // console.log(Object.keys(tmpObj));
      }
      // setdatasec((dat) => ({ ...dat, Zee5: response.data }));
      // nowmovcontext.setAllHomeMoviesData((dat) => ({
      //   ...dat,
      //   Zee5: response.data,
      // }));
    })
    .catch((error) => {
      console.log(error);
    });

  await axios
    .get(
      process.env.HOST_URL +
        "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=netflix"
    )
    .then((response) => {
      if (response.data && response.data.length > 0) {
        tmpObj["Netflix India"] = response.data.map((item) => {
          return {
            ...item,
            mode: "link",
            link: btoa(JSON.stringify(encrypthex(JSON.stringify(item.link)))),
          };
        });
        // console.log(Object.keys(tmpObj));
      }
      // setdatasec((dat) => ({ ...dat, NetflixIndia: response.data }));
      // nowmovcontext.setAllHomeMoviesData((dat) => ({
      //   ...dat,
      //   NetflixIndia: response.data,
      // }));
    })
    .catch((error) => {
      console.log(error);
    });

  await axios
    .get(
      process.env.HOST_URL +
        "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=all&page=1"
    )
    .then((response) => {
      if (response.data && response.data.length > 0) {
        tmpObj["Trending India"] = response.data.map((item) => {
          return {
            ...item,
            mode: "link",
            link: btoa(JSON.stringify(encrypthex(JSON.stringify(item.link)))),
          };
        });
        // console.log(Object.keys(tmpObj));
      }
      // setdatasec((dat) => ({
      //   ...dat,
      //   TrendingSeriesIndia: response.data,
      // }));
      // nowmovcontext.setAllHomeMoviesData((dat) => ({
      //   ...dat,
      //   TrendingSeriesIndia: response.data,
      // }));
    })
    .catch((error) => {
      console.log(error);
    });

  await axios
    .get(
      process.env.HOST_URL +
        "/api/v2/getCollection?sort=provider&wood=holly&type=tv&provider=korean-web"
    )
    .then((response) => {
      if (response.data && response.data.length > 0) {
        tmpObj["Korean Series"] = response.data.map((item) => {
          return {
            ...item,
            mode: "link",
            link: btoa(JSON.stringify(encrypthex(JSON.stringify(item.link)))),
          };
        });
        // console.log(Object.keys(tmpObj));
      }
      // setdatasec((dat) => ({ ...dat, KoreanSeries: response.data }));
      // nowmovcontext.setAllHomeMoviesData((dat) => ({
      //   ...dat,
      //   KoreanSeries: response.data,
      // }));
    })
    .catch((error) => {
      console.log(error);
    });

  await axios
    .get(
      process.env.HOST_URL + "/api/v2/getCollection?sort=home&wood=holly&page=1"
    )
    .then((response) => {
      if (response.data && response.data.length > 0) {
        // console.log()
        tmpObj["Featured Hollywood"] = response.data.map((item) => {
          return {
            ...item,
            mode: "link",
            link: btoa(JSON.stringify(encrypthex(JSON.stringify(item.link)))),
          };
        });
        // console.log(Object.keys(tmpObj));
      }
      // setdatasec((dat) => ({ ...dat, FeaturedHollywood: response.data }));
      // nowmovcontext.setAllHomeMoviesData((dat) => ({
      //   ...dat,
      //   FeaturedHollywood: response.data,
      // }));
    })
    .catch((error) => {
      console.log(error);
    });

  await axios
    .get(
      process.env.HOST_URL +
        "/api/v2/getCollection?sort=provider&wood=holly&type=tv&provider=netflix"
    )
    .then((response) => {
      if (response.data && response.data.length > 0) {
        tmpObj["Netflix Global"] = response.data.map((item) => {
          return {
            ...item,
            mode: "link",
            link: btoa(JSON.stringify(encrypthex(JSON.stringify(item.link)))),
          };
        });
        // console.log(Object.keys(tmpObj));
      }
      // setdatasec((dat) => ({ ...dat, NetflixGlobal: response.data }));
      // nowmovcontext.setAllHomeMoviesData((dat) => ({
      //   ...dat,
      //   NetflixGlobal: response.data,
      // }));
    })
    .catch((error) => {
      console.log(error);
    });

  await axios
    .get(
      process.env.HOST_URL +
        "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=amazon-prime"
    )
    .then((response) => {
      if (response.data && response.data.length > 0) {
        tmpObj["AmazonPrime India"] = response.data.map((item) => {
          return {
            ...item,
            mode: "link",
            link: btoa(JSON.stringify(encrypthex(JSON.stringify(item.link)))),
          };
        });
        // console.log(Object.keys(tmpObj));
      }
      // setdatasec((dat) => ({ ...dat, AmazonPrimeIndia: response.data }));
      // nowmovcontext.setAllHomeMoviesData((dat) => ({
      //   ...dat,
      //   AmazonPrimeIndia: response.data,
      // }));
    })
    .catch((error) => {
      console.log(error);
    });

  await axios
    .get(
      process.env.HOST_URL +
        "/api/v2/getCollection?sort=provider&wood=holly&type=tv&provider=amazon-prime-video"
    )
    .then((response) => {
      if (response.data && response.data.length > 0) {
        tmpObj["AmazonPrime Global"] = response.data.map((item) => {
          return {
            ...item,
            mode: "link",
            link: btoa(JSON.stringify(encrypthex(JSON.stringify(item.link)))),
          };
        });
        // console.log(Object.keys(tmpObj));
      }
      // setdatasec((dat) => ({ ...dat, AmazonPrimeGlobal: response.data }));
      // nowmovcontext.setAllHomeMoviesData((dat) => ({
      //   ...dat,
      //   AmazonPrimeGlobal: response.data,
      // }));
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(Object.keys(tmpObj));
  return tmpObj;
}
