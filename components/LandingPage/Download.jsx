import React from "react";
import DownloadAds from "./DownloadAds";

function Download() {
  return (
    <div className="after:absolute after:bottom-[-6rem] after:right-0 after:w-[6rem] after:h-[6rem] after:bg-[#020917]  after:rounded-tr-full     |       before:absolute before:bottom-[-6rem] before:right-0 before:w-[6rem] before:h-[6rem] before:bg-[#081730] flex flex-col items-center justify-start text-center  1bg-[#020917] bg-[#081730] h-[48rem] pt-[18rem] mt-[-10rem] relative z-[0] rounded-bl-[5rem]">
      {/* tild icon or path icon */}
      <img
        src={
          "https://res.cloudinary.com/dk3vn0s8q/image/upload/v1671334317/Path_318_wrejko.png"
        }
        alt=""
        className="w-[5rem]"
      />
      {/* heading */}
      <div className="headline mt-7 flex flex-col items-center text-[2rem] px-[2rem]">
        <span>Download The Best Movies</span>
        <span>
          <b>App Now!</b>
        </span>
        <span className="text-[1rem] text-gray-400 px-[1rem] md:px-[15rem] text-center mt-[1rem]">
          Movizz App will give you a chance to enjoy unlimited entertainment
          easier than on any other platform.
        </span>
      </div>
      {/* dowload ads */}
      <div className="mt-14">
        <DownloadAds />
      </div>
    </div>
  );
}

export default Download;
