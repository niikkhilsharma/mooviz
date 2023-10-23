import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import axios from "axios";
import $, { data } from "jquery";
import Seekbar from "../components/Seekbar";
import dynamic from "next/dynamic";

// const ReactPlayer = dynamic(() => import("../components/ReactVideoPlayer"), {
//   ssr: false,
// });
// import ReactPlayer from "../components/ReactVideoPlayer";
import ReactPlayer from "react-player/lazy";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Playerfloatsettings from "../components/Playerfloatsettings";
import Usableseekbar from "../components/Usableseekbar";
import playsvg from "../public/svg/play.svg";
import pausesvg from "../public/svg/pause.svg";
import o_playsvg from "../public/svg/o-play.svg";
import fullscreensvg from "../public/svg/fullscreen.svg";
import orignalscreensvg from "../public/svg/orignalscreen.svg";
import o_subtitlesvg from "../public/svg/o-subtitle.svg";
import subtitlesvg from "../public/svg/subtitle.svg";
import o_mutedsvg from "../public/svg/o-muted.svg";
import mutedsvg from "../public/svg/muted.svg";
import o_speakersvg from "../public/svg/o-speaker.svg";
import speakersvg from "../public/svg/speaker.svg";
import o_forwardsvg from "../public/svg/o-forward.svg";
import forwardsvg from "../public/svg/forward.svg";
import o_backwardsvg from "../public/svg/o-backward.svg";
import backwardsvg from "../public/svg/backward.svg";
import settingssvg from "../public/svg/settings.svg";
import o_settingssvg from "../public/svg/o-settings.svg";
import Spinner from "../components/Spinner";
import MovizLoding from "../components/MovizLoding";
import PLYRVideoPlayer from "../components/Plyr-Video-Player";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { allhomemovies } from "../context/allcontexts";

const PlayerRVideo = (props) => {
  const router = useRouter();
  var { toploadingbarref } = useContext(allhomemovies);
  const videofullscreen = useRef(null);
  const playvidref = useRef(null);
  const pausevidref = useRef(null);
  const mainloaderref = useRef(null);
  const mainallviddiv = useRef(null);
  const mainallvidooodd = useRef(null);
  const videoforwardref = useRef(null);
  const videobackwardref = useRef(null);
  const viiiidref = useRef(null);
  const [value, setvalue] = useState(0);
  const [alltracks, setalltracks] = useState({});
  const videoref = useRef(null);
  const controlsref = useRef(null);
  const [videovolume, setvideovolume] = useState(100);
  const [seekwidth, setseekwidth] = useState(0);
  const [awsstreamfunctionsset, setawsstreamfunctionsset] = useState({});
  const [curplayingvideolanguage, setcurplayingvideolanguage] = useState("");
  const [allawsindserverquality, setallawsindserverquality] = useState({});
  const [nowsesionallepisodes, setnowsesionallepisodes] = useState([]);
  const [mainawsstreamlinkstate, setmainawsstreamlinkstate] = useState("");
  const [currentselectedServer, setcurrentselectedServer] = useState("");
  const [videovolumevalue, setvideovolumevalue] = useState(100);
  const [allvidmetaserver5mvs, setallvidmetaserver5mvs] = useState([]);
  const [allvidmetaserver4vms, setallvidmetaserver4vms] = useState([]);
  const [setfloatviewtoggle, setsetfloatviewtoggle] = useState(false);
  const [awsinds_r_title, setawsinds_r_title] = useState("");
  const [SERVER5PROC, setSERVER5PROC] = useState(false);
  const [server5nowlang, setserver5nowlang] = useState("");
  const [server4nowlang, setserver4nowlang] = useState("");
  const [renderPlayer, setrenderPlayer] = useState(true);
  const [plyrAttr, setPlyrAttr] = useState(<></>);
  const [forceMainLoadingCompleted, setforceMainLoadingCompleted] =
    useState(false);
  const [serverFailureTimes, setserverFailureTimes] = useState(0);
  const [alreadyErrorSetforServer4, setalreadyErrorSetforServer4] =
    useState(false);
  const [ReactPlayerMediIsReady, setReactPlayerMediIsReady] = useState(false);
  const [Server4ForErrorKey, setServer4ForErrorKey] = useState("");
  const [Server4ForErrorKeyLang, setServer4ForErrorKeyLang] = useState("");
  const [setingopennextephide, setsetingopennextephide] = useState(false);
  const [season_and_edisode_title, setseason_and_edisode_title] = useState("");
  useEffect(() => {
    if (getParameterByName("ty") == "tv") {
      setseason_and_edisode_title("💠" + "S-" + 1 + " " + "E-" + 1);
    }
    if (getParameterByName("s")) {
      setseason_and_edisode_title(
        "💠" +
          "S-" +
          getParameterByName("s") +
          " " +
          "E-" +
          getParameterByName("e")
      );
    }
  }, []);

  const [serverRetries, setserverRetries] = useState(0);
  const [MaxserverRetries, setMaxserverRetries] = useState(2);
  useEffect(() => {
    document.body.classList.add("scrollbar-hidden");
    return () => {
      document.body.classList.remove("scrollbar-hidden");
    };
  }, []);
  const [allMovieBoxLinks, setallMovieBoxLinks] = useState([]);
  const [MovieBoxquality, setMovieBoxquality] = useState("");
  const [fullplayerconfig, setfullplayerconfig] = useState({
    playing: true,
    muted: false,
    volume: 1,
    url: "",
    duration: "0",
    progess: 0,
    seekval: 0,
    goto: 0,
    speed: 1,
    buffering: false,
  });
  useEffect(() => {
    var duration = new URL(document.URL).searchParams.get("duration");
    if (duration) {
      setfullplayerconfig((e) => ({ ...e, duration: duration }));
      // if (videoref?.seekTo == "function") {
      console.log(videoref?.current);
      videoref?.current?.seekTo(duration);
      // }
    }
  }, [fullplayerconfig.url, videoref?.current, renderPlayer]);

  function getspeed() {
    return fullplayerconfig?.speed;
  }
  useEffect(() => {
    if (fullplayerconfig.url && !forceMainLoadingCompleted) {
      document.addEventListener(
        "keydown",
        (event) => {
          var name = event.key;
          var code = event.code;
          // console.log(name);
          // Alert the key name and key code on keydown
          switch (name) {
            case ">":
              // if (fullplayerconfig.speed >= 1) {
              // console.log(getspeed());
              setfullplayerconfig((e) => {
                if (e.speed < 3) {
                  return { ...e, speed: e.speed + 0.5 };
                } else {
                  return e;
                }
              });
              // toast.success(fullplayerconfig.speed + 0.5);
              // }
              break;
            case "<":
              // if (fullplayerconfig.speed < 5) {
              // console.log(getspeed());
              setfullplayerconfig((e) => {
                if (e.speed > 1) {
                  return { ...e, speed: e.speed - 0.5 };
                } else {
                  return e;
                }
              });
              // toast.success(fullplayerconfig.speed - 0.5);
              // }
              break;

            default:
              break;
          }
          switch (code) {
            case "Space":
              if (fullplayerconfig.playing) {
                if (playvidref?.current) {
                  playvidref.current.click();
                } else {
                  pausevidref.current.click();
                }
              } else {
                if (pausevidref?.current) {
                  pausevidref.current.click();
                } else {
                  playvidref.current.click();
                }
              }
              break;
            case "ArrowRight":
              videoforwardref.current.click();
              break;
            case "ArrowLeft":
              videobackwardref.current.click();
              break;
            case "KeyF":
              videofullscreen.current.click();
              break;

            default:
              break;
          }
        },
        false
      );
    }
  }, [$.ready, fullplayerconfig.url, forceMainLoadingCompleted]);

  useEffect(() => {
    // console.log(fullplayerconfig.goto);
    if (fullplayerconfig.goto) {
      videoref.current.seekTo(fullplayerconfig.goto, "seconds");
    }
  }, [fullplayerconfig.goto]);

  var controls = (state = "on") => {
    if (state == "on") {
      document.body.style.cursor = "auto";
      setsetfloatviewtoggle(false);
      controlsref.current.classList.remove("hidden");
    } else {
      setsetfloatviewtoggle(true);
      document.body.style.cursor = "none";
      controlsref.current.classList.add("hidden");
    }
  };

  function toggleFullScreen() {
    try {
      var doc = window.document;
      var docEl = doc.documentElement;

      var requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen;
      var cancelFullScreen =
        doc.exitFullscreen ||
        doc.mozCancelFullScreen ||
        doc.webkitExitFullscreen ||
        doc.msExitFullscreen;

      if (
        !doc.fullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
      ) {
        requestFullScreen?.call(docEl);
      } else {
        cancelFullScreen?.call(doc);
      }
    } catch (error) {}
  }
  var toastFailure = (server) => {
    toast.error("😐 Not Available On Our " + server + ". Try Another", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  var toastAlert = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  var toastSucess = (server) => {
    toast.success("🙌 Caught On Our " + server, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    if (fullplayerconfig.url) {
      toploadingbarref?.current?.complete();
      setPlyrAttr(<></>);
    }
  }, [fullplayerconfig.url]);
  useEffect(() => {
    if (fullplayerconfig.url) {
      let timeout;
      let whenMouseMoves = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (controlsref?.current?.classList) {
            controls("off");
          }
        }, 8000);
      };

      document.body.addEventListener("mousemove", (e) => {
        whenMouseMoves();
        if (controlsref?.current?.classList) {
          controls("on");
        }
      });
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [fullplayerconfig]);

  useEffect(() => {
    $("#navfixed").addClass("hidden");
    return () => {
      $("#navfixed").removeClass("hidden");
    };
  }, [$.ready]);

  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  const [onetimeemb, setonetimeemb] = useState(false);

  var server4_5 = async () => {
    toploadingbarref?.current?.continuousStart();
    var datasecboxpro = await axios
      .get(`/api/server5/getMovie?imdb=${getParameterByName("d")}`)
      .then((d) => d.data);
    if (datasecboxpro.streamable) {
      if (
        !datasecboxpro.data.link
          .toLowerCase()
          .includes(getParameterByName("ty").toLowerCase())
      ) {
        toastFailure("Server #3");
        toploadingbarref?.current?.complete();
        return { streamable: false };
      }
      var datasecboxpro1 = await axios.get(
        `/api/server5/getStream?link=${datasecboxpro.data.link}&s=${
          getParameterByName("s") || 1
        }&e=${getParameterByName("e") || 1}`
      );
      // console.log(datasecboxpro1.data);
      if (datasecboxpro1.data.streamable) {
        setcurrentselectedServer("server-3(movieboxpro)");
        toastSucess("Server #3");
        toploadingbarref?.current?.complete();
        setallMovieBoxLinks(datasecboxpro1.data.data);
        setMovieBoxquality(datasecboxpro1.data.data[0].label);
        setfullplayerconfig((dat) => ({
          ...dat,
          url:
            typeof datasecboxpro1.data.data == "object"
              ? datasecboxpro1.data.data[0].file
              : datasecboxpro1.data.data,
        }));
        var axres = await axios.post(
          "/api/serverAvailability/serverAvailable",
          {
            imdbID: new URL(document.URL).searchParams.get("d"),
            server: "server-3(movieboxpro)",
          }
        );
        return { streamable: true };
      } else {
        toastFailure("Server #3");
        toploadingbarref?.current?.complete();
        return { streamable: false };
      }
    } else {
      toastFailure("Server #3");
      toploadingbarref?.current?.complete();
      return { streamable: false };
    }
  };

  var getserver2 = async () => {
    try {
      toploadingbarref?.current?.continuousStart();
      var datasec2 = await axios.get(
        `/api/server4/getStream?imdb=${getParameterByName("d")}`
      );
      if (datasec2?.error) {
        toastFailure("Server #2");
        toploadingbarref?.current?.complete();
        return { streamable: false };
      }
      if (!datasec2.data.streamable) {
        toastFailure("Server #2");
        toploadingbarref?.current?.complete();
        return { streamable: false };
      } else {
        // mainloaderref.current.classList.add("hidden");
        // const options = {
        //   headers: {
        //     Authorization: `Bearer ya29.a0Aa4xrXPEhk1c-Yr90cksZILaHXY-E6hHg7hUm32LmqzB2Xsxbo1mPatqkSIg9Jl9hYleIazSDgIdXkiLFlenYKqH8pG3-4JJUupY4byBkfi1RHcYq7Tb9w97aFuCxrNZo807EZ2Fw8W0pkS1X1nCocNUhNsTsgaCgYKATASARESFQEjDvL9Ayjw2obk9t_wlF--xZpg_w0165`,
        //   },
        // };
        // fetch(
        //   "https://www.googleapis.com/drive/v3/files/18sJlw7MbdAsJAv5mSKbKjNCzIbxZik7N?alt=media",
        //   options
        // )
        //   .then((response) => response.blob())
        //   .then((blob) => {
        //     console.log("URL.createObjectURL");
        //     // viiiidref.current.src = URL.createObjectURL(blob);
        //     setfullplayerconfig((dat) => ({
        //       ...dat,
        //       // url: "https://drive.google.com/u/4/uc?id=1N7k1PCIMQ1rUj07W-aaGGccpzD5bUMok&export=download&confirm=t&uuid=517326a5-effa-438f-ac80-4c9f0a78fddc",
        //       url: URL.createObjectURL(blob),
        //     }));
        //     //     // setUrl()
        //   });
        toastSucess("Server #2");
        toploadingbarref?.current?.complete();
        setfullplayerconfig((dat) => ({
          ...dat,
          //   url: "http://localhost:9001/1ujz3V4PQVRF8pzCRekJLP695QufFWrws",
          url: datasec2.data.source.vidSource.replace(".txt", ".m3u8"),
        }));
        var axres = await axios.post(
          "/api/serverAvailability/serverAvailable",
          {
            imdbID: new URL(document.URL).searchParams.get("d"),
            server: "server-2",
          }
        );
        return { streamable: true };
      }
    } catch (error) {
      toastFailure("Server #2");
      toploadingbarref?.current?.complete();
      return { streamable: false };
    }
  };

  // var server2embed = () => {
  //   mainloaderref?.current?.classList?.add("hidden");
  //   var ifrfor2em = document.createElement("iframe");
  //   ifrfor2em.className = "w-[100vw] h-[100vh]";
  //   if (!onetimeemb) {
  //     setonetimeemb(true);
  //     var season = getParameterByName("s") || 1;
  //     var episodes = getParameterByName("e") || 1;
  //     if (getParameterByName("ty") == "tv") {
  //       ifrfor2em.src = `https://www.2embed.to/embed/imdb/tv?id=${getParameterByName(
  //         "d"
  //       )}&s=${season}&e=${episodes}`;
  //     } else {
  //       ifrfor2em.src = `https://www.2embed.to/embed/imdb/movie?id=${getParameterByName(
  //         "d"
  //       )}`;
  //     }
  //     mainallviddiv.current.appendChild(ifrfor2em);
  //   }
  // };
  var getquality = async (l) => {
    var data = await axios.get(l).then((d) => d.data);
    var funcgetawsingserverqual = {
      quality: [],
      link: [],
    };
    data.split("./").forEach((el, ind) => {
      if (ind !== 0)
        funcgetawsingserverqual = {
          ...funcgetawsingserverqual,
          quality: [...funcgetawsingserverqual.quality, el.split("/")[0] + "p"],
          link: [
            ...funcgetawsingserverqual.link,
            "/" + el.split("m3u8")[0] + "m3u8",
          ],
        };
    });
    setallawsindserverquality(funcgetawsingserverqual);
  };
  const [season, setseason] = useState(null);
  const [episodes, setepisodes] = useState(null);
  useEffect(() => {
    setseason(getParameterByName("s") ? getParameterByName("s") - 1 : 0);
    setepisodes(getParameterByName("e") ? getParameterByName("e") - 1 : 0);
  }, []);

  // var season = useMemo(() =>
  //   getParameterByName
  //     ?
  //     : ""
  // );
  // var episodes = useMemo(() =>
  //   getParameterByName
  //     ?
  //     : ""
  // );

  var addspinner = () => {
    return $.ready ? (
      <div role="status">
        <svg
          aria-hidden="true"
          className="mr-2 w-[3rem] h-[3rem] text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            // fill="currentColor"
            className="lvu76yjkb"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            // fill="currentFill"
            className="uigh678giu"
          />
        </svg>
        {/* <span className="sr-only">Loading...</span> */}
      </div>
    ) : (
      <></>
    );
  };

  var servermovieland = async () =>
    new Promise(async (resolve) => {
      if (getParameterByName("ty") == "movie") {
        toploadingbarref?.current?.continuousStart();
        // setserveramlspinner(true);
        var d = await axios.get(
          `/api/server9/search?q=${getParameterByName(
            "t"
          )}&type=movie&range_to=${getParameterByName(
            "release"
          )}&range_from=${getParameterByName("release")}`
        );
        if (
          d.data.streamable &&
          d.data.data.status !== "error" &&
          d.data.data.movie.length !== 0
        ) {
          axios
            .get(
              `/api/server9/singleDetails?type=movie&id=${d.data.data.movie[0].videos_id}`
            )
            .then((d) => {
              var d = d.data.data.videos;
              var d = d.filter((el) =>
                el.file_url.includes("gx") ? true : false
              );
              if (!d[0]) {
                toploadingbarref?.current?.complete();
                toastFailure("Server #5");
                resolve({
                  streamable: false,
                });
                return;
              }
              setforceMainLoadingCompleted(true);
              // var ifrfor2em = document.createElement("iframe");
              // ifrfor2em.id = "iframeforgxpl";
              // ifrfor2em.className = "w-[100vw] h-[100vh]";
              // ifrfor2em.src = d[0].file_url;
              // mainallviddiv.current.appendChild(ifrfor2em);
              toploadingbarref?.current?.complete();
              toastSucess("Server #5");
              setPlyrAttr(
                <>
                  {/* {backBtn} */}
                  <button
                    onClick={() => {
                      router.push(
                        `/MovieDetails?imdbID=${getParameterByName("d")}`
                      );
                    }}
                    className="z-[2] absolute items-center gap-2 pl-[1rem] flex justify-start top-[1.9rem] left-[0.5rem] rounded-md h-[2rem]  w-[3rem]  cursor-pointer "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#fff"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </button>
                  {/* {Title} */}
                  <div
                    className="absolute py-[5px] md:py-[30px] flex px-[60px] top-0 left-0 z-[1] w-[100%] font-bold tracking-wide text-2xl"
                    style={{ fontFamily: "Rubik" }}
                  >
                    {currentselectedServer == "awsind" ? (
                      <>
                        <h3 className="mr-[0.2rem]">
                          {getParameterByName("t")}
                        </h3>
                        <h3 className="tracking-[2px]">
                          {awsinds_r_title
                            ? "💠" +
                              "S-" +
                              awsinds_r_title.split("-")[0] +
                              " " +
                              "E-" +
                              awsinds_r_title.split("-")[1]
                            : ""}
                        </h3>
                      </>
                    ) : (
                      getParameterByName("t")
                    )}
                  </div>
                  {/* {Player} */}
                  <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                    <PLYRVideoPlayer
                      src={`/api/server9/player/${
                        d[0].file_url.split("v=")[1]
                      }.m3u8`}
                    />
                  </div>
                </>
              );
              setfullplayerconfig((dat) => ({
                ...dat,
                //   url: "http://localhost:9001/1ujz3V4PQVRF8pzCRekJLP695QufFWrws",
                url: ``,
              }));
              //---------------------------------------------------------------------------
              // setfullplayerconfig((dat) => ({
              //   ...dat,
              //   //   url: "http://localhost:9001/1ujz3V4PQVRF8pzCRekJLP695QufFWrws",
              //   url: `/api/server9/player/${d[0].file_url.split("v=")[1]}.m3u8`,
              // }));
              // setallserverofaml(d.data.data.videos);
              // setserveramlspinner(false);
            });
        } else {
          toploadingbarref?.current?.complete();
          toastFailure("Server #5");
          resolve({
            streamable: false,
          });
          return;
        }
      } else {
        toploadingbarref?.current?.complete();
        toastFailure("Server #5");
        resolve({
          streamable: false,
        });
      }
    });

  const getawsstreavideo = async (l) => {
    var { key, referer } = awsstreamfunctionsset;
    await axios
      .post(`/api/getStreamVideo`, {
        file: l,
        key,
        referer,
      })
      .then(async (m33) => {
        if (/d{1,2}/.test(m33.data.data)) {
          getawsstreavideo(l);
          // await axios
          //   .post(`/api/getStreamVideo`, {
          //     file: l,
          //     key,
          //     referer,
          //   })
          //   .then((m33) => {
          //     setfullplayerconfig((dat) => ({
          //       ...dat,
          //       url: m33.data.data,
          //     }));
          //     setcurrentselectedServer("awsind");
          //     setmainawsstreamlinkstate(m33.data.data);
          //     getquality(m33.data.data);
          //   });
        } else {
          setfullplayerconfig((dat) => ({
            ...dat,
            url: m33.data.data,
          }));
          setcurrentselectedServer("awsind");
          setmainawsstreamlinkstate(m33.data.data);
          getquality(m33.data.data);
        }
      });
  };

  const server1aws = async () => {
    if (forceMainLoadingCompleted) {
      return;
    }
    toploadingbarref?.current?.continuousStart();
    axios.get(`/api/getStream?imdb=${getParameterByName("d")}`).then((dat) => {
      (async () => {
        // console.log(dat)
        if (forceMainLoadingCompleted) {
          return;
        }
        if (!dat.data.streamable) {
          // router.push("/");
          // var movieland = await servermovieland();
          // if (movieland.streamable) {
          // return;
          // }

          var getserver4_5status = await server4_5();
          if (forceMainLoadingCompleted) {
            return;
          }
          if (!getserver4_5status.streamable) {
            var getserver4status = await getserver2();
            if (forceMainLoadingCompleted) {
              return;
            }
            if (!getserver4status.streamable) {
              var verseser = await getserver5servers();
              if (forceMainLoadingCompleted) {
                return;
              }
              if (verseser.streamable) {
                toastAlert(
                  "Please Try Our Servers After Some Time .We Are continuously Trying Our Best .."
                );
              }
              // server2embed();
            }
          }
          // setsecMovie(datasec2.source.vidSource)
        } else {
          var filtered;
          filtered =
            typeof dat?.data?.data != /d{1,2}/
              ? dat?.data?.data?.filter((el) => el.title != null)
              : [];
          setawsstreamfunctionsset((e) => ({
            key: dat.data.key,
            referer: dat.data.referer,
          }));
          setalltracks(filtered);
          var selectanyavailfile =
            filtered[0].file ||
            filtered[season].folder[episodes].folder[0].file ||
            filtered[0].folder[0].folder[0].file ||
            filtered[1].folder[0].folder[0].file ||
            filtered[2].folder[0].folder[0].file ||
            filtered[2].folder[0].folder[1].file ||
            filtered[2].folder[0].folder[2].file ||
            filtered[2].folder[1].folder[0].file ||
            filtered[2].folder[2].folder[0].file ||
            filtered[2].folder[1].folder[1].file ||
            filtered[2].folder[1].folder[2].file ||
            filtered[2].folder[2].folder[1].file ||
            filtered[2].folder[2].folder[2].file ||
            filtered[1].file;
          var results1;
          if (filtered[0].file) {
            results1 = filtered.filter((obj) => {
              return obj?.title
                ? obj.title.toLowerCase() == "hindi"
                  ? obj
                  : ""
                : "";
            });
          } else {
            results1 = filtered[season].folder[episodes].folder.filter(
              (obj) => {
                return obj?.title
                  ? obj.title.toLowerCase() == "hindi"
                    ? obj
                    : ""
                  : "";
              }
            );
          }

          var result;
          if (filtered[0].file) {
            result = filtered.filter((obj) => {
              return obj.file == results1[0]?.file ? obj.title : "";
            });
          } else {
            result = filtered[season].folder[episodes].folder.filter((obj) => {
              return obj.file == results1[0]?.file ? obj.title : "";
            });
          }
          var curraudio = filtered.filter((el) =>
            el.file == selectanyavailfile ? el.title : ""
          );
          if (getParameterByName("ty") == "tv") {
            var selectanyavailtitle =
              filtered[
                getParameterByName("s") ? getParameterByName("s") - 1 : 0
              ].folder[
                getParameterByName("e") ? getParameterByName("e") - 1 : 0
              ]?.id;
            setawsinds_r_title(selectanyavailtitle);
          }
          setcurplayingvideolanguage(result[0]?.title || curraudio[0]?.title);
          await axios
            .post(`/api/getStreamVideo`, {
              file: results1[0]?.file ? results1[0].file : selectanyavailfile,
              key: dat.data.key,
              referer: dat.data.referer,
            })
            .then(async (m33) => {
              if (/^\d+$/.test(m33.data.data)) {
                server1aws();
                // await axios
                //   .post(`/api/getStreamVideo`, {
                //     file: results1[0]?.file
                //       ? results1[0].file
                //       : selectanyavailfile,
                //     key: dat.data.key,
                //     referer: dat.data.referer,
                //   })
                //   .then((m33) => {
                //     setfullplayerconfig((dat) => ({
                //       ...dat,
                //       url: m33.data.data,
                //     }));
                //     setcurrentselectedServer("awsind");
                //     setmainawsstreamlinkstate(m33.data.data);
                //     getquality(m33.data.data);
                //   });
              } else {
                setfullplayerconfig((dat) => ({
                  ...dat,
                  url: m33.data.data,
                }));
                var axres = await axios.post(
                  "/api/serverAvailability/serverAvailable",
                  {
                    imdbID: new URL(document.URL).searchParams.get("d"),
                    server: "server-1(aws-ind)",
                  }
                );
                setcurrentselectedServer("awsind");
                setmainawsstreamlinkstate(m33.data.data);
                getquality(m33.data.data);
              }
            });
        }
      })();
    });
  };

  // var getserver5servers = async () => {
  //   var ares = await axios
  //     .get(
  //       "/api/server11/search?d=" +
  //         getParameterByName("t") +
  //         "&y=" +
  //         getParameterByName("release")
  //     )
  //     .then((d) => d.data);
  //   if (ares.streamable) {
  //     var axres = await axios
  //       .get("/api/server11/getquality?l=" + ares.data[0].uri)
  //       .then((d) => d.data);
  //     var alset = false;
  //     axres.forEach(async (el) => {
  //       if (!alset)
  //         if (el.title == "PKembed") {
  //           alset = true;
  //           var axres = await axios
  //             .get("/api/server11/getstream?l=" + el.link)
  //             .then((d) => d.data);
  //           var nowel = document.createElement("meta");
  //           nowel.name = "referrer";
  //           nowel.content = "no-referrer";
  //           document.body.appendChild(nowel);
  //           setfullplayerconfig((dat) => ({
  //             ...dat,
  //             url: axres.url,
  //           }));
  //         }
  //     });
  //   }
  // };
  var getserver5servers = async () =>
    new Promise(async (resolve, reject) => {
      if (getParameterByName("ty") == "movie") {
        if (!SERVER5PROC) {
          toploadingbarref?.current?.continuousStart();
          setSERVER5PROC(true);
          var alltypes = await axios
            .get("/api/server6/getMovie?imdb=" + getParameterByName("d"))
            .then((d) => d.data);
          if (!alltypes.streamable) {
            setSERVER5PROC(false);
            reject();
            toastFailure("Server #6");
            toploadingbarref?.current?.complete();
            resolve({ streamable: false });
            return { streamable: false };
          }
          setallvidmetaserver5mvs(alltypes.data);
          var isavail = await axios
            .post("/api/server6/getUrlNew", alltypes.data[0].key, {
              headers: { "content-type": "text/plain" },
            })
            .then((d) => d.data);
          if (!isavail.streamable) {
            setSERVER5PROC(false);
            reject();
            toastFailure("Server #6");
            toploadingbarref?.current?.complete();
            resolve({ streamable: false });
            return { streamable: false };
          }
          // if (isavail.accepted) {
          //   setSERVER5PROC(false);
          //   setcurrentselectedServer("server5mvs");
          //   setfullplayerconfig((dat) => ({
          //     ...dat,
          //     url: isavail.data,
          //   }));
          // } else {
          var axres = await axios
            .post("/api/server6/getStreamNew", isavail.data, {
              headers: { "content-type": "text/plain" },
            })
            .then((d) => d.data);
          if (!axres.streamable) {
            setSERVER5PROC(false);
            reject();
            toastFailure("Server #6");
            toploadingbarref?.current?.complete();
            resolve({ streamable: false });
            return { streamable: false };
          }
          if (axres.streamable) {
            setSERVER5PROC(false);
            setserver5nowlang(
              alltypes.data[0].type + " " + alltypes.data[0].quality
            );
            setcurrentselectedServer("server5mvs");
            setfullplayerconfig((dat) => ({
              ...dat,
              url: axres.data,
            }));
            var axres = await axios.post(
              "/api/serverAvailability/serverAvailable",
              {
                imdbID: new URL(document.URL).searchParams.get("d"),
                server: "server-6(moviesmod)",
              }
            );
            toastSucess("Server #6");
            toploadingbarref?.current?.complete();
            resolve({ streamable: true });
            return { streamable: true };
          }
        }
      }
      // }
    });
  var getserver5serversspecify = async (key, keyforselection) => {
    var isavail = await axios
      .post("/api/server6/getUrlNew", key, {
        headers: { "content-type": "text/plain" },
      })
      .then((d) => d.data);
    if (!isavail.streamable) {
      return { streamable: false };
    }
    // if (isavail.accepted) {
    //   setcurrentselectedServer("server5mvs");
    //   setfullplayerconfig((dat) => ({
    //     ...dat,
    //     url: isavail.data,
    //   }));
    // } else {
    var axres = await axios
      .post("/api/server6/getStreamNew", isavail.data, {
        headers: { "content-type": "text/plain" },
      })
      .then((d) => d.data);
    if (axres.streamable) {
      setserver5nowlang(keyforselection);
      setcurrentselectedServer("server5mvs");
      setfullplayerconfig((dat) => ({
        ...dat,
        url: axres.data,
      }));
    }
    return;
    // }
  };
  var getserver4EmbedVegaMovservers = async () =>
    new Promise(async (resolve, reject) => {
      if (getParameterByName("ty") == "movie") {
        // if (!SERVER5PROC) {
        toploadingbarref?.current?.continuousStart();
        // setSERVER5PROC(true);
        var alltypes = await axios
          .get("/api/server10/getMovie?imdb=" + getParameterByName("d"))
          .then((d) => d.data);
        if (!alltypes.streamable) {
          // setSERVER5PROC(false);
          reject();
          toastFailure("Server #4");
          toploadingbarref?.current?.complete();
          resolve({ streamable: false });
          return { streamable: false };
        }
        setallvidmetaserver4vms(alltypes.data);
        var isavail = await axios
          .post("/api/server10/bypshortl", alltypes.data[0].key, {
            headers: { "content-type": "text/plain" },
          })
          .then((d) => d.data)
          .catch((er) => reject());
        if (!isavail.streamable) {
          // setSERVER5PROC(false);
          reject();
          toastFailure("Server #4");
          toploadingbarref?.current?.complete();
          resolve({ streamable: false });
          return { streamable: false };
        }
        if (isavail.accepted) {
          setServer4ForErrorKey(alltypes.data[0].key);
          setSERVER5PROC(false);
          setcurrentselectedServer("server4vms");
          setserver4nowlang(
            alltypes.data[0].type + " " + alltypes.data[0].quality
          );
          setServer4ForErrorKeyLang(
            alltypes.data[0].type + " " + alltypes.data[0].quality
          );
          resolve({ streamable: true });
          setfullplayerconfig((dat) => ({
            ...dat,
            url: isavail.data,
          }));
          return;
        }
        // else {
        toploadingbarref?.current?.complete();
        toastAlert("Movie Will Proccesed After 30Sec On Server #4");
        resolve({ streamable: false });
        setTimeout(async () => {
          var axres = await axios
            .post("/api/server10/bypasslink", isavail.data, {
              headers: { "content-type": "text/plain" },
            })
            .then((d) => d.data);
          if (!axres.streamable) {
            // setSERVER5PROC(false);
            reject();
            toastFailure("Server #4");
            toploadingbarref?.current?.complete();
            resolve({ streamable: false });
            return { streamable: false };
          }
          if (axres.streamable) {
            // setSERVER5PROC(false);
            setserver4nowlang(
              alltypes.data[0].type + " " + alltypes.data[0].quality
            );
            setServer4ForErrorKeyLang(
              alltypes.data[0].type + " " + alltypes.data[0].quality
            );
            setServer4ForErrorKey(alltypes.data[0].key);
            setcurrentselectedServer("server4vms");
            setfullplayerconfig((dat) => ({
              ...dat,
              url: axres.uri,
            }));
            var axres = await axios.post(
              "/api/serverAvailability/serverAvailable",
              {
                imdbID: new URL(document.URL).searchParams.get("d"),
                server: "server-4(vegamovies)",
              }
            );
            toastSucess("Server #4");
            toploadingbarref?.current?.complete();
            resolve({ streamable: true });
            return { streamable: true };
          }
        }, 30000);
      }
    });
  var getserver4EmbedVegaMovserversspecify = async (key, keyforselection) =>
    new Promise(async (resolve) => {
      var isavail = await axios
        .post("/api/server10/bypshortl", key, {
          headers: { "content-type": "text/plain" },
        })
        .then((d) => d.data);
      if (!isavail.streamable) {
        // setSERVER5PROC(false);
        reject();
        toastFailure("Server #4");
        toploadingbarref?.current?.complete();
        resolve({ streamable: false });
        return { streamable: false };
      }
      if (isavail.accepted) {
        setServer4ForErrorKey(key);
        setSERVER5PROC(false);
        setcurrentselectedServer("server4vms");
        toastSucess("Server #4");
        setserver4nowlang(keyforselection);
        setServer4ForErrorKeyLang(keyforselection);
        resolve({ streamable: true });
        setfullplayerconfig((dat) => ({
          ...dat,
          url: isavail.data,
        }));
        return;
      }
      // else {
      toastAlert("Quality Is Processing Wait 30Sec On Server #4");
      setTimeout(async () => {
        var axres = await axios
          .post("/api/server10/bypasslink", isavail.data, {
            headers: { "content-type": "text/plain" },
          })
          .then((d) => d.data);
        if (!axres.streamable) {
          // setSERVER5PROC(false);
          reject();
          toastFailure("Server #4");
          toploadingbarref?.current?.complete();
          resolve({ streamable: false });
          return { streamable: false };
        }
        if (axres.streamable) {
          setServer4ForErrorKey(key);
          // setSERVER5PROC(false);
          setserver4nowlang(keyforselection);
          setServer4ForErrorKeyLang(keyforselection);
          setcurrentselectedServer("server4vms");
          setfullplayerconfig((dat) => ({
            ...dat,
            url: axres.uri,
          }));
          toastSucess("Server #4");
          toploadingbarref?.current?.complete();
          resolve({ streamable: true });
          return { streamable: true };
        }
      }, 30000);
    });
  // };
  // }

  var setupcurretnserver5 = async (e, el) => {
    try {
      await new Promise((res) => setTimeout(res, 1));
      $(".spinnerLoadingserver5lang").css("display", "flex");
      await getserver5serversspecify(el.key, el.type + " " + el.quality);
      $(".spinnerLoadingserver5lang").css("display", "none");
      $(".spinnerLoadingserver5lang").removeClass("spinnerLoadingserver5lang");
    } catch (error) {}
  };
  var setupcurretnserver4 = async (e, el) => {
    try {
      await new Promise((res) => setTimeout(res, 1));
      $(".spinnerLoadingserver5lang").css("display", "flex");
      await getserver4EmbedVegaMovserversspecify(
        el.key,
        el.type + " " + el.quality
      );
      $(".spinnerLoadingserver5lang").css("display", "none");
      $(".spinnerLoadingserver5lang").removeClass("spinnerLoadingserver5lang");
    } catch (error) {}
  };
  // var interval_duration;
  // var currenttimeforduration = useMemo(() => 10);
  const [currenttimeforduration, setcurrenttimeforduration] = useState(10);
  useEffect(() => {
    if (
      (fullplayerconfig.progess != 0 || fullplayerconfig.progess != "0") &&
      new URL(document.URL).pathname == "/SupportPlayer"
    ) {
      console.log(currenttimeforduration);
      if (currenttimeforduration == 0) {
        setcurrenttimeforduration(10);
        if (new URL(document.URL).searchParams.get("ty") == "movie") {
          axios.post("/api/users/userPrefrences", {
            imdbID: new URL(document.URL).searchParams.get("d"),
            type: new URL(document.URL).searchParams.get("ty"),
            duration: fullplayerconfig.progess,
          });
        }
      } else {
        setcurrenttimeforduration((e) => e - 1);
      }
      router.replace({
        query: { ...router.query, duration: fullplayerconfig.progess },
      });
    }
  }, [fullplayerconfig.progess]);
  useEffect(() => {
    // var onetimeemb = false;
    (async () => {
      toploadingbarref?.current?.continuousStart();
      var currentserver =
        new URL(document.URL).searchParams.get("server") || "none";
      if (season == null) {
        return;
      }
      if (currentserver) {
        switch (currentserver) {
          case "server-1(aws-ind)":
            await server1aws();
            break;
          case "server-2":
            var getserv = await getserver2();
            if (!getserv?.streamable) {
              var getserv = await server1aws();
            }
            break;
          case "server-3(movieboxpro)":
            var getserv = await server4_5();
            if (!getserv?.streamable) {
              var getserv = await server1aws();
            }
            break;
          case "server-4(vegamovies)":
            var getserv = await getserver4EmbedVegaMovservers();
            if (!getserv?.streamable) {
              var getserv = await server1aws();
            }
            break;
          case "server-6(moviesmod)":
            var getserv = await getserver5servers();
            if (!getserv?.streamable) {
              var getserv = await server1aws();
            }
            break;

          default:
            if (getParameterByName("ty") == "movie") {
              if (season == null) {
                return;
              }
              try {
                var getserv = await server4_5();
                if (!getserv?.streamable) {
                  var getserv = await server1aws();
                }
              } catch (error) {
                await server1aws();
              }
            } else {
              if (season == null) {
                return;
              }

              await server1aws();
            }
            break;
        }
        return;
      }
    })();
  }, [season, episodes]);

  var awsidqualities;
  var awsindlanguages;
  var server5mvsqualities;
  var server5mvslanguages;
  var server4vmsqualities;
  var server4vmslanguages;
  var setallserverslandsubqual = () => {
    if (currentselectedServer == "awsind") {
      awsidqualities = (
        <div>
          <div
            onClick={() => {
              setfullplayerconfig((dat) => ({
                ...dat,
                url: mainawsstreamlinkstate,
              }));
            }}
            className={`border-b-2 flex justify-center py-1 ${
              !/\d{3,4}/.test(
                fullplayerconfig.url?.split("/").at(-2).substr(0, 5)
              )
                ? "bg-orange-500"
                : ""
            } hover:border-[rgba(17,255,144,0.92)] transition-all duration-300 hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed`}
          >
            <h3>Auto</h3>
          </div>
          {allawsindserverquality?.quality?.map((el) =>
            el ? (
              <div
                key={Math.floor(Math.random() * 99999)}
                onClick={() => {
                  var eelq = el.split("");
                  eelq.pop();
                  setfullplayerconfig((dat) => ({
                    ...dat,
                    url: mainawsstreamlinkstate.replace(
                      "/index.m3u8",
                      `/${eelq.join("")}/index.m3u8`
                    ),
                  }));
                }}
                className={`border-b-2 flex justify-center py-1 ${
                  fullplayerconfig.url.split("/").at(-2) + "p" == el
                    ? "bg-orange-500"
                    : ""
                } hover:border-[rgba(17,255,144,0.92)] transition-all duration-300 hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed`}
              >
                <h3>{el}</h3>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      );

      awsindlanguages = alltracks[0].folder
        ? alltracks[season].folder[episodes]?.folder?.map((el) =>
            el.title ? (
              <div
                key={Math.floor(Math.random() * 99999)}
                onClick={() => {
                  getawsstreavideo(el.file);
                  setcurplayingvideolanguage(el.title);
                }}
                className={`border-b-2 flex justify-center py-1 ${
                  curplayingvideolanguage == el.title ? "bg-orange-500" : ""
                }  items-center hover:border-[rgba(17,255,144,0.92)] transition-all duration-300 hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed`}
              >
                <h3>{el.title}</h3>
              </div>
            ) : (
              ""
            )
          )
        : alltracks.map((el) =>
            el?.title ? (
              <div
                key={Math.floor(Math.random() * 99999)}
                onClick={() => {
                  getawsstreavideo(el.file);
                  setcurplayingvideolanguage(el.title);
                }}
                className={`border-b-2 flex justify-center py-1 ${
                  curplayingvideolanguage == el.title
                    ? "bg-orange-500"
                    : "hover:border-[rgba(17,255,144,0.92)]"
                } flex transition-all duration-300 hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed`}
              >
                <h3>{el?.title}</h3>
              </div>
            ) : (
              ""
            )
          );
    } else if (currentselectedServer == "server5mvs") {
      var ar = [];
      server5mvsqualities = allvidmetaserver5mvs
        .filter((e) => {
          if (!ar.includes(e.quality)) {
            ar.push(e.quality);
            return true;
          } else {
            return false;
          }
        })
        .map((el) =>
          el ? (
            <div
              key={Math.floor(Math.random() * 99999)}
              onClick={(e) => setupcurretnserver5(e, el)}
              className={`border-b-2 flex justify-center py-1 ${
                server5nowlang.split(" ")[1] == el.quality
                  ? "bg-orange-500"
                  : ""
              } flex items-center justify-center gap-1  hover:border-[rgba(17,255,144,0.92)] transition-all duration-300 hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed`}
            >
              <h3>{el.quality}</h3>
              <div className="hidden ">
                <Spinner width={"1"} height={"1"} />
              </div>
            </div>
          ) : (
            ""
          )
        );
      server5mvslanguages = allvidmetaserver5mvs
        .filter((el) => {
          if (!ar.includes(el.type + " " + el.quality)) {
            ar.push(el.type + " " + el.quality);
            return true;
          } else {
            return false;
          }
        })
        .map((el) =>
          el?.type ? (
            <div
              key={Math.floor(Math.random() * 99999)}
              onClick={(e) => {
                setupcurretnserver5(e, el);
                e.currentTarget.lastElementChild.classList.add(
                  "spinnerLoadingserver5lang"
                );
              }}
              className={`border-b-2 flex justify-center py-1 ${
                server5nowlang == el.type + " " + el.quality
                  ? "bg-orange-500"
                  : "hover:border-[rgba(17,255,144,0.92)] hover:bg-[rgba(17,255,144,0.92)] "
                // curplayingvideolanguage == el.title ? "bg-orange-500" : ""
              } group-hover:flex items-center gap-[0.5rem] justify-center   text-center transition-all duration-300 hover:text-black  border-white 1mb-1 1pb-1 border-dashed`}
            >
              <h3 className="line-clamp-1">{el.type + " " + el.quality}</h3>
              <div className="hidden">
                <Spinner width={"1"} height={"1"} />
              </div>
            </div>
          ) : (
            ""
          )
        );
    } else if (currentselectedServer == "server4vms") {
      var ar = [];
      server4vmsqualities = allvidmetaserver4vms
        .filter((e) => {
          if (!ar.includes(e.quality)) {
            ar.push(e.quality);
            return true;
          } else {
            return false;
          }
        })
        .map((el) =>
          el ? (
            <div
              key={Math.floor(Math.random() * 99999)}
              onClick={(e) => setupcurretnserver4(e, el)}
              className={`border-b-2 flex justify-center py-1 ${
                server4nowlang.split(" ")[1] == el.quality
                  ? "bg-orange-500"
                  : ""
              } flex items-center justify-center gap-1  hover:border-[rgba(17,255,144,0.92)] transition-all duration-300 hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed`}
            >
              <h3>{el.quality}</h3>
            </div>
          ) : (
            ""
          )
        );
      server4vmslanguages = allvidmetaserver4vms
        // server5mvslanguages = allvidmetaserver5mvs
        .filter((el) => {
          if (!ar.includes(el.type + " " + el.quality)) {
            ar.push(el.type + " " + el.quality);
            return true;
          } else {
            return false;
          }
        })
        .map((el) =>
          el?.type ? (
            <div
              key={Math.floor(Math.random() * 99999)}
              onClick={(e) => {
                setupcurretnserver4(e, el);
                e.currentTarget.lastElementChild.classList.add(
                  "spinnerLoadingserver5lang"
                );
              }}
              className={`border-b-2 flex justify-center py-1 ${
                server4nowlang == el.type + " " + el.quality
                  ? "bg-orange-500"
                  : "hover:border-[rgba(17,255,144,0.92)] hover:bg-[rgba(17,255,144,0.92)] "
                // curplayingvideolanguage == el.title ? "bg-orange-500" : ""
              } group-hover:flex items-center gap-[0.5rem] justify-center   text-center transition-all duration-300 hover:text-black  border-white 1mb-1 1pb-1 border-dashed`}
            >
              <h3 className="line-clamp-1">{el.type + " " + el.quality}</h3>
              <div className="hidden">
                <Spinner width={"1"} height={"1"} />
              </div>
            </div>
          ) : (
            ""
          )
        );
    }
  };

  const [subtitles, setsubtitles] = useState([]);
  useEffect(() => {
    axios
      .get(
        `/api/getsubtitles?imdb=${getParameterByName("d")}${
          getParameterByName("s") ? "&s=" + getParameterByName("s") : ""
        }${getParameterByName("e") ? "&e=" + getParameterByName("e") : ""}`
      )
      .then((d) => setsubtitles(d?.data?.en));
  }, []);

  var getSettingsElement = () => {
    setallserverslandsubqual();
    $("#allvideosettinghover").off("mouseenter mouseleave");
    $("#allvideosettinghover").on("mouseenter mouseleave", (e) => {
      switch (e.type) {
        case "mouseenter":
          setsetingopennextephide(true);
          e.currentTarget.lastElementChild.style.transform = "rotate(-180deg)";
          if (screen.width >= 500) {
            e.currentTarget.firstElementChild.style.width = "22rem";
            e.currentTarget.firstElementChild.style.borderWidth = "2px";
          } else {
            toastAlert("Turn On Landscape");
          }
          break;
        case "mouseleave":
          setsetingopennextephide(false);
          e.currentTarget.lastElementChild.style.transform = "rotate(0deg)";
          if (screen.width >= 500) {
            e.currentTarget.firstElementChild.style.width = "0rem";
            e.currentTarget.firstElementChild.style.borderWidth = "0px";
          }
          break;

        default:
          break;
      }
    });

    return (
      <div
        id="allvideosettinghover"
        className="md:mr-[25px] relative flex flex-row items-center justify-center "
      >
        <div className=" w-0 bg-[rgba(100,116,139,0.4)] hover:overflow-visible border-0 border-[rgba(100,116,139,0.4)] rounded-lg transition-all duration-300 absolute right-8 overflow-hidden">
          <div className="  transition-all duration-300 ">
            <div className="group-hover:w-auto flex flex-row gap-2 justify-around h-full">
              <div className="group h-[2rem] px-2 items-center flex md:border-r-2 border-white pr-4 md:border-dashed justify-center cursor-pointer">
                <h3>Quality</h3>
                <div className="bg-[rgba(100,116,139,0.4)] opacity-0 group-hover:opacity-100 1hover:overflow-scroll md:hover:w-[8rem] w-[5rem] backdrop-blur-[2px] border-2 border-[rgba(100,116,139,0.5)] border-dotted rounded-t-xl translate-x-[0.2rem] group-hover:h-[11rem]  h-0 transition-all duration-300 justify-center overflow-hidden 1hidden items-center absolute bottom-8  md:flex-col">
                  <div className="md:border-b-2 flex justify-center py-1 border-white 1mb-1 1pb-1 md:border-dashed">
                    <h3>Qualities</h3>
                  </div>
                  <div className="h-[10rem] hover:overflow-scroll">
                    {currentselectedServer == "awsind"
                      ? awsidqualities
                      : currentselectedServer == "server5mvs"
                      ? server5mvsqualities
                      : currentselectedServer == "server4vms"
                      ? server4vmsqualities
                      : currentselectedServer == "server-3(movieboxpro)"
                      ? allMovieBoxLinks.map((el) => (
                          <div
                            key={Math.floor(Math.random() * 99999)}
                            onClick={(e) => {
                              setMovieBoxquality(el.label);
                              setfullplayerconfig((dat) => ({
                                ...dat,
                                url: el.file,
                              }));
                            }}
                            className={`border-b-2 flex justify-center py-1 ${
                              MovieBoxquality == el.label ? "bg-orange-500" : ""
                            } flex items-center justify-center gap-1  hover:border-[rgba(17,255,144,0.92)] transition-all duration-300 hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed`}
                          >
                            <h3>{el.label}</h3>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
              <div className="h-[2rem] px-2 items-center flex relative group md:border-r-2 border-white pr-4 md:border-dashed cursor-pointer justify-center">
                <h3>Speed</h3>
                <div className="bg-[rgba(100,116,139,0.4)] opacity-0 group-hover:opacity-100 hover:w-[8rem] w-[5rem] backdrop-blur-[2px] border-2 border-[rgba(100,116,139,0.5)] border-dotted rounded-t-xl 1translate-x-[-1.2rem] group-hover:h-[11rem]  h-0 transition-all duration-300 justify-center overflow-hidden 1hidden items-center absolute bottom-8 flex-col">
                  <div
                    onClick={() => {
                      setfullplayerconfig((e) => ({ ...e, speed: 1 }));
                    }}
                    className={`${
                      fullplayerconfig.speed == 1 ? "bg-orange-500" : ""
                    } border-b-2 flex justify-center py-1 transition-all duration-300 hover:border-[rgba(17,255,144,0.92)] hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed`}
                  >
                    <h3>1x</h3>
                  </div>
                  <div
                    onClick={() => {
                      setfullplayerconfig((e) => ({ ...e, speed: 1.5 }));
                    }}
                    className={`${
                      fullplayerconfig.speed == 1.5 ? "bg-orange-500" : ""
                    } border-b-2 flex justify-center py-1 transition-all duration-300 hover:border-[rgba(17,255,144,0.92)] hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed`}
                  >
                    <h3>1.5x</h3>
                  </div>
                  <div
                    onClick={() => {
                      setfullplayerconfig((e) => ({ ...e, speed: 2 }));
                    }}
                    className={`${
                      fullplayerconfig.speed == 2 ? "bg-orange-500" : ""
                    } border-b-2 flex justify-center py-1 transition-all duration-300 hover:border-[rgba(17,255,144,0.92)] hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed`}
                  >
                    <h3>2x</h3>
                  </div>
                  <div
                    onClick={() => {
                      setfullplayerconfig((e) => ({ ...e, speed: 2.5 }));
                    }}
                    className={`${
                      fullplayerconfig.speed == 2.5 ? "bg-orange-500" : ""
                    } border-b-2 flex justify-center py-1 transition-all duration-300 hover:border-[rgba(17,255,144,0.92)] hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed`}
                  >
                    <h3>2.5x</h3>
                  </div>
                  <div
                    onClick={() => {
                      setfullplayerconfig((e) => ({ ...e, speed: 3 }));
                    }}
                    className={`${
                      fullplayerconfig.speed == 3 ? "bg-orange-500" : ""
                    } border-b-2 flex justify-center py-1 transition-all duration-300 hover:border-[rgba(17,255,144,0.92)] hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed`}
                  >
                    <h3>3x</h3>
                  </div>
                </div>
              </div>
              <div className="h-[2rem] px-2 items-center group justify-center flex md:border-r-2 border-white pr-4 md:border-dashed cursor-pointer">
                <h3>Language</h3>
                <div className="bg-[rgba(100,116,139,0.4)] opacity-0 group-hover:opacity-100 hover:overflow-scroll group-hover:h-[11rem] md:hover:!h-[18rem]  md:hover:w-[18rem] w-[7rem] backdrop-blur-[2px] border-2 border-[rgba(100,116,139,0.5)] border-dotted rounded-t-xl 1translate-x-[-1.2rem]   h-0 transition-all duration-300 justify-center overflow-hidden 1hidden items-center absolute bottom-8 flex-col">
                  <div className="border-b-2 flex justify-center py-1  border-white 1mb-1 1pb-1 border-dashed">
                    <h3>All Languages</h3>
                  </div>
                  {currentselectedServer == "awsind"
                    ? awsindlanguages
                    : currentselectedServer == "server5mvs"
                    ? server5mvslanguages
                    : currentselectedServer == "server4vms"
                    ? server4vmslanguages
                    : ""}
                </div>
              </div>
              <div className="h-[2rem] px-2 items-center flex group cursor-pointer relative  justify-center">
                <h3>Subtitles</h3>
                <div className="bg-[rgba(100,116,139,0.4)] opacity-0 group-hover:opacity-100 w-[5.5rem] translate-x-[-0.2rem] hover:!h-[18rem] hover:w-[18rem] translate-y-[-0.1rem] backdrop-blur-[2px] border-2 border-[rgba(100,116,139,0.5)] border-dotted rounded-t-xl  group-hover:h-[11rem]  h-0 transition-all duration-300 justify-center overflow-hidden 1hidden items-center absolute bottom-[1.8rem] flex-col">
                  <div className="border-b-2 flex justify-center py-1 hover:border-[rgba(17,255,144,0.92)] hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed">
                    <h3 className="whitespace-nowrap hover:whitespace-normal text-ellipsis">
                      Subtitles
                    </h3>
                  </div>
                  {/* <div className="border-b-2 flex justify-center py-1 hover:border-[rgba(17,255,144,0.92)] hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed">
                    <h3>1.5x</h3>
                  </div>
                  <div className="border-b-2 flex justify-center py-1 hover:border-[rgba(17,255,144,0.92)] hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed">
                    <h3>2x</h3>
                  </div>
                  <div className="border-b-2 flex justify-center py-1 hover:border-[rgba(17,255,144,0.92)] hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed">
                    <h3>2.5x</h3>
                  </div>
                  <div className="border-b-2 flex justify-center py-1 hover:border-[rgba(17,255,144,0.92)] hover:text-black hover:bg-[rgba(17,255,144,0.92)] border-white 1mb-1 1pb-1 border-dashed">
                    <h3>3x</h3>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className="w-8 h-8  cursor-pointer transition-all duration-300"
          src={o_settingssvg.src}
          onMouseEnter={(e) => {
            e.currentTarget.src = settingssvg.src;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.src = o_settingssvg.src;
          }}
          alt=""
        />
      </div>
    );
  };
  const [allServers, setallServers] = useState([
    { function: server1aws, name: "awsind" },
    { function: server4_5, name: "server-3(movieboxpro)" },
    { function: getserver4EmbedVegaMovservers, name: "server4vms" },
    { function: getserver2, name: "server-2" },
    { function: getserver5servers, name: "server-6(moviesmod)" },
  ]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {$.ready ? (
        <Playerfloatsettings
          router={router}
          floatviewtoggle={setfloatviewtoggle}
          server4_5={server4_5}
          getParameterByName={getParameterByName}
          getserver2={getserver2}
          servermovieland={servermovieland}
          server1aws={server1aws}
          getserver5servers={getserver5servers}
          getserver4EmbedVegaMovservers={getserver4EmbedVegaMovservers}
        />
      ) : (
        ""
      )}
      {/* {!fullplayerconfig.playing ? ( */}
      <div
        className={`absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[10] ${
          fullplayerconfig.playing
            ? "opacity-0"
            : fullplayerconfig.url
            ? "opacity-100"
            : "opacity-0"
        } transition-all duration-150 pointer-events-none`}
      >
        <div className="bg-blue-500 rounded-full flex justify-center items-center">
          <img
            className="p-3 ml-[3px]"
            width={50}
            height={50}
            src={playsvg.src}
          ></img>
        </div>
      </div>
      {/* ) : (
        ""
      )} */}
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        {fullplayerconfig.buffering ? addspinner() : ""}
      </div>
      <div ref={mainallviddiv} className={"w-[100%] h-[100%]"}>
        {plyrAttr}
        {fullplayerconfig.url ? (
          <div
            onClick={() => {
              // if(fullplayerconfig.playing){
              // }else{
              // }
            }}
            className="h-[100vh] w-[100%] overflow-hidden realative flex  justify-center items-center bg-black"
          >
            <div
              onClick={() => {
                if (fullplayerconfig.playing) {
                  setfullplayerconfig((dat) => ({
                    ...dat,
                    playing: false,
                  }));
                } else {
                  setfullplayerconfig((dat) => ({
                    ...dat,
                    playing: true,
                  }));
                }
              }}
            >
              <div
                ref={mainallvidooodd}
                className="appforrrvideooapp"
                id="appforvideoo"
              >
                {renderPlayer ? (
                  <ReactPlayer
                    // light={getParameterByName("backdrop")}
                    // pip
                    // fallback={() => (
                    //   <div className="w-[100vw] h-[100vh] bg-white">Hello</div>
                    // )}
                    // poster={getParameterByName("backdrop")}
                    // light={false}
                    width={"100vw"}
                    height={"100vh"}
                    ref={videoref}
                    onError={async (er) => {
                      console.log(er);
                      var expectarr = ["play() failed"];
                      if (
                        expectarr.reduce(
                          (prev, cur) =>
                            String(er).includes(cur) || prev == true
                              ? true
                              : false,
                          false
                        )
                      ) {
                        toast.info("Please Click On the Page To Play");
                      } else {
                        if (currentselectedServer == "awsind") {
                          alert(
                            "If Video Is Still Not Playing Try Connection VPN Or Choose Server 3"
                          );
                        }
                      }

                      return;
                      if (serverRetries > MaxserverRetries) {
                        setserverRetries(0);
                        if (currentselectedServer) {
                          allServers.forEach((el, index) => {
                            if (el.name == currentselectedServer) {
                              allServers[index + 1].function();
                            }
                          });
                        }
                      } else {
                        setserverRetries((prev) => prev + 1);
                        setrenderPlayer(false);
                        await new Promise((res) => setTimeout(res, 10));
                        setrenderPlayer(true);
                      }

                      // console.log(er);
                      // if (ReactPlayer.canPlay(fullplayerconfig.url)) {
                      // if (currentselectedServer == "server4vms") {
                      //   setserverFailureTimes((d) => d + 1);
                      //   if (
                      //     serverFailureTimes > 2 &&
                      //     !alreadyErrorSetforServer4
                      //   ) {
                      //     setalreadyErrorSetforServer4(true);
                      //     toastAlert("Retrying On server #4...");
                      //     setserverFailureTimes(0);
                      //     // console.log("waiting");
                      //     await getserver4EmbedVegaMovserversspecify(
                      //       Server4ForErrorKey,
                      //       Server4ForErrorKeyLang
                      //     );
                      //     // console.log("waiting #ended");
                      //     setalreadyErrorSetforServer4(false);
                      //   }
                      // }
                      // setrenderPlayer(false);
                      // await new Promise((res) => setTimeout(res, 10));
                      // setrenderPlayer(true);
                      // } else {
                      // alert("Try Another Server or Quality!");
                      // }
                    }}
                    controls={false}
                    muted={fullplayerconfig.muted}
                    onBuffer={(e) => {
                      setfullplayerconfig((dat) => ({
                        ...dat,
                        buffering: true,
                      }));
                    }}
                    playing={fullplayerconfig.playing}
                    onBufferEnd={(e) => {
                      setfullplayerconfig((dat) => ({
                        ...dat,
                        buffering: false,
                      }));
                    }}
                    volume={videovolumevalue / 100}
                    playbackRate={fullplayerconfig.speed}
                    config={{
                      file: {
                        tracks:
                          typeof subtitles == "array"
                            ? subtitles.map((e) => ({
                                kind: "captions",
                                src: "/api/subtitleconvet?l=" + e.utf8,
                                srcLang: e.langcode,
                              }))
                            : [],
                      },
                    }}
                    url={fullplayerconfig.url}
                    onProgress={(e) => {
                      setfullplayerconfig((dat) => ({
                        ...dat,
                        progess: Math.floor(e.playedSeconds),
                        seekval: e.playedSeconds,
                      }));
                    }}
                    onDuration={(e) => {
                      setserverFailureTimes(0);
                      // setReactPlayerMediIsReady(true)
                      setfullplayerconfig((dat) => ({
                        ...dat,
                        duration: Math.floor(e),
                      }));
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div ref={controlsref} className="">
              {/* <Link href={`/MovieDetails?imdbID=${getParameterByName("d")}`}> */}
              <button
                onClick={() => {
                  router.push(
                    `/MovieDetails?imdbID=${getParameterByName("d")}`
                  );
                }}
                className="z-[2] absolute items-center gap-2 pl-[1rem] flex justify-start top-[1.9rem] left-[0.5rem] rounded-md h-[2rem]  w-[3rem]  cursor-pointer "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#fff"
                  className="w-6 h-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
              {/* </Link> */}
              <div
                className="absolute py-[5px] md:py-[30px] flex px-[60px] top-0 left-0 z-[1] w-[100%] font-bold tracking-wide text-2xl"
                style={{ fontFamily: "Rubik" }}
              >
                <h3 className="mr-[0.2rem]">{getParameterByName("t")}</h3>
                <h3 className="tracking-[2px]">
                  {awsinds_r_title
                    ? "💠" +
                      "S-" +
                      awsinds_r_title.split("-")[0] +
                      " " +
                      "E-" +
                      awsinds_r_title.split("-")[1]
                    : season_and_edisode_title}
                </h3>
              </div>
              <div className="absolute bottom-0 left-0 z-[1] w-[100%]">
                <div className=" relative w-[100%]">
                  <div className="flex flex-row md:px-[50px]">
                    {/* {fullplayerconfig.duration ? ( */}
                    <Seekbar
                      duration={fullplayerconfig.duration}
                      // setseekwidth={setseekwidth}
                      value={fullplayerconfig.seekval}
                      setfullplayerconfig={setfullplayerconfig}
                    />
                    {/* ) : null} */}
                    <h3
                      style={{ fontFamily: "Rubik" }}
                      className="min-w-[5.8rem] text-xl tracking-wider font-semibold"
                    >
                      {fullplayerconfig.duration != 0
                        ? `${String(
                            Math.floor(fullplayerconfig.duration / 3600)
                              ? Math.floor(
                                  (fullplayerconfig.duration -
                                    fullplayerconfig.progess) /
                                    3600
                                )
                              : "00"
                          ).padStart(2, "0")}:${String(
                            Math.floor(
                              ((fullplayerconfig.duration -
                                fullplayerconfig.progess) %
                                3600) /
                                60
                            )
                          ).padStart(2, "0")}:${String(
                            Math.floor(
                              ((fullplayerconfig.duration -
                                (fullplayerconfig.progess % 3600)) %
                                60) %
                                60
                            )
                          ).padStart(2, "0")}`
                        : "--:--:--"}
                    </h3>
                  </div>
                  <div className=" flex items-center justify-between pb-[5px] md:pb-[25px] md:pt-[15px] md:px-[50px] flex-row w-[100%] ">
                    <div className="flex md:gap-0 gap-[0.85rem]">
                      {fullplayerconfig.playing ? (
                        <img
                          ref={pausevidref}
                          className="w-8 h-8  cursor-pointer hover:scale-110  transition-all duration-200"
                          src={pausesvg.src}
                          onClick={() => {
                            setfullplayerconfig((dat) => ({
                              ...dat,
                              playing: !fullplayerconfig.playing,
                            }));
                          }}
                          alt=""
                        />
                      ) : (
                        <img
                          ref={playvidref}
                          className="w-8 h-8  cursor-pointer hover:scale-110  transition-all duration-200"
                          src={o_playsvg.src}
                          onClick={() => {
                            setfullplayerconfig((dat) => ({
                              ...dat,
                              playing: !fullplayerconfig.playing,
                            }));
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.src = playsvg.src;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.src = o_playsvg.src;
                          }}
                          alt=""
                        />
                      )}
                      <div
                        ref={videobackwardref}
                        onMouseEnter={(e) => {
                          e.currentTarget.firstChild.src = backwardsvg.src;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.firstChild.src = o_backwardsvg.src;
                        }}
                        onClick={() => {
                          videoref.current.seekTo(
                            videoref.current.getCurrentTime() - 10,
                            "seconds"
                          );
                        }}
                        className="md:ml-[25px] cursor-pointer flex flex-row items-center justify-center "
                      >
                        <img
                          className="w-8 h-8   "
                          src={o_backwardsvg.src}
                          alt=""
                        />
                        <h3 style={{ fontFamily: "Rubik" }}>10s</h3>
                      </div>
                      <div
                        ref={videoforwardref}
                        onMouseEnter={(e) => {
                          e.currentTarget.lastChild.src = forwardsvg.src;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.lastChild.src = o_forwardsvg.src;
                        }}
                        onClick={() => {
                          videoref.current.seekTo(
                            videoref.current.getCurrentTime() + 10,
                            "seconds"
                          );
                        }}
                        className="md:ml-[25px] cursor-pointer flex flex-row items-center justify-center "
                      >
                        <h3 style={{ fontFamily: "Rubik" }}>10s</h3>
                        <img
                          className="w-8 h-8  "
                          src={o_forwardsvg.src}
                          alt=""
                        />
                      </div>
                      <div className="md:ml-[25px] flex flex-row items-center justify-center ">
                        <img
                          className="w-8 h-8  cursor-pointer "
                          src={o_speakersvg.src}
                          onClick={(e) => {
                            if (!fullplayerconfig.muted) {
                              setfullplayerconfig((dat) => ({
                                ...dat,
                                muted: true,
                              }));
                              e.currentTarget.src = mutedsvg.src;
                            } else {
                              setfullplayerconfig((dat) => ({
                                ...dat,
                                muted: false,
                              }));
                              e.currentTarget.src = speakersvg.src;
                            }
                          }}
                          onMouseEnter={(e) => {
                            if (e.currentTarget.src.includes("speaker")) {
                              e.currentTarget.src = speakersvg.src;
                            } else {
                              e.currentTarget.src = mutedsvg.src;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (e.currentTarget.src.includes("speaker")) {
                              e.currentTarget.src = o_speakersvg.src;
                            } else {
                              e.currentTarget.src = o_mutedsvg.src;
                            }
                          }}
                          alt=""
                        />
                        <div className="md:ml-[0.5rem] hidden md:block">
                          <Usableseekbar
                            value={videovolumevalue}
                            setvalue={setvideovolumevalue}
                            totalvalue={100}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex md:gap-0 gap-[0.85rem]">
                      {new URL(document.URL).searchParams.get("ty") == "tv" ? (
                        <button
                          className={`py-2 px-4 bg-[rgba(0,0,0,0.1)] mr-[1rem] rounded-md text-white flex gap-[0.5rem] items-center ${
                            !setingopennextephide ? "opacity-100" : "opacity-0"
                          }`}
                          onClick={() => {
                            var currentepisode = new URL(
                              document.URL
                            ).searchParams.get("e");
                            var newurl = new URL(document.URL);
                            newurl.searchParams.delete("duration");
                            newurl.searchParams.delete("e");
                            newurl.searchParams.set(
                              "e",
                              currentepisode ? Number(currentepisode) + 1 : 2
                            );
                            // newurl
                            // console.log(newurl);
                            // url.split("").map(el=>el.includes("e="))
                            window.document.location =
                              newurl.pathname + newurl.search;
                          }}
                          style={{ fontFamily: "rubik" }}
                        >
                          <i className="fi fi-sr-angle-double-small-right mt-[0.3rem]"></i>
                          <h3>Next Episode</h3>
                        </button>
                      ) : (
                        <></>
                      )}
                      {getSettingsElement()}
                      <div className="md:mr-[25px] flex flex-row items-center justify-center ">
                        <img
                          className="w-8 h-8  cursor-pointer "
                          src={o_subtitlesvg.src}
                          onMouseEnter={(e) => {
                            e.currentTarget.src = subtitlesvg.src;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.src = o_subtitlesvg.src;
                          }}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          ref={videofullscreen}
                          onClick={(e) => {
                            toggleFullScreen();
                            if (e.currentTarget.src.includes("fullscreen")) {
                              e.currentTarget.src = orignalscreensvg.src;
                            } else {
                              e.currentTarget.src = fullscreensvg.src;
                            }
                          }}
                          className="w-8 h-8 mr-[0.2rem] hover:scale-110 cursor-pointer transition-all duration-200"
                          src={fullscreensvg.src}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className="z-[-1] absolute bottom-0 h-[6rem] before:contents before:absolute bg-gradient-to-t from-black via-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0)] w-[100vw]"></div> */}
                </div>
              </div>
            </div>
          </div>
        ) : !forceMainLoadingCompleted ? (
          <MovizLoding backdrop={getParameterByName("backdrop")} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PlayerRVideo;
