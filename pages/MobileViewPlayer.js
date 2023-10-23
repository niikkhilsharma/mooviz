import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Router from "next/router";
import $ from "jquery";
import ReactPlayer from "react-player";
import Seekbar from "../components/Seekbar";
// import "react-seekbar-component/dist/index.css";

const Playerpage = (props) => {
  const [value, setvalue] = useState(0);
  const videoref = useRef(null);
  const controlsref = useRef(null);
  const [videovolume, setvideovolume] = useState(100);
  const [seekwidth, setseekwidth] = useState(0);
  const [fullplayerconfig, setfullplayerconfig] = useState({
    playing: true,
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
          controlsref.current.classList.add("hidden");
        }, 8000);
      };

      document.body.addEventListener("mousemove", (e) => {
        whenMouseMoves();
        if (controlsref.current) {
          controlsref.current.classList.remove("hidden");
        }
      });
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
  useEffect(() => {
    (async () => {
      var datasec2 = await axios.get(
        `/api/server4/getStream?imdb=${getParameterByName("d")}`
      );
      setfullplayerconfig((dat) => ({
        ...dat,
        url: datasec2.data.source.vidSource.replace(".txt", ".m3u8"),
      }));
      //   axios
      //     .get(`/api/getStream?imdb=${getParameterByName("d")}`)
      //     .then((dat) => {
      //       (async () => {
      //         // console.log(dat);
      //         if (!dat.data.streamable) {
      //           // router.push("/");

      //           // setsecMovie(datasec2.source.vidSource)
      //           alert("Not Streamable!");
      //         } else {
      //           setalltracks(dat.data);
      //           // console.log(dat.data.data[0].file);
      //           // console.log(dat.data.referer);
      //           // console.log(dat.data.key);
      //           // console.log(
      //           //   dat.data.data[0].file ||
      //           //     dat.data.data[0].folder[0].file ||
      //           //     dat.data.data[0].folder[0].folder[0].file ||
      //           //     dat.data.data[1].file
      //           // );
      //           await axios
      //             .post(`/api/getStreamVideo`, {
      //               file:
      //                 dat.data.data[0].file ||
      //                 dat.data.data[0].folder[0].file ||
      //                 dat.data.data[0].folder[0].folder[0].file ||
      //                 dat.data.data[1].file,
      //               key: dat.data.key,
      //               referer: dat.data.referer,
      //             })
      //             .then((m33) =>
      //               setfullplayerconfig((dat) => ({ ...dat, url: m33.data.data }))
      //             );
      //         }
      //       })();
      // });
    })();
  }, []);

  return (
    <>
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
            <ReactPlayer
              width={"100vw"}
              height={"100vh"}
              ref={videoref}
              controls={false}
              muted={fullplayerconfig.muted}
              onBuffer={(e) => console.log("loading", e)}
              playing={fullplayerconfig.playing}
              onBufferEnd={(e) => console.log("buffer", e)}
              volume={fullplayerconfig.volume}
              url={fullplayerconfig.url}
              onProgress={(e) => {
                setfullplayerconfig((dat) => ({
                  ...dat,
                  progess: Math.floor(e.playedSeconds),
                  seekval: e.playedSeconds,
                }));
              }}
              onDuration={(e) => {
                window.document.requestFullscreen ||
                  window.document.mozRequestFullScreen ||
                  window.document.webkitRequestFullScreen ||
                  window.document.msRequestFullscreen;
                setfullplayerconfig((dat) => ({
                  ...dat,
                  duration: Math.floor(e),
                }));
              }}
              // url="https://drive1.uploadever.in:183/d/37debutxrhr3cm5l7s2lobpv4fkczi7pjb3e4eqpwlanrdab5ezqmsleoc4rlntxohyzio3d/HDMovies4u.CAM-Red 2021 WebRip UNCUT 720p Hindi Telugu AAC 2.0 x264 ESub.mkv"
            />
          </div>
          <div ref={controlsref} className="">
            <div
              className="absolute py-[30px] px-[60px] top-0 left-0 z-[1] w-[100%] font-bold tracking-wide text-2xl"
              style={{ fontFamily: "Rubik" }}
            >
              {/* {getParameterByName("t")} */}
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
                    className="min-w-[5.8rem] text-xl tracking-wider font-semibold text-white"
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
                        e.currentTarget.firstChild.src = "/svg/o-backward.svg";
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
                      <h3
                        className="text-white"
                        style={{ fontFamily: "Rubik" }}
                      >
                        10s
                      </h3>
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
                      <h3
                        className="text-white"
                        style={{ fontFamily: "Rubik" }}
                      >
                        10s
                      </h3>
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
                <div className="z-[-1] absolute bottom-0 h-[6rem] before:contents before:absolute bg-gradient-to-t from-black via-[rgba(0,0,0,1)] to-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0)] w-[100vw]"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2 animate-bounce mt-[50vh] ">
          <div className="w-8 h-8 bg-blue-400 rounded-full animate-bounce-slow"></div>
          <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
          <div className="w-8 h-8 bg-red-400 rounded-full animate-bounce-slow"></div>
        </div>
      )}
    </>
  );
};

export default Playerpage;
