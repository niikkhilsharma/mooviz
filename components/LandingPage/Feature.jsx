import { React, useState, useRef } from "react";
import { useInViewport } from "react-in-viewport";
// import { motion } from "framer-motion";
// import VisibilitySensor from "react-visibility-sensor";

function Feature({ icon, title, desc, img }) {
  const ScaleAnimExpeRef = useRef(null);
  const { inViewport: ScaleAnimExpeRef_inport } = useInViewport(
    ScaleAnimExpeRef,
    {},
    { disconnectOnLeave: false },
    {}
  );
  const variant = {
    true: {
      transform: "scale(1)",
    },
    false: {
      transform: "scale(0.5)",
    },
  };
  const [elementIsVisible, setElementIsVisible] = useState(false);

  return (
    // <VisibilitySensor
    //   onChange={(isVisible) => setElementIsVisible(isVisible)}
    //   // minTopValue={100}
    // >
    <div className="feature flex items-center justify-center flex-col relative text-center mx-[0.5rem] md:mx-12 w-[10rem]  md:w-[14rem] text-[.8rem]  md:text-[1rem]">
      {/* icon */}
      <div
        // variants={variant}
        // transition={{
        //   duration: 1,
        //   type: "ease-out",
        // }}
        ref={ScaleAnimExpeRef}
        // animate={`${elementIsVisible}`}
        className={`transition-all duration-[1s] ${
          ScaleAnimExpeRef_inport ? "scale-1" : "scale-[0.5]"
        } icon bg-[#081730] rounded-2xl p-4 w-[6rem] flex justify-center`}
      >
        <img src={img ? `/svg/${img}` : icon} alt="" className="w-[3rem]" />
      </div>

      <span className="mt-[0.5rem]">{title}</span>

      <span className="text-[#707070] mt-[0.5rem]">{desc}</span>

      <span className="text-[#E600FF] underline mt-[1rem] hover:cursor-pointer">
        Learn more
      </span>
    </div>
    // </VisibilitySensor>
  );
}

export default Feature;
