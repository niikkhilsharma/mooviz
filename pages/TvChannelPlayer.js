import React, { useContext, useEffect, useState } from "react";
import MovizLoding from "../components/MovizLoding";
import VideoPlayer from "../components/Plyr-Video-Player";
import { allhomemovies } from "../context/allcontexts";
import { useRouter } from "next/router";
import axios from "axios";
const TvChannelPlayer = () => {
  const [streamUrl, setstreamUrl] = useState("");
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  var router = useRouter();
  useEffect(() => {
    (async () => {
      let { data } = await axios.post("/api/livetv/getchannel", {
        key: atob(getParameterByName("k")),
        p: "web",
      });

      console.log(data);

      if (data.status) {
        setstreamUrl(data.stream);
      }
    })();
  }, []);
  useEffect(() => {
    $("#navfixed").addClass("hidden");
    return () => {
      $("#navfixed").removeClass("hidden");
    };
  }, []);

  return (
    <>
      {streamUrl ? (
        <div>
          <button
            onClick={() => {
              router.push(`/TvChannel?Catagory=${getParameterByName("c")}`);
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
          <div
            className="absolute py-[5px] md:py-[30px] flex px-[60px] top-0 left-0 z-[1] w-[100%] font-bold tracking-wide text-2xl"
            style={{ fontFamily: "Rubik" }}
          >
            {atob(getParameterByName("t"))}
          </div>
          <VideoPlayer src={streamUrl} />
        </div>
      ) : (
        <MovizLoding />
      )}
    </>
  );
};

export default TvChannelPlayer;
