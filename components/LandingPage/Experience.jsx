import React, { useRef } from "react";
import Feature from "./Feature";

function Experience() {
  return (
    <div className="after:absolute after:bottom-[-6rem] after:right-0 after:w-[6rem] after:h-[6rem] after:bg-[#081730]  after:rounded-tr-full     |       before:absolute before:bottom-[-6rem] before:right-0 before:w-[6rem] before:h-[6rem] before:bg-[#020917] experience flex flex-col items-center justify-start  bg-[#020917] 1md:h-[60rem] 1h-[90rem] pt-[18rem] mt-[-10rem] relative z-[2] rounded-bl-[5rem]">
      {/* titld icon */}
      <img
        src={
          "https://res.cloudinary.com/dk3vn0s8q/image/upload/v1671334317/Path_318_wrejko.png"
        }
        alt=""
        className="w-[5rem]"
      />
      {/* heading */}
      <div className="headline px-[2rem] text-center mt-7 flex flex-col items-center text-[2rem]">
        <span>An Amazing App Can Change Your Daily Life</span>
        <span>
          <b>Movizz Experience</b>
        </span>
      </div>
      {/* features  */}
      <div className="feature flex items-center flex-wrap justify-around mt-[6rem] w-[100%]  mb-[8rem]">
        <Feature
          icon="https://res.cloudinary.com/dk3vn0s8q/image/upload/v1671333367/cbimage_lmimkf.png"
          title="Movies/Series Stream"
          desc="Allows you to Watch Or download any TV Show, Movie, or video. Enjoy watching your favorite videos Online/offline."
        />
        <Feature
          img="contentmanegement.svg"
          // icon="music icon"
          title="Content Manegement"
          desc="We Have 10L+ Collection Of Movies Tv Series & Almost Every Tv Channels For Our Viewers. All In Free  "
        />
        <Feature
          icon="https://res.cloudinary.com/dk3vn0s8q/image/upload/v1671333358/cbimage_3_kln5yo.png"
          title="HD Stream"
          desc="Provides High Quality Premium Contents. Playing all HD Media Contact Such As Movies/TvSeries/TvChannels.Give Us A Chance To Serve You"
        />
      </div>
      {/* <div className="mt-[1rem]">
      </div> */}
    </div>
  );
}

export default Experience;
