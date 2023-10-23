import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Router from "next/router";
// import { ReactVideo } from "reactjs-media";
// import ReactHlsPlayer from "react-hls-player";
import $ from "jquery";
import ReactPlayer from "react-player";

const Player = (props) => {
  useEffect(() => {
    $("#navfixed").addClass("hidden");
  }, [$.ready]);
  const router = useRouter();
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
  // console.log(nowm3u8);
  useEffect(() => {
    (async () => {
      axios
        .get(`/api/getStream?imdb=${getParameterByName("d")}`)
        .then((dat) => {
          (async () => {
            console.log(dat);
            if (!dat.data.streamable) {
              // router.push("/");
            } else {
              setalltracks(dat.data);
              console.log(dat.data.data[0].file);
              console.log(dat.data.referer);
              console.log(dat.data.key);
              await axios
                .post(`/api/getStreamVideo`, {
                  file: dat.data.data[0].file,
                  key: dat.data.key,
                  referer: dat.data.referer,
                })
                .then((m33) => setnowm3u8(m33.data.data));
            }
          })();
        });
    })();
  }, []);
  return (
    <>
      {nowm3u8 ? (
        <div className="h-[100vh] w-[100%] overflow-hidden realative flex  justify-center items-center">
          <ReactPlayer
            // className={"scale-[2]"}
            width={"100vw"}
            height={"100vh"}
            controls={true}
            muted={false}
            onBuffer={() => console.log("loading")}
            playing
            url="https://drive1.uploadever.in:183/d/37dedutxrhr3cm5l7s2kmgvv6ec6xbgvfknxlbw6herbl7diy4kwzbcqmegzajosdr7omp7u/HDMovies4u.CAM-Red.2021.WebRip.UNCUT.1080p.Hindi.Telugu.DD.2.0.x264.ESub.mkv"
          />

          {/* <ReactVideo
          src="https://drive1.uploadever.in:183/d/37dedutxrhr3cm5l7s2kmgvv6ec6xbgvfknxlbw6herbl7diy4kwzbcqmegzajosdr7omp7u/HDMovies4u.CAM-Red.2021.WebRip.UNCUT.1080p.Hindi.Telugu.DD.2.0.x264.ESub.mkv"
          primaryColor="red"
          autoPlay
        /> */}
          {/* <ReactHlsPlayer
              className=" bg-black overflow-hidden  outline-none "
              src={
                "https://drive1.uploadever.in:183/d/37dedutxrhr3cm5l7s2kmgvv6ec6xbgvfknxlbw6herbl7diy4kwzbcqmegzajosdr7omp7u/HDMovies4u.CAM-Red.2021.WebRip.UNCUT.1080p.Hindi.Telugu.DD.2.0.x264.ESub.mkv"
              }
              // src={nowm3u8}
              autoPlay={true}
              controls={true}
              width="100%"
              height="100vh"
              hlsConfig={{
                maxLoadingDelay: 4,
                minAutoBitrate: 0,
                lowLatencyMode: true,
              }}
            /> */}
          <div className="absolute bottom-0 left-0 z-[1]">
            <div className="relative">
              {/* <div className="h-[4rem] before:contents before:absolute bg-gradient-to-t from-black via-black to-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0.4)] w-[100vw]"></div> */}
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

export default Player;
