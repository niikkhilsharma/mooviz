import { React, useState, useRef } from "react";
import DownloadAds from "./DownloadAds";
import { useInViewport } from "react-in-viewport";
// import VisibilitySensor from "react-visibility-sensor";
// import { motion } from "framer-motion";

function Hero() {
  const WaveAnimRef = useRef(null);
  const { inViewport: WaveAnimRef_inport } = useInViewport(
    WaveAnimRef,
    {},
    { disconnectOnLeave: false },
    {}
  );

  const [elementIsVisible, setElementIsVisible] = useState(false);
  const bg = {
    true: {
      left: "7rem",
    },
    false: {
      left: "19rem",
    },
  };
  const musicPlayer = {
    true: {
      left: "295px",
    },
    false: {
      left: "235px",
    },
  };
  const rect = {
    true: {
      left: "11rem",
    },
    false: {
      left: "13rem",
    },
  };
  const heart = {
    true: {
      left: "9rem",
    },
    false: {
      left: "12.5rem",
    },
  };
  return (
    // <VisibilitySensor
    //   onChange={(isVisible) => setElementIsVisible(isVisible)}
    //   minTopValue={300}
    // >
    <div className="after:absolute after:bottom-[-6rem] after:right-0 after:w-[6rem] after:h-[6rem] after:bg-[#020917]  after:rounded-tr-full     |       before:absolute before:bottom-[-6rem] before:right-0 before:w-[6rem] before:h-[6rem] before:bg-[#081730] wrapper bg-[#081730] flex  md:flex-row flex-col-reverse items-center justify-between px-[5rem] rounded-bl-[5rem] w-[100%] h-auto md:h-[35rem] relative z-[3]">
      {/* left side */}
      <div className="headings md:pb-0 pb-[4rem] flex flex-col items-start justify-center md:mt-0 mt-[20rem] h-[100%] md:text-[3rem] text-[1rem]">
        <span>Experience The</span>{" "}
        <span>
          <b>Best Movies App</b>
        </span>
        <span className="md:text-[15px] text-[13px] text-[#525D6E] w-[20rem] md:w-[24rem]">
          Movizz App will give you a chance to enjoy unlimited entertainment
          easier than on any other platform.
          <br />
        </span>
        {/* download ads */}
        <div className="mt-[0.5rem]">
          <span className="text-[13px] mb-[0.5rem]">
            Download now on IOS and Android
          </span>
          <DownloadAds />
        </div>
      </div>
      {/* right side */}
      <div className="images relative md:w-[50%] w-[125%] md:mt-0 mt-[15rem] right-[50%] md:translate-x-0 md:!right-0 sm2:right-[-20%] translate-x-[-50%]">
        <img
          // variants={bg}
          // animate={`${elementIsVisible}`}
          // transition={{ duration: 1, type: "ease-out" }}
          src={
            "https://res.cloudinary.com/dk3vn0s8q/image/upload/v1671334357/backgraphics_olyerx.png"
          }
          alt=""
          ref={WaveAnimRef}
          className={`${
            WaveAnimRef_inport ? "left-[7rem]" : "left-[19rem]"
          } transition-all duration-[1s] absolute top-[-8rem] `}
        />
        <img
          src={
            "https://res.cloudinary.com/dk3vn0s8q/image/upload/v1671355448/Screenshot_2022-12-18_143330_3_1_jsgwnm.png"
          }
          alt=""
          className="absolute top-[-15rem] h-[34rem] left-[17rem]"
        />
        <img
          // variants={musicPlayer}
          // animate={`${elementIsVisible}`}
          // transition={{
          //   duration: 1,
          //   type: "ease-out",
          // }}
          // src={
          //   "https://res.cloudinary.com/dk3vn0s8q/image/upload/v1671334317/p_2_ulvrtr.png"
          // }
          alt=""
          className="transition-all duration-500 absolute left-[235px] top-[94px] w-[175px]"
        />
        <img
          // variants={rect}
          // animate={`${elementIsVisible}`}
          // transition={{
          //   type: "ease-out",
          //   duration: 1,
          // }}
          // src={
          //   "https://res.cloudinary.com/dk3vn0s8q/image/upload/v1671334317/p_3_o3edkl.png"
          // }
          alt=""
          className="transition-all duration-500 absolute w-[5rem] left-[13rem] top-[12rem]"
        />
        <img
          // variants={heart}
          // animate={`${elementIsVisible}`}
          // transition={{
          //   type: "ease-out",
          //   duration: 1,
          // }}
          // src={
          //   "https://res.cloudinary.com/dk3vn0s8q/image/upload/v1671334316/p_4_qqud0i.png"
          // }
          alt=""
          className="transition-all duration-500 absolute w-[5rem] left-[12.5rem] top-[12rem]"
        />
      </div>
    </div>
    // </VisibilitySensor>
  );
}

export default Hero;
