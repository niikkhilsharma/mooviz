import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Router from "next/router";
import $ from "jquery";
import ReactPlayer, { FilePlayer } from "react-player";
import Seekbar from "../components/Seekbar";
import Script from "next/script";
// import { Player } from "video-react";

// import "react-seekbar-component/dist/index.css";

const Playerpage = (props) => {
  const mainloaderref = useRef(null);
  const mainallviddiv = useRef(null);
  const viiiidref = useRef(null);
  const [value, setvalue] = useState(0);
  const videoref = useRef(null);
  const controlsref = useRef(null);
  const [videovolume, setvideovolume] = useState(100);
  const [seekwidth, setseekwidth] = useState(0);
  const [fullplayerconfig, setfullplayerconfig] = useState({
    playing: false,
    muted: false,
    volume: 1,
    url: "",
    duration: "0",
    progess: 0,
    seekval: 0,
    goto: 0,
  });
  useEffect(() => {
    // console.log(fullplayerconfig.goto);
    if (fullplayerconfig.goto) {
      videoref.current.seekTo(fullplayerconfig.goto, "seconds");
    }
  }, [fullplayerconfig.goto]);

  function toggleFullScreen() {
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
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  }

  useEffect(() => {
    if (fullplayerconfig.url) {
      let timeout;
      let whenMouseMoves = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (controlsref?.current?.classList) {
            controlsref.current.classList.add("hidden");
          }
        }, 8000);
      };

      document.body.addEventListener("mousemove", (e) => {
        whenMouseMoves();
        if (controlsref?.current?.classList) {
          controlsref.current.classList.remove("hidden");
        }
      });
      return () => {
        clearTimeout(timeout);
      };
    }
    return () => {
      // clearTimeout(timeout);
      // document.body.removeEventListener("mousemove");
    };
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

  const [alltracks, setalltracks] = useState({});
  const [nowm3u8, setnowm3u8] = useState("");
  // console.log("m3u8", nowm3u8);
  const onetimeemb = useMemo(() => false, []);
  useEffect(() => {
    (async () => {
      axios
        .get(`/api/getStream?imdb=${getParameterByName("d")}`)
        .then((dat) => {
          (async () => {
            // console.log(dat);
            if (!dat.data.streamable) {
              // router.push("/");
              var datasec2 = await axios.get(
                `/api/server4/getStream?imdb=${getParameterByName("d")}`
              );
              if (!datasec2.data.streamable) {
                mainloaderref.current.classList.add("hidden");
                var ifrfor2em = document.createElement("iframe");
                ifrfor2em.className = "w-[100vw] h-[100vh]";
                if (!onetimeemb) {
                  onetimeemb = true;
                  if (getParameterByName("ty") == "tv") {
                    ifrfor2em.src = `https://www.2embed.to/embed/imdb/tv?id=${getParameterByName(
                      "d"
                    )}&s=1&e=1`;
                  } else {
                    ifrfor2em.src = `https://www.2embed.to/embed/imdb/movie?id=${getParameterByName(
                      "d"
                    )}`;
                  }
                  mainallviddiv.current.appendChild(ifrfor2em);
                }
              } else {
                // mainloaderref.current.classList.add("hidden");
                // const options = {
                //   headers: {
                //     Authorization: `Bearer ya29.a0Aa4xrXMqth_f_BsmkHgM3KFP1NHXfgK1oh99X5o8L36qJWMyxuaVVSM7heFfVt-8gzaS2VwTkBR9pZn3trfSUQ1Bsl335QotFQn4XoHFXot3PEK9ENHsUf5A_164MvtwF64ps6ZmHvpeB9P7DFwUGM4jsQEiaCgYKATASARISFQEjDvL9cf85P2joDVpEkcod-qp8ug0163`,
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
                //     // setfullplayerconfig((dat) => ({
                //     //   ...dat,
                //     //   // url: "https://drive.google.com/u/4/uc?id=1N7k1PCIMQ1rUj07W-aaGGccpzD5bUMok&export=download&confirm=t&uuid=517326a5-effa-438f-ac80-4c9f0a78fddc",
                //     //   url: URL.createObjectURL(blob),
                //     // }));
                //     // setUrl()
                //   });
                setfullplayerconfig((dat) => ({
                  ...dat,
                  url: "http://localhost:9001/1ujz3V4PQVRF8pzCRekJLP695QufFWrws",
                  // url: datasec2.data.source.vidSource.replace(".txt", ".m3u8"),
                }));
              }
              // setsecMovie(datasec2.source.vidSource)
            } else {
              setalltracks(dat.data);
              // console.log(dat.data.data[0].file);
              // console.log(dat.data.referer);
              // console.log(dat.data.key);
              // console.log(
              //   dat.data.data[0].file ||
              //     dat.data.data[0].folder[0].file ||
              //     dat.data.data[0].folder[0].folder[0].file ||
              //     dat.data.data[1].file
              // );
              await axios
                .post(`/api/getStreamVideo`, {
                  file:
                    dat.data.data[0].file ||
                    dat.data.data[0].folder[0].file ||
                    dat.data.data[0].folder[0].folder[0].file ||
                    dat.data.data[1].file,
                  key: dat.data.key,
                  referer: dat.data.referer,
                })
                .then((m33) =>
                  setfullplayerconfig((dat) => ({ ...dat, url: m33.data.data }))
                );
            }
          })();
        });
    })();
  }, []);

  return (
    <>
      {/* <script src="https://unpkg.com/video.js/dist/video.js"></script> */}
      <meta name="robots" content="noindex" />
      {/* <Script strategy="lazyOnload">
        {`
  videojs.Hls.xhr.beforeRequest = function(options) {
    options.headers = options.headers || {};
    options.headers.Authorization = 'Bearer ya29.a0Aa4xrXPWdnNepWbojGNOnw5kqyKS_vscztzc7vhyxuQZfZHjdp9VnscElf_1GLROwccVC-0y1jBOaQmqjijTj1iXUFMLlrYBno_UclNigm4HbNao6uk3mS8QfK2M9F2etbaKC8itHRyDESSYNxgmoH89qtO8aCgYKATASARASFQEjDvL9O8gVt9_rT6tUt_ebgpyOzA0163';
    console.log('options', options)
    return options;
  };
  var player = videojs('my_video');
  player.ready(function() {
    this.src({
      src: "https://www.googleapis.com/drive/v3/files/18sJlw7MbdAsJAv5mSKbKjNCzIbxZik7N?alt=media",
      type: "video/mp4",
    });
  });
    `}
      </Script> */}
      {/* <video
        id="my_video"
        className="video-js"
        controls
        preload="auto"
        autoPlay
        width="640"
        height="268"
        data-setup="{}"
      ></video> */}
      {/* <video
        ref={viiiidref}
        className="w-[100vw] h-[100vh]"
        controls={true}
        // type="video/x-matroska"
        // src="http://localhost:9001/1ujz3V4PQVRF8pzCRekJLP695QufFWrws"
      >
        <source
          src="http://localhost:9001/1ujz3V4PQVRF8pzCRekJLP695QufFWrws"
          type="video/mp4"
        ></source>
      </video> */}
      {/* <iframe src="https://drive.google.com/file/d/1JoQo2tiXaqMmnXIq-4YiuG-T72c7y0H4/preview"></iframe> */}
      {/* <video
        src="https://3.bp.blogspot.com/LCUYuX4m8qLXwmjETtePzOgcycqZAhSeR7warOrPQJfF02jzKY_qPpE2Kzkb6BK8Oysyx_mVuscbPl2rRj-6uLcEX6N9S-thnEfjUZXG2mG7z-ng3npGispRg95zdwkL3Om4RcCuEA=m18"
        type="video/x-matroska"
        controls
      ></video> */}
      {/* <video
        style={{ userSelect: "auto", width: "-webkit-fill-available" }}
        src={
          "https://drive1.uploadever.in:183/d/37debutxrhr3cm5l7s2lobpv4fkczi7pjb3e4eqpwlanrdab5ezqmsleoc4rlntxohyzio3d/HDMovies4u.CAM-Red 2021 WebRip UNCUT 720p Hindi Telugu AAC 2.0 x264 ESub.mkv"
          // "https://drive1.uploadever.in:183/d/37dedutxrhr3cm5l7s2kmgvv6ec6xbgvfknxlbw6herbl7d33ejdmddo5b6uknt2dzagybw5/HDMovies4u.CAM-Red 2021 WebRip UNCUT 1080p Hindi Telugu DD 2.0 x264 ESub.mkv"
          // "https://drive1.uploadever.in:183/d/37debutxrhr3cm5l7s2lobpv4fkczi7pjb3e4eqpwlanrdab5ezqmsleoc4rlntxohyzio3d/HDMovies4u.CAM-Red 2021 WebRip UNCUT 720p Hindi Telugu AAC 2.0 x264 ESub.mkv"
          // "https://drive2.uploadever.in:183/d/3tdl7u3xrhr3cm5l7s2l6rvq7egvn6r7xq27wp6vgkipljjid5vceeqkyfyesl5c553xwq7l/HDMovies4u.CAM-Red 2021 WebRip UNCUT Hindi Telugu 480p ESub.mkv"
        }
        type='video/x-matroska; codecs="theora, vorbis"'
        controls={true}
      /> */}
      <div ref={mainallviddiv} className={"w-[100%] h-[100%]"}>
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
              {/* <Player
                autoPlay={fullplayerconfig.playing}
                // playsInline=
                aspectRatio="auto"
                classList="w-[100vw] h-[100vh]"
                width={"100vw"}
                height={"100vh"}
                src={fullplayerconfig.url}
              /> */}
              {/* <ReactPlayer
                playing
                controls
                config={{
                  forceVideo: true,
                  forceDASH: true,
                  file: {
                    forceVideo: true,
                  },
                }}
                url={{
                  src: "http://localhost:9001/1ujz3V4PQVRF8pzCRekJLP695QufFWrws",
                  type: "video/x-matroska",
                }}
                fallback={null}
                playsinline={true}
                onReady={() => console.log("ready")}
              /> */}
              {/* <ReactPlayer
                width={"100vw"}
                height={"100vh"}
                ref={videoref}
                controls={false}
                muted={fullplayerconfig.muted}
                onBuffer={(e) => console.log("loading", e)}
                playing={fullplayerconfig.playing}
                onBufferEnd={(e) => console.log("buffer", e)}
                volume={fullplayerconfig.volume}
                // url={
                //   "https://drive.google.com/u/4/uc?id=1N7k1PCIMQ1rUj07W-aaGGccpzD5bUMok&export=download&confirm=t&uuid=517326a5-effa-438f-ac80-4c9f0a78fddc"
                // }
                url={"http://localhost:9001/1ujz3V4PQVRF8pzCRekJLP695QufFWrws"}
                // url={fullplayerconfig.url}
                fallback={null}
                onError={(e) => {
                  console.log(e);
                }}
                config={{
                  file: {
                    // forceHLS: true,
                    // forceVideo: true,
                    hlsOptions: {
                      FilePlayer: true,
                      forceHLS: true,
                      debug: false,
                    },
                  },
                }}
                onProgress={(e) => {
                  setfullplayerconfig((dat) => ({
                    ...dat,
                    progess: Math.floor(e.playedSeconds),
                    seekval: e.playedSeconds,
                  }));
                }}
                onDuration={(e) =>
                  setfullplayerconfig((dat) => ({
                    ...dat,
                    duration: Math.floor(e),
                  }))
                }
                // url="https://drive1.uploadever.in:183/d/37debutxrhr3cm5l7s2lobpv4fkczi7pjb3e4eqpwlanrdab5ezqmsleoc4rlntxohyzio3d/HDMovies4u.CAM-Red 2021 WebRip UNCUT 720p Hindi Telugu AAC 2.0 x264 ESub.mkv"
              /> */}
              {/* <ReactPlayer
                width={"100vw"}
                height={"100vh"}
                // ref={videoref}
                controls={false}
                muted={fullplayerconfig.muted}
                onBuffer={(e) => console.log("loading", e)}
                playing={fullplayerconfig.playing}
                onBufferEnd={(e) => console.log("buffer", e)}
                volume={fullplayerconfig.volume}
                // config={{
                //   file: {
                //     forceHLS: true,
                //     hlsOptions: {
                //       //forceHLS: true,
                //       debug: false,
                //       xhrSetup: function (xhr, url) {
                //         if (needsAuth(url)) {
                //           xhr.setRequestHeader(
                //             "Authorization",
                //             "Bearer ya29.a0Aa4xrXMqth_f_BsmkHgM3KFP1NHXfgK1oh99X5o8L36qJWMyxuaVVSM7heFfVt-8gzaS2VwTkBR9pZn3trfSUQ1Bsl335QotFQn4XoHFXot3PEK9ENHsUf5A_164MvtwF64ps6ZmHvpeB9P7DFwUGM4jsQEiaCgYKATASARISFQEjDvL9cf85P2joDVpEkcod-qp8ug0163"
                //           );
                //         }
                //       },
                //     },
                //   },
                // }}
                url={"http://localhost:9001/1ujz3V4PQVRF8pzCRekJLP695QufFWrws"}
                onProgress={(e) => {
                  setfullplayerconfig((dat) => ({
                    ...dat,
                    progess: Math.floor(e.playedSeconds),
                    seekval: e.playedSeconds,
                  }));
                }}
                onDuration={(e) =>
                  setfullplayerconfig((dat) => ({
                    ...dat,
                    duration: Math.floor(e),
                  }))
                }
                // url="https://drive1.uploadever.in:183/d/37debutxrhr3cm5l7s2lobpv4fkczi7pjb3e4eqpwlanrdab5ezqmsleoc4rlntxohyzio3d/HDMovies4u.CAM-Red 2021 WebRip UNCUT 720p Hindi Telugu AAC 2.0 x264 ESub.mkv"
              /> */}
            </div>
            <div ref={controlsref} className="">
              <div
                className="absolute py-[30px] px-[60px] top-0 left-0 z-[1] w-[100%] font-bold tracking-wide text-2xl"
                style={{ fontFamily: "Rubik" }}
              >
                {getParameterByName("t")}
              </div>
              <div className="absolute bottom-0 left-0 z-[1] w-[100%]">
                <div className=" relative w-[100%]">
                  <div className="flex flex-row px-[50px]">
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
                  <div className=" flex items-center justify-between pb-[25px] pt-[15px] px-[50px] flex-row w-[100%] ">
                    <div className="flex">
                      {fullplayerconfig.playing ? (
                        <img
                          className="w-8 h-8  cursor-pointer hover:scale-110  transition-all duration-200"
                          src="/svg/pause.svg"
                          onClick={() =>
                            setfullplayerconfig((dat) => ({
                              ...dat,
                              playing: !fullplayerconfig.playing,
                            }))
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-8 h-8  cursor-pointer hover:scale-110  transition-all duration-200"
                          src="/svg/o-play.svg"
                          onClick={() => {
                            const hidcntrltimer = setTimeout(() => {
                              clearTimeout(hidcntrltimer);
                              controlsref.current.classList.add("hidden");
                            }, 8000);
                            setfullplayerconfig((dat) => ({
                              ...dat,
                              playing: !fullplayerconfig.playing,
                            }));
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.src = "/svg/play.svg";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.src = "/svg/o-play.svg";
                          }}
                          alt=""
                        />
                      )}
                      <div
                        onMouseEnter={(e) => {
                          e.currentTarget.firstChild.src = "/svg/backward.svg";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.firstChild.src =
                            "/svg/o-backward.svg";
                        }}
                        onClick={() => {
                          videoref.current.seekTo(
                            videoref.current.getCurrentTime() - 10,
                            "seconds"
                          );
                        }}
                        className="ml-[25px] cursor-pointer flex flex-row items-center justify-center "
                      >
                        <img
                          className="w-8 h-8   "
                          src="/svg/o-backward.svg"
                          alt=""
                        />
                        <h3 style={{ fontFamily: "Rubik" }}>10s</h3>
                      </div>
                      <div
                        onMouseEnter={(e) => {
                          e.currentTarget.lastChild.src = "/svg/forward.svg";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.lastChild.src = "/svg/o-forward.svg";
                        }}
                        onClick={() => {
                          videoref.current.seekTo(
                            videoref.current.getCurrentTime() + 10,
                            "seconds"
                          );
                        }}
                        className="ml-[25px] cursor-pointer flex flex-row items-center justify-center "
                      >
                        <h3 style={{ fontFamily: "Rubik" }}>10s</h3>
                        <img
                          className="w-8 h-8  "
                          src="/svg/o-forward.svg"
                          alt=""
                        />
                      </div>
                      <div className="ml-[25px] flex flex-row items-center justify-center ">
                        <img
                          className="w-8 h-8  cursor-pointer "
                          src="/svg/o-speaker.svg"
                          onClick={(e) => {
                            if (!fullplayerconfig.muted) {
                              setfullplayerconfig((dat) => ({
                                ...dat,
                                muted: true,
                              }));
                              e.currentTarget.src = "/svg/muted.svg";
                            } else {
                              setfullplayerconfig((dat) => ({
                                ...dat,
                                muted: false,
                              }));
                              e.currentTarget.src = "/svg/speaker.svg";
                            }
                          }}
                          onMouseEnter={(e) => {
                            if (e.currentTarget.src.includes("speaker")) {
                              e.currentTarget.src = "/svg/speaker.svg";
                            } else {
                              e.currentTarget.src = "/svg/muted.svg";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (e.currentTarget.src.includes("speaker")) {
                              e.currentTarget.src = "/svg/o-speaker.svg";
                            } else {
                              e.currentTarget.src = "/svg/o-muted.svg";
                            }
                          }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-[25px] flex flex-row items-center justify-center ">
                        <img
                          className="w-8 h-8  cursor-pointer "
                          src="/svg/o-settings.svg"
                          onMouseEnter={(e) => {
                            e.currentTarget.src = "/svg/settings.svg";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.src = "/svg/o-settings.svg";
                          }}
                          alt=""
                        />
                      </div>
                      <div className="mr-[25px] flex flex-row items-center justify-center ">
                        <img
                          className="w-8 h-8  cursor-pointer "
                          src="/svg/o-subtitle.svg"
                          onMouseEnter={(e) => {
                            e.currentTarget.src = "/svg/subtitle.svg";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.src = "/svg/o-subtitle.svg";
                          }}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          onClick={(e) => {
                            toggleFullScreen();
                            if (e.currentTarget.src.includes("fullscreen")) {
                              e.currentTarget.src = "/svg/orignalscreen.svg";
                            } else {
                              e.currentTarget.src = "/svg/fullscreen.svg";
                            }
                          }}
                          className="w-8 h-8 mr-[0.2rem] hover:scale-110 cursor-pointer transition-all duration-200"
                          src="/svg/fullscreen.svg"
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
        ) : (
          <div
            ref={mainloaderref}
            className="flex items-center justify-center space-x-2 animate-bounce mt-[50vh] "
          >
            <div className="w-8 h-8 bg-blue-400 rounded-full animate-bounce-slow"></div>
            <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
            <div className="w-8 h-8 bg-red-400 rounded-full animate-bounce-slow"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Playerpage;
