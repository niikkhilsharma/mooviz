import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import PlayerRVideo from "./PlayerRVideo";
import ReactDOM from "react-dom/client";
import { useRouter } from "next/router";
import { allhomemovies } from "../context/allcontexts";
const SupportPlayer = () => {
  var router = useRouter();
  var now = useMemo(() => false);
  var { toploadingbarref } = useContext(allhomemovies);

  useEffect(() => {
    if (!now) {
      const container = document.querySelector("#app");
      if (!container) throw new Error("Failed to find root element.");
      ReactDOM.createRoot(container).render(
        <PlayerRVideo router={router} toploadingbarref={toploadingbarref} />
      );
      now = true;
    }
  }, []);
  return <div id="app"></div>;
};

export default SupportPlayer;
