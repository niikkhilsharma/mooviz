import { InformationCircleIcon } from "@heroicons/react/outline";
import { useEffect, useState, useMemo, useRef, useContext } from "react";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
// var $ = require("jquery");
// if (typeof window !== "object") {
//   window.$ = window.jQuery = require("jquery");
// }
// import "owl.carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import dynamic from "next/dynamic";
import axios from "axios";
import Script from "next/script";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import { allhomemovies } from "../context/allcontexts";
// import LoadingBar from "react-top-loading-bar";

// import { modalState, movieState } from '../atoms/modalAtom.'

function Banner({ datalist }) {
  const router = useRouter();
  var { toploadingbarref } = useContext(allhomemovies);

  // useEffect(() => {
  //   (async () => {
  //     if (allmovies) {
  //       await new Promise((r) => setTimeout(() => r, 500));
  //       var scr = document.createElement("script");
  //       scr.innerHTML = `var atOptions = {
  //         'key' : 'c92496b479ac9c7faab2bcc81ae8fc45',
  //         'format' : 'iframe',
  //         'height' : 90,
  //         'width' : 728,
  //         'params' : {}
  //       };`;
  //       scr.src =
  //         "http" +
  //         (location.protocol === "https:" ? "s" : "") +
  //         "://www.profitabledisplayformat.com/c92496b479ac9c7faab2bcc81ae8fc45/invoke.js";
  //       document.querySelector(".owl-stage")[0].appendChild(scr);
  //     }
  //   })();
  // }, [allmovies]);

  const [allmovies, setallmovies] = useState([
    // {
    //   title: "Live : India Tour of New Zealand 2022",
    //   url: "https://i.imgur.com/Y2T45so.png",
    //   description:
    //     "Catch live India Tour of New Zealand 2022 Coverage & Highlights on Movizz.tk",
    //   id: 0,
    //   type: "live",
    // },
    // {
    //   title: "DC's Stargirl",
    //   url: "https://image.tmdb.org/t/p/original/pXjpqrx65mlQskf9mfTWSszYODn.jpg",
    //   description:
    //     "High school student Courtney Whitmore inspires an unlikely group of young heroes to stop the villains of the past.",
    //   id: 1,
    //   imdb: "tt8722888",
    //   type: "imdb",
    // },
    // {
    //   title: "Money Heist",
    //   url: "https://image.tmdb.org/t/p/original/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg",
    //   description: `A criminal mastermind who goes by "The Professor" has a plan to pull off the biggest heist in recorded history -- to print billions of euros in the Royal Mint of Spain. To help him carry out the ambitious plan, he recruits eight people with certain abilities and who have nothing to lose. The group of thieves take hostages to aid in their negotiations with the authorities, who strategize to come up with a way to capture The Professor. As more time elapses, the robbers prepare for a showdown with the police.`,
    //   id: 2,
    //   imdb: "tt6468322",
    //   type: "imdb",
    // },
    // {
    //   title: "Arcane",
    //   url: "https://image.tmdb.org/t/p/original/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg",
    //   description:
    //     "The origins of two iconic League champions, set in the utopian Piltover and the oppressed underground of Zaun.",
    //   id: 3,
    //   imdb: "tt11126994",
    //   type: "imdb",
    // },
    // {
    //   title: "Thor : Love & Thunder",
    //   url: "https://www.thecosmiccircus.com/wp-content/uploads/2022/07/Thor-love-and-thunder.png",
    //   description:
    //     "Thor embarks on a journey unlike anything he's ever faced -- a quest for inner peace. However, his retirement gets interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods. To combat the threat, Thor enlists the help of King Valkyrie, Korg and ex-girlfriend Jane Foster, who -- to his surprise -- inexplicably wields his magical hammer. Together, they set out on a harrowing cosmic adventure to uncover the mystery of the God Butcher's vengeance.",
    //   id: 4,
    //   imdb: "tt10648342",
    //   type: "imdb",
    // },
  ]);

  // useEffect(() => {
  //   (async () => {
  //     let { data } = await axios.get("/api/banners");

  //     setallmovies(data.banners);
  //   })();
  // }, []);
  // useEffect(() => {
  //   if (datalist) setallmovies(datalist);
  // }, [datalist]);

  useEffect(() => {
    (async () => {
      let { data } = await axios.get("/api/banners/main");

      setallmovies(data);
    })();
  }, []);

  //   useEffect(() => {
  //   }, []);
  //   console.log(movie);
  //   const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  //   const [showModal, setShowModal] = useRecoilState(modalState)

  // <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 z-0">

  return (
    <div className="top-0 left-0 z-2 md:p-[1rem] 1bg-black bg-[rgb(17,24,39)]">
      <OwlCarousel
        loop
        nav={true}
        autoplay={true}
        dots={false}
        margin={10}
        items={1}
        responsive={{
          0: {
            items: 1,
            margin: 5,
            stagePadding: 0,
          },
          580: {
            items: 1,
            margin: 10,
            stagePadding: 10,
          },
          768: {
            items: 1,
            margin: 10,
            stagePadding: 40,
          },
        }}
        className="rounded-lg"
        navText={["", ""]}
        stagePadding={40}
        autoplayTimeout={3000}
        autoplaySpeed={2000}
        autoplayHoverPause
      >
        {allmovies.map((el, ind) => {
          // <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
          return (
            <div
              key={Math.floor(Math.random()) + String(ind) + String(el?.url)}
              onClick={() => {
                if (el?.type == "channel") {
                  router.push({
                    pathname: "/TvChannelPlayer",
                    query: {
                      k: btoa(el.channelId),
                      c: el.cateogry,
                      t: btoa(el.title.replace("🔴", "").trim()),
                    },
                  });
                } else {
                  // toploadingbarref.current.continuousStart();

                  router.push({
                    pathname: "/MovieDetails",
                    query: {
                      l: btoa(el.link),
                      type: btoa(el.type),
                      mode: btoa(el.mode),
                      imdbID: el.imdb,
                      super: true,
                    },
                  });
                }
              }}
              className="flex flex-col h-[30vh] item md:h-[60vh]  object-cover rounded-lg w-full space-y-2 py-16 md:space-y-4  lg:pb-12 bg-black"
            >
              <div className="absolute top-0 left-0 md:left-[50%] z-0 w-full  md:w-1/2 h-full">
                <div className=" object-cover w-full rounded-lg h-full">
                  <div className=" flex flex-row h-full">
                    <div
                      style={{
                        "background-image": `linear-gradient(to left, rgba(245, 246, 252, 0), rgba(0,0,0, 1)), url('${
                          el?.url
                            ? el.url
                            : el.backdrop
                            ? el.backdrop
                            : "https://image.tmdb.org//t/p/w1920_and_h800_multi_faces/" +
                              el?.backdrop_path
                        }')`,
                        "background-size": "cover",
                      }}
                      // src={el?.url}
                      className={`w-[100vw] h-full !rounded-lg`}
                    />
                    <div className="1w-[68vw] hidden md:block absolute top-0 right-[0]  rotate-[270deg] [4.4rem] h-[20rem]  bg-gradient-to-t from-[rgba(0,0,0,0)] 1from-[rgba(17,24,39)]  to-black 1to-[rgb(17,24,39)] bg-[rgba(0,0,0,0)] "></div>
                  </div>
                </div>
              </div>
              <div className="w-full pl-[3.6rem] md:block hidden h-full">
                <h1 className="text-2xl font-bold md:text-4xl  lg:text-3xl z-[1] text-shadow-lg ">
                  {el?.title || el?.name || el?.original_name}
                </h1>
                <p
                  style={{ fontFamily: "rubik" }}
                  className="max-w-xs text-xs text-shadow-lg line-clamp-6 mt-[2rem] md:max-w-lg md:text-[15px] leading-[1.3rem] md:w-[35.4rem] text-slate-300 z-[1]"
                >
                  {el?.description || el?.overview}
                </p>

                <div
                  style={{ fontFamily: "rubik" }}
                  className="flex flex-row text-gray-300 items-baseline h-fit w-fit mt-3"
                >
                  <img
                    src="/imdb.png"
                    className="w-4 h-4 object-contain mr-2"
                  />
                  <label className="">{`${el.imdbRating.score}`}</label>

                  <label className=" ml-1 text-[14px] text-gray-400">
                    {` (${
                      el.imdbRating.votes > 1000
                        ? (el.imdbRating.votes / 1000).toFixed(0) + "k"
                        : el.imdbRating.votes
                    })`}
                  </label>
                </div>
                <div className="flex space-x-3 z-[1]">
                  {/* <button
                  onClick={() => {
                    if (el?.type == "live") {
                      // console.log("hello")
                      window.location.href = "/liveCricket";
                    }
                  }}
                  className="h-[3rem] flex w-[8rem] rounded-md items-center justify-center gap-[0.5rem] bg-white text-black elevation-1"
                >
                  <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                  Play
                </button>

                <button
                  className="h-[3rem] flex w-[8rem] rounded-md items-center justify-center gap-[0.5rem] bg-[gray]/70"
                  onClick={() => {
                    // alert(movie.type);
                  }}
                >
                  <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />{" "}
                  More Info
                </button> */}
                </div>
              </div>
            </div>
          );
          // </div>
        })}
      </OwlCarousel>
    </div>
  );

  // return movie ? (
  //   <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
  //     <div className="absolute top-0 left-0 z-0 h-[95vh] ">
  //       <div className="relative">
  //         <img src={movie?.url} className="w-[100vw] object-cover opacity-60" />
  //         <div className="absolute  bottom-0 h-[15rem] before:contents before:absolute bg-gradient-to-t from-[rgb(17,24,39)]  to-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0)] w-[100vw]"></div>
  //       </div>
  //     </div>

  //     <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl z-[1] text-shadow-lg">
  //       {movie?.title || movie?.name || movie?.original_name}
  //     </h1>
  //     <p className="max-w-xs text-xs text-shadow-lg md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl z-[1]">
  //       {movie?.description}
  //     </p>
  //     <div className="flex space-x-3 z-[1]">
  //       <button
  //         onClick={() => {
  //           if (movie?.type == "live") {
  //             // console.log("hello")
  //             window.location.href = "/liveCricket";
  //           }
  //         }}
  //         className="h-[3rem] flex w-[8rem] rounded-md items-center justify-center gap-[0.5rem] bg-white text-black elevation-1"
  //       >
  //         <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
  //         Play
  //       </button>

  //       <button
  //         className="h-[3rem] flex w-[8rem] rounded-md items-center justify-center gap-[0.5rem] bg-[gray]/70"
  //         onClick={() => {
  //           // alert(movie.type);
  //         }}
  //       >
  //         <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> More Info
  //       </button>
  //     </div>
  //   </div>
  // ) : (
  //   ""
  // );
}

export default Banner;
