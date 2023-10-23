import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Row from "../components/Row";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { LottiePlayer } from "lottie-web";

const Home = () => {
  const [datasec, setdatasec] = useState({
    NetflixGlobal: {},
    NetflixIndia: {},
    FeaturedHollywood: {},
    FeaturedMovies: {},
    FeaturedBollywood: {},
    AmazonPrimeIndia: {},
    AmazonPrimeGlobal: {},
    Hotstar: {},
    Zee5: {},
    MostViewed: {},
    KoreanSeries: {},
    TrendingSeriesIndia: {},
  });
  console.log(datasec);
  // const [NetflixGlobal, setNetflixGlobal] = useState(null);
  // const [NetflixIndia, setNetflixIndia] = useState(null);
  // const [FeaturedHollywood, setFeaturedHollywood] = useState(null);
  // const [FeaturedMovies, setFeaturedMovies] = useState(null);
  // const [FeaturedBollywood, setFeaturedBollywood] = useState(null);
  // const [AmazonPrimeIndia, setAmazonPrimeIndia] = useState(null);
  // const [AmazonPrimeGlobal, setAmazonPrimeGlobal] = useState(null);
  // const [Hotstar, setHotstar] = useState(null);
  // const [Zee5, setZee5] = useState(null);
  // const [MostViewed, setMostViewed] = useState(null);
  // const [KoreanSeries, setKoreanSeries] = useState(null);
  // const [TrendingSeriesIndia, setTrendingSeriesIndia] = useState(null);
  useEffect(() => {
    var runed = 0;
    (async () => {
      await axios
        .get("/api/v2/getCollection?sort=home&wood=bolly&page=1")
        .then((response) => {
          runed++;
          console.log(runed);
          console.log("FeaturedBollywood", response.data);
          setdatasec((dat) => ({ ...dat, FeaturedBollywood: response.data }));
        });

      await axios
        .get(
          "/api/v2/getCollection?sort=provider&wood=holly&type=tv&provider=marvel-dc&page=1"
        )
        .then((response) => {
          runed++;
          console.log(runed);
          console.log("MostViewed", response.data);
          setdatasec((dat) => ({ ...dat, MostViewed: response.data }));
        });

      await axios
        .get(
          "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=hotstar"
        )
        .then((response) => {
          runed++;
          console.log(runed);
          console.log("Hotstar", response.data);
          setdatasec((dat) => ({ ...dat, Hotstar: response.data }));
        });
      await axios
        .get(
          "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=zee5"
        )
        .then((response) => {
          runed++;
          console.log(runed);
          console.log("Zee5", response.data);
          setdatasec((dat) => ({ ...dat, Zee5: response.data }));
        });

      await axios
        .get(
          "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=netflix"
        )
        .then((response) => {
          runed++;
          console.log(runed);
          console.log("NetflixIndia", response.data);
          setdatasec((dat) => ({ ...dat, NetflixIndia: response.data }));
        });

      await axios
        .get(
          "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=all&page=1"
        )
        .then((response) => {
          runed++;
          console.log(runed);
          console.log("TrendingSeriesIndia", response.data);
          setdatasec((dat) => ({ ...dat, TrendingSeriesIndia: response.data }));
        });

      await axios
        .get(
          "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=amazon-prime"
        )
        .then((response) => {
          runed++;
          console.log(runed);
          console.log("AmazonPrimeIndia", response.data);
          setdatasec((dat) => ({ ...dat, AmazonPrimeIndia: response.data }));
        });

      await axios
        .get(
          "/api/v2/getCollection?sort=provider&wood=holly&type=tv&provider=netflix"
        )
        .then((response) => {
          runed++;
          console.log(runed);
          console.log("NetflixGlobal", response.data);
          setdatasec((dat) => ({ ...dat, NetflixGlobal: response.data }));
        });

      await axios
        .get("/api/v2/getCollection?sort=home&wood=holly&page=1")
        .then((response) => {
          runed++;
          console.log(runed);
          console.log("FeaturedHollywood", response.data);
          setdatasec((dat) => ({ ...dat, FeaturedHollywood: response.data }));
        });

      await axios
        .get(
          "/api/v2/getCollection?sort=provider&wood=holly&type=tv&provider=korean-web"
        )
        .then((response) => {
          runed++;
          console.log(runed);
          console.log("KoreanSeries", response.data);
          setdatasec((dat) => ({ ...dat, KoreanSeries: response.data }));
        });

      await axios
        .get(
          "/api/v2/getCollection?sort=provider&wood=holly&type=tv&provider=amazon-prime-video"
        )
        .then((response) => {
          runed++;
          console.log(runed);
          console.log("AmazonPrimeGlobal", response.data);
          setdatasec((dat) => ({ ...dat, AmazonPrimeGlobal: response.data }));
        });
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     // await axios
  //     //   .get("/api/homepage?search=https://185.53.88.204/top-imdb/")
  //     //   .then((axdat) => {
  //     //     setdatasec((dat) => ({ ...dat, netflixOriginals: axdat.data }));
  //     //   });
  //     await axios
  //       .get(
  //         `/api/homepage?search=https://185.53.88.204/category/all-movies-and-tv-shows/`
  //       )
  //       .then((axdat1) => {
  //         setdatasec((dat) => ({ ...dat, trendingNow: axdat1.data }));
  //       });
  //     await axios.get(`/api/homepage`).then((axdat2) => {
  //       setdatasec((dat) => ({ ...dat, topRated: axdat2.data }));
  //     });
  //     await axios
  //       .get(`/api/homepage?search=https://185.53.88.204/category/action/`)
  //       .then((axdat7) => {
  //         setdatasec((dat) => ({ ...dat, actionMovies: axdat7.data }));
  //       });
  //     await axios
  //       .get(`/api/homepage?search=https://185.53.88.204/category/comedy/`)
  //       .then((axdat6) => {
  //         setdatasec((dat) => ({ ...dat, comedyMovies: axdat6.data }));
  //       });
  //     await axios
  //       .get(`/api/homepage?search=https://185.53.88.204/category/horror/`)
  //       .then((axdat4) => {
  //         setdatasec((dat) => ({ ...dat, horrorMovies: axdat4.data }));
  //       });
  //     await axios
  //       .get(`/api/homepage?search=https://185.53.88.204/category/romance/`)
  //       .then((axdat3) => {
  //         setdatasec((dat) => ({ ...dat, romanceMovies: axdat3.data }));
  //       });
  //     await axios
  //       .get(`/api/homepage?search=https://185.53.88.204/category/documentary/`)
  //       .then((axdat5) => {
  //         setdatasec((dat) => ({ ...dat, documentaries: axdat5.data }));
  //       });
  //   })();
  // }, []);

  return (
    <div
      className={`relative min-h-[100vh] bg-gradient-to-b from-gray-900/10 to-[#000000] lg:h-[100vh] `}
      // className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
      //   showModal && "!h-screen overflow-hidden"
      // }`}
    >
      <Head>
        <title>
          Home - Netflix
          {/* {movie?.title || movie?.original_name || "Home"} - Netflix */}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative md:pl-4 pb-[11rem] min-h-[100vh] lg:space-y-24 lg:pl-16 bg-gradient-to-t  to-[rgb(17,24,39)] from-[rgb(0,0,0)]">
        {/* <Banner netflixOriginals={netflixOriginals.data["Latest Results"]} /> */}

        <section className="flex flex-col md:gap-[0rem] gap-[1rem] pt-[2rem]">
          {datasec.TrendingSeriesIndia ? (
            <Row
              title={"Trending Now" + Math.random()}
              movies={datasec?.TrendingSeriesIndia}
            />
          ) : (
            ""
          )}
          {datasec.KoreanSeries ? (
            <Row
              title={"Top Rated" + Math.random()}
              movies={datasec?.KoreanSeries}
            />
          ) : (
            ""
          )}
          {datasec.MostViewed ? (
            <Row
              title={"Action Thrillers" + Math.random()}
              movies={datasec?.MostViewed}
            />
          ) : (
            ""
          )}
          {/* My List */}
          {/* {list.length > 0 && <Row title="My List" movies={list} />} */}
          {datasec.Zee5 ? (
            <Row title={"Comedies" + Math.random()} movies={datasec?.Zee5} />
          ) : (
            ""
          )}
          {datasec.Hotstar ? (
            <Row
              title={"Scary Movies" + Math.random()}
              movies={datasec?.Hotstar}
            />
          ) : (
            ""
          )}
          {datasec.AmazonPrimeGlobal ? (
            <Row
              title={"Romance Movies" + Math.random()}
              movies={datasec?.AmazonPrimeGlobal}
            />
          ) : (
            ""
          )}
          {datasec.FeaturedBollywood ? (
            <Row
              title={"Romance Movies" + Math.random()}
              movies={datasec?.FeaturedBollywood}
            />
          ) : (
            ""
          )}
          {datasec.FeaturedMovies ? (
            <Row
              title={"Romance Movies" + Math.random()}
              movies={datasec?.FeaturedMovies}
            />
          ) : (
            ""
          )}
          {datasec.FeaturedHollywood ? (
            <Row
              title={"Romance Movies" + Math.random()}
              movies={datasec?.FeaturedHollywood}
            />
          ) : (
            ""
          )}
          {datasec.NetflixIndia ? (
            <Row
              title={"Romance Movies2" + Math.random()}
              movies={datasec?.NetflixIndia}
            />
          ) : (
            ""
          )}
          {datasec.NetflixGlobal ? (
            <Row
              title={"Romance Movies1" + Math.random()}
              movies={datasec?.NetflixGlobal}
            />
          ) : (
            ""
          )}
          {datasec.AmazonPrimeIndia ? (
            <Row
              title={"Documentaries" + Math.random()}
              movies={datasec?.AmazonPrimeIndia}
            />
          ) : (
            <div className="flex items-center justify-center space-x-2 animate-bounce mt-20 h-[100%]">
              <div className="w-8 h-8 bg-blue-400 rounded-full animate-bounce-slow"></div>
              <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
              <div className="w-8 h-8 bg-red-400 rounded-full animate-bounce-slow"></div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;

// export const getServerSideProps = async () => {
//   var netflixOriginals = null;
//   fetch(
//     "https://moviesapi-erorr-404-aditya.koyeb.app/api/homepage?search=https://185.53.88.204/top-imdb/"
//   )
//     .then((res) => res.json())
//     .then((dat) => {
//       netflixOriginals = dat;
//     });
//   var trendingNow = null;
//   await fetch(
//     "https://moviesapi-erorr-404-aditya.koyeb.app/api/homepage?search=https://185.53.88.204/category/all-movies-and-tv-shows/"
//   )
//     .then((res) => res.json())
//     .then((dat) => {
//       trendingNow = dat;
//     });
//   var topRated = null;
//   await fetch("https://moviesapi-erorr-404-aditya.koyeb.app/api/homepage")
//     .then((res) => res.json())
//     .then((dat) => {
//       topRated = dat;
//     });
//   var actionMovies = null;
//   await fetch(
//     "https://moviesapi-erorr-404-aditya.koyeb.app/api/homepage?search=https://185.53.88.204/category/action/"
//   )
//     .then((res) => res.json())
//     .then((dat) => {
//       actionMovies = dat;
//     });
//   var comedyMovies = null;
//   await fetch(
//     "https://moviesapi-erorr-404-aditya.koyeb.app/api/homepage?search=https://185.53.88.204/category/comedy/"
//   )
//     .then((res) => res.json())
//     .then((dat) => {
//       comedyMovies = dat;
//     });
//   var horrorMovies = null;
//   await fetch(
//     "https://moviesapi-erorr-404-aditya.koyeb.app/api/homepage?search=https://185.53.88.204/category/horror/"
//   )
//     .then((res) => res.json())
//     .then((dat) => {
//       horrorMovies = dat;
//     });
//   var romanceMovies = null;
//   await fetch(
//     "https://moviesapi-erorr-404-aditya.koyeb.app/api/homepage?search=https://185.53.88.204/category/romance/"
//   )
//     .then((res) => res.json())
//     .then((dat) => {
//       romanceMovies = dat;
//     });
//   var documentaries = null;
//   await fetch(
//     "https://moviesapi-erorr-404-aditya.koyeb.app/api/homepage?search=https://185.53.88.204/category/documentary/"
//   )
//     .then((res) => res.json())
//     .then((dat) => {
//       documentaries = dat;
//     });

//   return {
//     props: {
//       netflixOriginals: netflixOriginals,
//       trendingNow: trendingNow,
//       topRated: topRated,
//       actionMovies: actionMovies,
//       comedyMovies: comedyMovies,
//       horrorMovies: horrorMovies,
//       romanceMovies: romanceMovies,
//       documentaries: documentaries,
//     },
//   };
// };
