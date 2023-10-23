import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import $ from "jquery";
import { allhomemovies } from "../context/allcontexts";

const MovieDetails = () => {
  const router = useRouter();
  const movietvsdesc = useRef(null);
  var { toploadingbarref } = useContext(allhomemovies);
  useEffect(() => {}, []);

  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  const [movdetails, setmovdetails] = useState({});
  const [Movie, setMovie] = useState({});
  // const [secMovie, setsecMovie] = useState();
  const [Casting, setCasting] = useState();
  const [SeriesData, setSeriesData] = useState([]);
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9

  // useEffect(() => {
  //   console.log("changed");
  // }, []);

  useEffect(() => {
    if (Movie?.imdbID) {
      toploadingbarref?.current?.complete();
    }
  }, [Movie]);

  useEffect(() => {
    document.querySelector("#navfixed").classList.remove("hidden");
  }, []);

  useEffect(() => {
    if (setMovie) {
      setMovie("");
      setCasting([]);
      setSeriesData([]);
    }
    (async () => {
      var data1 = await axios.get(
        `/api/v2/getMovie?${
          window.location.href.includes("imdb")
            ? "imdbID=" +
              getParameterByName("imdbID") +
              "&mode=imdb" +
              `${window.location.href.includes("super") ? "&super=true" : ""}`
            : getParameterByName("mode") != "tmdb"
            ? "movdata=" +
              atob(getParameterByName("l")) +
              "&mode=" +
              getParameterByName("mode")
            : "movdata=" +
              atob(getParameterByName("l")) +
              "&mode=" +
              getParameterByName("mode") +
              "&type=" +
              getParameterByName("type")
        }`
      );

      setMovie(data1.data);
      if (data1?.data?.tmdbID) {
        var { data } = await axios.get(
          `/api/v2/getCasting?tmdb=${data1.data.tmdbID}&type=${
            data1.data.isWebseries ? "tv" : "movie"
          }`
        );
        setCasting(data);
      }
      if (data1.data.isWebseries) {
        (async () => {
          var { data } = await axios.get(
            `/api/getEpisodes?imdb=${data1.data.imdbID}&tmdb=${data1.data.tmdbID}&s=all`
          );
          // Movie?.isWebseries ? console.log(data) : null;
          setSeriesData(data);
        })();
      }
    })();
  }, [router.query]);

  useEffect(() => {
    movietvsdesc?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [movietvsdesc?.current]);

  // useEffect(() => {
  //   (async () => {
  //     await axios
  //       .get(`/api/getmovie?movdata=${atob(getParameterByName("l"))}`)
  //       .then(({ data }) => {
  //         console.log(data[0]);
  //         setmovdetails(data[0].MovDetails);
  //       })
  //       .catch((er) => console.log(er));
  //   })();
  // }, []);

  return (
    <>
      <div>
        {/* {Movie ? ( */}
        <div className="overflow-x-hidden">
          <div className="absolute z-[-1] w-full ">
            <div className="relative">
              <img
                alt={Movie?.tmdbTitle}
                src={Movie?.banner}
                // alt=""
                className="w-[100%] pointer-events-none h-[85vh] object-cover object-center border-0"
              />
              <div className="absolute bottom-0 h-[100%] before:contents before:absolute bg-gradient-to-t from-black  to-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0)] w-[100vw]"></div>
            </div>
            {/* <div className=" bottom-0 block w-full h-[7rem] bg-gradient-to-t to-black from-[rgb(0,0,0)]"></div> */}
          </div>
          <div className="bck-translate-y-[-50%]  transition-all duration-500 1bg-gradient-to-t to-[rgba(0,0,0,0)]  via-black from-black">
            <div className="pt-[60vh] flex justify-center md:justify-start">
              <div className="flex  md:flex-row flex-col-reverse justify-center items-center md:justify-start md:items-start">
                <div className="flex justify-center md:p-0 p-2 gap-[0.8rem] md:items-center mt-[2rem]">
                  <div className="flex flex-col ">
                    <div
                      onClick={() => {
                        router.push("/");
                      }}
                      className="md:flex hidden items-center md:ml-10 mb-10 gap-2 pl-[1rem]  justify-start top-[6rem] left-[3rem] rounded-md h-[3rem] w-[10rem] border-2 border-[rgba(51,65,85,0.2)] bg-[rgba(0,0,0,0.2)] cursor-pointer hover:bg-[rgba(0,0,0,0.3)] backdrop-blur-[1px]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                      </svg>

                      <h3 className="text-xl pb-[2.5px]">Back</h3>
                    </div>
                    <div
                      className={`rounded-xl bg-gradient-to-t min-h-[12rem] md:min-h-[22rem] md:ml-10 pt-[3px] pb-[3px] pl-[3px] pr-[3px] 1border-white 1border-2 1to-white 1from-[rgb(0,0,0)] from1-[rgba(0,0,0,1)]`}
                    >
                      <div
                        role="status"
                        className="flex justify-center items-center min-h-[22rem] min-w-[15.6rem] bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
                      />
                      {Movie?.poster ? (
                        <>
                          <Image
                            className="rounded-lg  "
                            // src={movdetails.poster}
                            src={`${Movie?.poster}`}
                            alt=""
                            onLoad={(el) => {
                              el.currentTarget.parentElement.previousElementSibling.classList.add(
                                "hidden"
                              );
                              el.currentTarget.parentElement.previousElementSibling.classList.remove(
                                "flex"
                              );
                            }}
                            width={screen.width >= 500 ? 250 : 150}
                            height={(screen.width >= 500 ? 250 : 150) / ratio}
                            layout="fixed" // you can use "responsive", "fill" or the default "intrinsic"
                            onLoadingComplete={({
                              naturalWidth,
                              naturalHeight,
                            }) => setRatio(naturalWidth / naturalHeight)}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className=" flex md:hidden  flex-col /items-center  /pt-[2rem] h3-center md:h3-start">
                    {Movie?.tmdbTitle ? (
                      <>
                        <h3
                          className="h3-2xl font-semibold"
                          style={{ fontFamily: "" }}
                        >
                          Plot
                        </h3>
                        <h3
                          // id="movie-tvs-desc"
                          ref={movietvsdesc}
                          className="text-slate-300 line-clamp-[12] h3-lg text-xs h3-slate-200 md:px-0  md:pt-0 /pt-4 md:max-w-[70%]"
                        >
                          {Movie?.overview}
                        </h3>
                      </>
                    ) : (
                      <div
                        role="status"
                        className="space-y-2.5 animate-pulse max-w-lg"
                      >
                        <div className="flex items-center space-x-2 w-full">
                          <div className="h-[0.9rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[2remrem]"></div>
                          <div className="h-[0.9rem] bg-gray-300 rounded-full dark:bg-gray-600 w-[2remrem]"></div>
                          <div className="h-[0.9rem] bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div className="flex items-center w-full space-x-2 max-w-[480px]">
                          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                          <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                          <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-[2remrem]"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="translate-y-0 md:translate-y-[40%] md:pl-[3.5rem]">
                  <div
                    className="text-[2rem] md:mt-[1rem] md:h3-4xl font-semibold flex md:justify-start justify-center"
                    style={{ fontFamily: "Exo 2" }}
                  >
                    {Movie?.tmdbTitle ? (
                      <h3 className="line-clamp-1">{Movie?.tmdbTitle}</h3>
                    ) : (
                      <div className="h-[2.5rem] mt-[1rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[15rem] animate-pulse mb-4"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex max-w-[17rem] pl-2 items-center md:justify-start justify-center pt-[1rem] md:pt-[2rem] gap-[6px] flex-wrap">
                      {Movie?.tmdbGenre ? (
                        Movie?.tmdbGenre?.map((el) => {
                          return (
                            <h3
                              key={el.id}
                              className="tracking-wide py-1 rounded-lg px-3 bg-gray-800 "
                              style={{ fontFamily: "Roboto Condensed" }}
                            >
                              {el.name}
                            </h3>
                          );
                        })
                      ) : (
                        <>
                          <div className="h-[2rem] bg-gray-200 animate-pulse rounded-lg dark:bg-gray-700 w-32"></div>
                          <div className="h-[2rem] bg-gray-300 animate-pulse rounded-lg dark:bg-gray-600 w-24"></div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className=" hidden md:flex items-baseline flex-col  justify-center pt-[3rem] h3-center md:h3-start">
                    <button
                      onClick={() => {
                        if (Movie?.imdbID) {
                          toploadingbarref.current.continuousStart();
                          router.push({
                            pathname: "/SupportPlayer",
                            query: {
                              d: Movie?.imdbID,
                              t: Movie?.tmdbTitle,
                              ty: Movie?.type,
                              w: Movie?.isWebseries,
                              backdrop: Movie?.banner,
                              release: Movie?.release
                                ? Movie?.release.split("-")[0]
                                : null,
                              tmdb: Movie?.tmdbID,
                              server: Movie?.available,
                              duration: Movie?.duration || 0,
                            },
                          });
                        }
                      }}
                      style={{ fontFamily: "Poppins" }}
                      // className="px-[6rem] btn-0 py-[1.2rem] h3-2xl font-medium tracking-wider  elevation-24 rounded-full"
                      className="1px-[6rem]  w-[7rem] btn-0 before:transition-all before:duration-500  py-[0.7rem] h3-lg font-semibold tracking-wider elevation-24 rounded-full border-2 border-gray-500 bg-[rgba(31,41,55,0.2)]"
                    >
                      Play
                    </button>
                  </div>
                </div>
                <div className="justify-center items-center"></div>
              </div>
            </div>
            <div className=" md:hidden flex flex-row items-center justify-evenly pt-[3rem] h3-center md:h3-start">
              <button
                onClick={() => {
                  if (Movie?.imdbID) {
                    toploadingbarref.current.continuousStart();
                    router.push({
                      pathname: "/SupportPlayer",
                      query: {
                        d: Movie?.imdbID,
                        t: Movie?.tmdbTitle,
                        ty: Movie?.type,
                        w: Movie?.isWebseries,
                        release: Movie?.release
                          ? Movie?.release.split("-")[0]
                          : null,
                        tmdb: Movie?.tmdbID,
                        server: Movie?.available,
                        duration: Movie?.duration || 0,
                      },
                    });
                  }
                }}
                style={{ fontFamily: "Poppins" }}
                // className="px-[6rem] btn-0 py-[1.2rem] h3-2xl font-medium tracking-wider  elevation-24 rounded-full"
                className="1px-[6rem]  w-[7rem] btn-0 before:transition-all before:duration-500  py-[0.7rem] h3-lg font-semibold tracking-wider elevation-24 rounded-full border-2 border-gray-500 bg-[rgba(31,41,55,0.2)]"
              >
                Play
              </button>
            </div>
            <div className=" md:flex hidden  flex-col items-center  pt-[2rem] h3-center md:h3-start">
              {Movie?.tmdbTitle ? (
                <>
                  <h3
                    className="h3-2xl font-semibold"
                    style={{ fontFamily: "" }}
                  >
                    More About {`"${Movie?.tmdbTitle}"`}
                  </h3>

                  <h3
                    // id="movie-tvs-desc"
                    ref={movietvsdesc}
                    className="text-slate-300 h3-lg h3-slate-200 md:px-0 px-4 md:pt-0 pt-4 md:max-w-[70%]"
                  >
                    {Movie?.overview}
                  </h3>
                </>
              ) : (
                <div
                  role="status"
                  className="space-y-2.5 animate-pulse max-w-lg"
                >
                  <div className="flex items-center space-x-2 w-full">
                    <div className="h-[0.9rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[12rem]"></div>
                    <div className="h-[0.9rem] bg-gray-300 rounded-full dark:bg-gray-600 w-[9rem]"></div>
                    <div className="h-[0.9rem] bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  </div>
                  <div className="flex items-center w-full space-x-2 max-w-[480px]">
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-[12rem]"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            {Movie?.trailer ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  // width: "100%",
                  justifyContent: "center",
                  marginTop: 80,
                }}
              >
                <iframe
                  style={{ borderRadius: 20 }}
                  className="w-[95vw] h-[95vw] md:w-[70vw] md:h-[70vh]"
                  width="1000"
                  height="562"
                  src={`https://www.youtube.com/embed/${
                    Movie?.trailer
                  }?controls=0&autoplay=1&playlist=${Movie?.videos
                    .map((item) => item.key)
                    .join(",")}&modestbranding=1&loop=1&fs=1`}
                  title="Trailer"
                  frameBorder="0"
                  // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : null}
            <div
              className="flex flex-col "
              // style={{ marginTop: Movie?.trailer ? -350 : 0 }}
            >
              <div className="flex-col     w-[97%] gap-[1rem] relative  md:ml-[1rem]  flex   ">
                <div className="relative">
                  <div className="absolute block w-[0.3rem] h-[2.5rem] rounded-lg left-0 bottom-0  translate-y-[-0.5rem] translate-x-[-10px] bg-red-700" />
                  <h3
                    style={{ fontFamily: "Poppins" }}
                    className="p-4  h3-3xl font-semibold"
                  >
                    Cast
                  </h3>
                </div>

                {/* <button
                  style={{ fontFamily: "Poppins" }}
                  className="1px-[6rem] w-[10rem] btn-0 before:transition-all before:duration-500 py-[0.7rem] h3-lg font-medium tracking-wider  elevation-24 rounded-full border-2 border-gray-500 bg-[rgba(31,41,55,0.2)]"
                  >
                  Wishlist
                </button> */}
              </div>
              <div className="mx-[4px] flex gap-[1rem] overflow-x-scroll scrollbar-hide w-[98vw] overflow-y-hidden ">
                {Casting
                  ? Casting.map((el) => {
                      return (
                        <div key={el.id}>
                          <div className=" group flex flex-col cursor-pointer justify-center hover:scale-105 items-center gap-2 transition-all duration-500 ">
                            <div className="w-full">
                              <Image
                                className="rounded-xl md:rounded-tl-[30%] md:w-[5rem] md:rounded-br-[30%] cursor-pointer md:group-hover:rounded-[10rem] transition-all ease-out duration-500 "
                                // src={movdetails.poster}
                                src={`https://image.tmdb.org/t/p/original${el.profile_path}`}
                                alt=""
                                width={screen.width >= 500 ? 150 : 80}
                                height={
                                  (screen.width >= 500 ? 150 : 80) / ratio
                                }
                                onError={(el) => {
                                  // el.currentTarget.src =
                                  //   "https://res.cloudinary.com/dk3vn0s8q/image/upload/v1669877542/icons8-administrator-male-96_idxnio.png";
                                  // el.currentTarget.srcset = "";
                                  // el.currentTarget.style.filter = "invert(100)";
                                }}
                                layout="fixed" // you can use "responsive", "fill" or the default "intrinsic"
                                onLoadingComplete={({
                                  naturalWidth,
                                  naturalHeight,
                                }) => setRatio(naturalWidth / naturalHeight)}
                              />
                            </div>
                          </div>
                          <h3
                            style={{ fontFamily: "Poppins" }}
                            className="md:text-base text-[0.6rem] line-clip-1 text-center"
                          >
                            {el.name}
                          </h3>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>

          {SeriesData.length > 0 ? (
            <div style={{ marginTop: 10 }}>
              {SeriesData.map((season) => {
                // console.log(
                //   SeriesData.indexOf(season) == 0 ? season.episodes[0] : '',
                // );
                // console.log(item.episodes);
                // console.log(typeof season.season);
                if (season.season >= 0) {
                  return (
                    <div key={season.index}>
                      <h3
                        style={{
                          // width: "100%",
                          color: "lightgrey",
                          textAlign: "left",
                          marginLeft: 15,
                          fontSize: "22px",
                          fontWeight: "bold",
                          paddingBottom: 5,
                          // flexDirection: "row",
                        }}
                      >
                        {season.name}
                      </h3>
                      <div
                        className="mx-[4px] flex gap-[1rem] md:gap-[1.3rem] overflow-x-scroll scrollbar-hide w-[100%] overflow-y-hidden pl-[0.8rem] md:pl-8 pb-[1rem] md:pb-14"
                        // style={{ width: "100%" }}

                        // className="overflow-x-scroll"
                      >
                        {season.episodes.map((item) => {
                          return (
                            // <div></div>
                            <div
                              key={`${item.episodeDetails.season_number}-${item.episodeDetails.episode_number}`}
                              // className="rounded"
                              // style={{ position: "relative" }}
                              className="hover:scale-110 h-full relative w-[9rem] md:w-[250px] tansition-all duration-500 mt-5 cursor-pointer"
                              onClick={() => {
                                if (item.streamable && Movie?.imdbID) {
                                  toploadingbarref.current.continuousStart();
                                  router.push({
                                    pathname: "/SupportPlayer",
                                    query: {
                                      d: Movie?.imdbID,
                                      t: Movie?.tmdbTitle,
                                      ty: Movie?.type,
                                      w: Movie?.isWebseries,
                                      s: item.episodeDetails.season_number,
                                      e: item.episodeDetails.episode_number,
                                      release: Movie?.release
                                        ? Movie?.release.split("-")[0]
                                        : null,
                                      tmdb: Movie?.tmdbID,
                                      server: Movie?.available,
                                      duration: Movie?.duration || 0,
                                    },
                                  });
                                } // item.streamable
                                //   ? navigation.navigate("Player", {
                                //       title: Movie?.tmdbTitle,
                                //       episode:
                                //         item.episodeDetails.episode_number,
                                //       season: item.episodeDetails.season_number,
                                //       imdb: Movie?.imdbID,
                                //       server: "server1",
                                //       isWebseries: Movie?.isWebseries,
                                //       poster: Movie?.isWebseries
                                //         ? item.episodeDetails.still_path != null
                                //           ? `https://image.tmdb.org/t/p/original${item.episodeDetails.still_path}`
                                //           : Movie?.banner
                                //         : getPoster(Movie, tmpData),
                                //     })
                                //   : null;
                              }}
                            >
                              <div className="relative">
                                <LazyLoadImage
                                  alt={`${item.episodeDetails.season_number}-${item.episodeDetails.episode_number}`}
                                  src={
                                    item.episodeDetails.still_path != null
                                      ? `https://image.tmdb.org/t/p/w300${item.episodeDetails.still_path}`
                                      : Movie?.banner
                                  }
                                  // className="w-[9rem] md:w-[250px]"
                                  style={{
                                    overflow: "hidden",
                                    // width: 250,
                                    borderRadius: 8,
                                    // height: 145,
                                    // marginRight: 8,
                                  }}
                                />
                                <div
                                  style={{
                                    // width: "100%",
                                    // height: "100%",
                                    // heigh:"60",
                                    position: "absolute",
                                    // display: "flex",
                                    flexDirection: "row",
                                    paddingRight: 15,
                                    paddingTop: 2,
                                  }}
                                  className="grid place-items-center h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                >
                                  <div
                                    style={
                                      {
                                        // transform: " translate(100px, 36px)",
                                      }
                                    }
                                  >
                                    <div
                                      style={{
                                        backgroundColor: "#0009",
                                        padding: 10,
                                        borderRadius: 20,
                                        justifyContent: "center",
                                      }}
                                    >
                                      <img
                                        alt={"play"}
                                        src={"/play-white.png"}
                                        className="w-[5px] md:w-[17px] md:h-[17px] h-[5px]"
                                        style={{
                                          width: 17,
                                          height: 17,
                                          position: "relative",
                                          left: 1,
                                          // marginRight: 5,
                                          // margin: 10,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="/w-[9rem] right-0 h-full /md:w-[250px]"
                                style={{
                                  // backgroundColor: "green",
                                  position: "absolute",
                                  top: 0,
                                  // top: -145,
                                  // width: 250,
                                  // height: 1,
                                  // backgroundColor: "green",
                                  // backgroundColor: "red",
                                  // marginRight: 8,
                                  justifyContent: "space-between",
                                  // marginLeft:
                                  //   season.episodes.indexOf(item) == 0 ? 8 : 0,
                                }}
                                // imageStyle={{ borderRadius: 5 }}
                                // defaultSource={require('../assets/images/series/money_heist/money_heist.jpg')}
                              >
                                <div
                                  style={{
                                    // width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    paddingRight: 15,
                                    paddingTop: 2,
                                  }}
                                >
                                  <h3
                                    style={{
                                      color: "white",
                                      fontWeight: "600",
                                      fontSize: 13,
                                    }}
                                  >
                                    {item.episodeDetails.runtime
                                      ? `${item.episodeDetails.runtime} min`
                                      : "Coming Soon"}
                                  </h3>
                                </div>

                                {/* <div
                                    // className="z-[-1] absolute bottom-0 h-[100%] before:contents before:absolute bg-gradient-to-t from-black via-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0)] w-[100%]"
                                    // start={{ x: 0, y: 0 }}
                                    // end={{ x: 0, y: 1 }}
                                    // colors={["transparent", "#000"]}
                                    style={{
                                      display: "flex",
                                      width: "100%",
                                      height: "100%",
                                      // alignItems: "flex-start",
                                      // flexDirection: "column-reverse",
                                      // justifyContent: "flex-end",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        width: "100%",
                                        // height: "100%",
                                        marginBottom: 10,
                                        paddingHorizontal: 10,
                                        // alignItems: "flex-end",
                                      }}
                                    >
                                      <img
                                        src={"/play-white.png"}
                                        style={{
                                          width: 17,
                                          height: 17,
                                          marginRight: 5,
                                        }}
                                      />
                                    </div>
                                  </div> */}
                              </div>

                              <div
                                style={{
                                  width: 180,
                                  paddingLeft: 5,
                                  paddingTop: 5,
                                }}
                              >
                                <h3
                                  style={{
                                    color: "white",
                                    fontWeight: "500",
                                    fontSize: 14,
                                  }}
                                >
                                  {`S${item.episodeDetails.season_number} E${item.episodeDetails.episode_number}`}
                                </h3>
                                <h3
                                  style={{
                                    color: "#fff9",
                                    fontWeight: "400",
                                    fontSize: 13,
                                    marginTop: -4,
                                    marginBottom: 2,
                                  }}
                                >
                                  {item.episodeDetails.name}
                                </h3>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          ) : null}
        </div>
        {/* ) : (
           // <div className="flex items-center justify-center ">
           <div className="flex items-center justify-center space-x-2 animate-bounce mt-[50vh]">
             <div
               id="balls-loading1"
               className="w-8 h-8 bg-blue-400 rounded-full animate-bounce-slow"
             ></div>
             <div
               id="balls-loading2"
               className="w-8 h-8 bg-green-400 rounded-full animate-bounce"
             ></div>
             <div
               id="balls-loading3"
               className="w-8 h-8 bg-red-400 rounded-full animate-bounce-slow"
             ></div>
           </div>
         )} */}
      </div>
    </>
  );
};

export default MovieDetails;
