import { allhomemovies } from "./allcontexts";
import LoadingBar from "react-top-loading-bar";

import React, { useEffect, useState, useRef } from "react";

const AllContextProv = (props) => {
  const [AllHomeMoviesData, setAllHomeMoviesData] = useState([]);
  const [AllChanneldata, setAllChanneldata] = useState({});
  const [topbaractive, settopbaractive] = useState(false);
  const toploadingbarreff = useRef(null);
  var toploadingbarref = {
    current: {
      continuousStart: () => {
        settopbaractive(true);
        toploadingbarreff?.current?.continuousStart();
      },
      complete: () => {
        settopbaractive(false);
        toploadingbarreff?.current?.complete();
      },
    },
  };
  return (
    <>
      <LoadingBar color="#f11946" ref={toploadingbarreff} />
      <allhomemovies.Provider
        value={{
          AllHomeMoviesData,
          setAllHomeMoviesData,
          toploadingbarref,
          topbaractive,
          AllChanneldata,
          setAllChanneldata,
        }}
      >
        {props.children}
      </allhomemovies.Provider>
    </>
  );
};

export default AllContextProv;
