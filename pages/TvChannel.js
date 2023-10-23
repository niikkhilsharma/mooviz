import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { allhomemovies } from "../context/allcontexts";
import { useRouter } from "next/router";
const TvChannel = () => {
  var { AllChanneldata, setAllChanneldata } = useContext(allhomemovies);
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  var router = useRouter();
  const [allchannelofcata, setallchannelofcata] = useState([]);
  useEffect(() => {
    (async () => {
      if (AllChanneldata["Entertainment"]) {
        setallchannelofcata(AllChanneldata[getParameterByName("Catagory")]);
      } else {
        var axres = await axios
          .get("/api/livetv/AllChannels")
          .then((d) => d.data);
        if (!axres.errors) {
          setallchannelofcata(
            axres.allChannels[getParameterByName("Catagory")]
          );
          setAllChanneldata(axres.allChannels);
          //   console.log(axres.allChannels["Entertainment"].Hindi[0].logo);
        }
      }
    })();
  }, []);

  return (
    <div>
      <div className="flex justify-start items-center">
        <div
          onClick={() => {
            router.push("/TvChannels");
          }}
          className="md:flex hidden translate-y-[10px] items-center  gap-2 pl-[1rem]  justify-start  left-[3rem] rounded-md h-[3rem] w-[10rem] border-2  border-[rgba(51,65,85,0.2)] bg-[rgba(0,0,0,0.2)] cursor-pointer hover:bg-[rgba(0,0,0,0.3)] backdrop-blur-[1px]"
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
      </div>
      {Object.keys(allchannelofcata).map((e) => (
        <div key={e}>
          <div>
            <div className=" border-b-2 border-b-[rgba(255,255,255,0.1)]  font-semibold text-xl md:text-3xl px-4 py-[1rem]">
              {e + " " + getParameterByName("Catagory") + " Channels"}
            </div>
            <div
              // style={{ "grid-template-columns": "repeat(auto-fill, 130px)" }}
              className="grid 1md:grid-cols-8 1grid-cols-4 justify-items-center md:grid-cols-[repeat(auto-fill,175px)] grid-cols-[repeat(auto-fill,6rem)] justify-center -110px   py-2 gap-[1rem] "
            >
              {allchannelofcata[e].map((e) => (
                <div
                  key={e.key}
                  onClick={() => {
                    router.push({
                      pathname: "/TvChannelPlayer",
                      query: {
                        k: btoa(e.key),
                        c: getParameterByName("Catagory"),
                        t: btoa(e.title),
                      },
                    });
                  }}
                  className="md:w-[10rem] overflow-hidden  md:h-[10rem] w-[6rem] h-[6rem] border-2 bg-gray-300 border-[rgba(255,255,255,0.1)]  flex justify-center items-start relative rounded-2xl cursor-pointer hover:bg-gray-400 transition-all duration-200 group"
                >
                  <style>{`
            @keyframes bgtransformanims {
              0%{
                transform:rotate(0deg) scale(1) translateY(-100%);
                opacity:0.4;
                // top:-20%;
              }
              25%{
                transform:rotate(90deg) scale(1.1) translateY(100%) ;
                opacity:0.6;
                // bottom:-20%;
                // top:auto;
              }
              50%{
                transform:rotate(135deg) scale(1.2)  translateY(-100%);
                opacity:0.8;
                // bottom:auto;
                // top:-20%;
              }
              75%{
                transform:rotate(180deg) scale(1.3) translateY(100%) ;
                opacity:0.6;
                // bottom:-20%;
                // top:auto;
              }
              100%{
                transform:rotate(360deg) scale(1) translateY(-100%) ;
                opacity:0.4;
                // top:-20%;
                // bottom:initial;
              }
            }
            `}</style>
                  <div
                    style={{
                      background:
                        "linear-gradient(70deg,rgba(100,255,30,1),magenta)",
                      animation: "bgtransformanims 20s ease-in-out infinite",
                    }}
                    className="absolute top-[-20%] right-[-20%] w-[10rem] h-[10rem] rounded-full 1bg-gradient-to-b from-[rgba(0,200,30,1)] to-pink-600 blur-[1.5rem] z-[1]"
                  />
                  <img
                    src={e.logo}
                    alt=""
                    className="group-hover:scale-110 transition-all duration-200 z-[2] drop-shadow-[0_29px_29px_rgba(100,50,0,1)]"
                  />
                  <div
                    style={{ fontFamily: "kanit" }}
                    className="absolute bottom-[6px] 1font-[700] md:text-base z-[2] text-[0.8rem] text-black left-[0px] w-full text-center line-clamp-1"
                  >
                    {e.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TvChannel;
