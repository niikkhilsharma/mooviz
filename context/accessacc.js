import { User } from "./allcontexts";
import React, { useState, useEffect } from "react";
import $ from "jquery";
import { useRouter } from "next/router";

const Userdatafunc = (props) => {
  var router = useRouter();
  const [userdata, setuserdata] = useState("");
  const [GoAfterRequiedRequests, setGoAfterRequiedRequests] = useState("");
  // const [searchData, setsearchData] = useState("");
  // const [canGoBack, setcanGoBack] = useState(false);
  const [login, setlogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      $.ajax({
        type: "get",
        url: "/api/userAuth/getuserinfo",
        headers: { auth_token: localStorage.getItem("token") },
        success: (data) => {
          if (data.accepted) {
            setGoAfterRequiedRequests(props.children);
            setuserdata(data);
            setlogin(true);
          } else {
            alert("Session Expired!");
            localStorage.clear("token");
            router.push("/User");
          }
        },
        error: (err) => {
          alert(JSON.stringify(err));
        },
      });
    }
  }, []);
  const saveuserinfo = () => {
    if (localStorage.getItem("token") !== null) {
      $.ajax({
        type: "get",
        url: "/api/userAuth/getuserinfo",
        headers: { auth_token: localStorage.getItem("token") },
        success: (data) => {
          setuserdata(data);
          setlogin(true);
        },
        error: (err) => {
          alert(JSON.stringify(err));
        },
      });
    }
  };
  return (
    <User.Provider
      value={{
        userdata,
        saveuserinfo,
        login,
        // canGoBack,
        // setcanGoBack,
        // searchData,
        // setsearchData,
      }}
    >
      {props.children}
    </User.Provider>
  );
};
export default Userdatafunc;
