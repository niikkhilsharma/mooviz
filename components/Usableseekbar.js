import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";

const Usable_seekbar = (props) => {
  const [totalvalue, settotalvalue] = useState(props.totalvalue);
  const [val, setval] = useState(props.value);

  const seekvideo = useRef(null);
  var { value, setvalue } = props;

  //   useEffect(() => {
  // Duration > 0 ? setseekwidth(seekvideo.current.offsetWidth) : null;
  // setval((seekwidth / fullplayerconfig.duration / 60) * e.playedSeconds);
  //   }, [seekvideo, Duration]);
  useEffect(() => {
    setvalue(val);
  }, [val]);

  useEffect(() => {
    settotalvalue(props.totalvalue);
  }, [props.totalvalue]);
  return (
    <div className="w-[100%] flex justify-center items-center">
      {/* {Duration > 0 ? ( */}
      <input
        className="transition-all duration-100"
        ref={seekvideo}
        style={{
          cursor: "pointer",
          "--head-color": "white",
          "--changeColorPosition": `${(value / totalvalue) * 100 || 0}%`,
          "--background": "gray",
          "--fillThird": "#EE05F8",
          // "--fill": "rgb(59, 130, 246)",
          "--fillSecondry": "#F71124",
          "--fillColor": "#FF895F",
          //   "--width": props.width,
          //   "--headShadowColor": "green",
          //   "--headShadowSize": "2" + "px",
        }}
        type="range"
        name="vol"
        value={value || 0}
        min="0"
        max={totalvalue}
        onChange={(ei) => {
          setval($(ei.currentTarget).val());
        }}
      />
    </div>
  );
};

export default Usable_seekbar;
