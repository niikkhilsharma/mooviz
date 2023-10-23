import React, { useState, useEffect } from "react";
import $ from "jquery";

function LiveCricket() {
  const [Loaded, setLoaded] = useState(false);
  const [Done, setDone] = useState(false);

  useEffect(() => {
    setLoaded(true);
    // injection();
  }, []);
  useEffect(() => {
    $("#navfixed").addClass("hidden");
    return () => {
      $("#navfixed").removeClass("hidden");
    };
  }, [$.ready]);

  function injection() {
    // let d = setInterval(() => {
    let x = Object.keys(window.frames);

    //   console.log(x);
    //   if (x.length > 0) {
    //     x[0].remove();
    //     setDone(true);
    // clearInterval(d);
    //   }
    //   .remove();
    // }, 500);
  }

  return (
    // <div style={{width:""}}>
    Loaded ? (
      <iframe
        // width={window.screen.availWidth - 50}
        // height={window.screen.availHeight - 150}
        style={{ height: "100vh", width: "100vw" }}
        // style={{ flex: 1, flexGrow: 1 }}
        src=" https://criclive.pics/llive1.html"
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    ) : (
      // <iframe
      //   // width={window.screen.availWidth - 50}
      //   // height={window.screen.availHeight - 150}
      //   id="if-pl"
      //   //   style={{ flex: 1, flexGrow: 1 }}
      //   src="https://ww1.live4wap.xyz/page-watch/17/T20-World-Cup-Live-Hindi.html"
      //   frameBorder="0"
      //   allowFullScreen={true}
      // ></iframe>
      <></>
    )
    // </div>
  );
}

export default LiveCricket;
