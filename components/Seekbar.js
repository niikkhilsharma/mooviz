import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";

const Seekbar = (props) => {
  const [Duration, setDuration] = useState(0);
  const [val, setval] = useState(0);

  const seekvideo = useRef(null);
  var { value, setfullplayerconfig, setseekwidth } = props;
  // useEffect(() => {
  // Duration > 0 ? setseekwidth(seekvideo.current.offsetWidth) : null;
  // setval((seekwidth / fullplayerconfig.duration / 60) * e.playedSeconds);
  // }, [seekvideo, Duration]);

  useEffect(() => {
    setDuration(props.duration);
  }, [props.duration]);
  const playergoto = (d) => {
    setfullplayerconfig((dat) => ({
      ...dat,
      seekval: d,
      goto: d,
      // playing: false,
    }));
  };
  return (
    <div className="w-[100%] flex justify-center items-center">
      <input
        className="transition-all duration-100"
        ref={seekvideo}
        style={{
          cursor: "pointer",
          "--head-color": "white",
          "--changeColorPosition": `${(value / Duration) * 100 || 0}%`,
          "--background": "gray",
          "--fillThird": "rgb(59, 130, 246)",
          // "--fill": "rgb(59, 130, 246)",
          "--fillSecondry": "rgb(37, 99, 235)",
          "--fillColor": "rgb(29, 78, 216)",
          // '--width': props.width,
          // "--headShadowColor": "green",
          // "--headShadowSize": "2" + "px",
        }}
        type="range"
        name="vol"
        value={value || 0}
        min="0"
        max={Duration}
        onChange={(ei) => {
          playergoto($(ei.currentTarget).val());
        }}
      />
    </div>
  );
};

export default Seekbar;
