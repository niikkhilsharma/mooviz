import React from "react";
import CenterMenu from "./CenterMenu";
import { Facebook, Twitter, YouTube, LinkedIn } from "@material-ui/icons";

function Footer() {
  const SocialStyle = "rounded-full border-2 border-whit p-2 1mr-[5rem]";
  return (
    <div className=" footer flex flex-col items-center justify-start 1px-[5rem] 1bg-[#081730] bg-[#020917] h-[45rem] pt-[18rem] mt-[-10rem] relative z-[-1]">
      <CenterMenu />
      {/* Social icons */}
      <div className="flex w-[100%] md:justify-center gap-[2rem] justify-around items-center mt-14">
        <div className={SocialStyle}>
          <Facebook />
        </div>{" "}
        <div className={SocialStyle}>
          <Twitter />
        </div>{" "}
        <div className={SocialStyle}>
          <YouTube />
        </div>{" "}
        <div className={SocialStyle}>
          <LinkedIn />
        </div>
      </div>
      {/* detail */}
      <span className="text-[1rem] text-gray-400 px-[1rem] 1px-[15rem] text-center mt-[4rem]">
        Movizz App will give you a chance to enjoy unlimited entertainment
        easier than on any other platform.
      </span>
    </div>
  );
}

export default Footer;
