import React, { useEffect, useContext, useState } from "react";
import $ from "jquery";
// import { useNavigate } from "react-router-dom";
import { validateform } from "../jsTools/formvalidate";
import { User } from "../context/allcontexts";
import { checkemail } from "../jsTools/validateEmail";
import { useRouter } from "next/router";
import Head from "next/head";
import toggle from "../styles/toggle.module.css";
import axios from "axios";
import Spinner from "../components/Spinner";
import codes from "country-calling-code";

const GetUser = () => {
  const [CurrentuserState, setCurrentuserState] = useState("Get Back To");
  const [cansignup, setcansignup] = useState(true);
  const [canlogin, setcanlogin] = useState(true);
  const [nowcontact, setnowcontact] = useState("");
  const [alreadygototponsignup, setalreadygototponsignup] = useState(false);
  const [current_user_Country_Code, setcurrent_user_Country_Code] =
    useState("");
  useEffect(() => {
    var getUserCountry = require("js-user-country").default();
    var filter = codes.map((e) => e.country);
    setcurrent_user_Country_Code(
      "+" + codes[filter.indexOf(getUserCountry.name)].countryCodes[0]
    );
  }, [$.ready]);
  const router = useRouter();
  let user = useContext(User);
  // console.log(user.login);

  async function signupsubmitverifyotp(data) {
    try {
      data.OTP = data.contact.replace("+", "").trim();
      data.contact = nowcontact;
      var resultsgetotp = await axios
        .post("/api/userAuth/signup?mode=VerifyOTP", data)
        .then((data) => data.data);
      if (resultsgetotp.accepted) {
        setcansignup(true);
        localStorage.setItem("token", resultsgetotp.msg);
        user.saveuserinfo();
        router.push("/");
      } else {
        setcansignup(true);
        gotogetotpsignup();
        alert("Error Occured");
      }
    } catch (error) {
      setcansignup(true);
      console.log(error);
    }
  }

  function gotogetotpsignup() {
    $(".spannerrsignup").hide();
    $("#signupform").children().last("div").children().first().text("GET OTP");
    setalreadygototponsignup(false);
    $(".contactsignupcl").next("label").text("Contact No.");
  }

  async function signupsubmit(data) {
    data.contact = current_user_Country_Code + data.contact;
    try {
      var resultsgetotp = await axios
        .post("/api/userAuth/signup?mode=GetOTP", data)
        .then((data) => data.data);
      if (resultsgetotp.accepted && resultsgetotp.msg == "SMS_SENT") {
        setnowcontact(current_user_Country_Code + $(".contactsignupcl").val());
        $(".contactsignupcl")
          .parent()
          .children()
          .last("span")
          .children()
          .first("div")
          .children()
          .last("h5")
          .text($(".contactsignupcl").val());
        $(".contactsignupcl").parent().children().last("span").addClass("flex");
        $(".contactsignupcl")
          .parent()
          .children()
          .last("span")
          .removeClass("hidden");
        $(".contactsignupcl")
          .parent()
          .children()
          .last("span")
          .removeAttr("style");
        $(".contactsignupcl").next("label").text("Enter OTP");
        $(".contactsignupcl").val("");
        setcansignup(true);
        setalreadygototponsignup(true);
        $("#signupform")
          .children()
          .last("div")
          .children()
          .first()
          .text("SUBMIT");
        // user.saveuserinfo();
        // navi("/", { replace: true });
        // router.push("/");
      } else {
        setcansignup(true);
        alert(resultsgetotp.msg);
      }
    } catch (error) {
      setcansignup(true);
      console.log(error);
    }
  }
  function verifysubmit(e, callback) {
    let datatosend = {
      name: $(".namesignupcl").val(),
      email: $(".emailsignupcl").val(),
      contact: $(".contactsignupcl").val(),
      password: $(".passwordsignupcl").val(),
    };
    $(".spannerrsignup").hide();

    switch (validateform(datatosend)) {
      case "success":
        callback(datatosend);
        // signupsubmit(datatosend);
        break;
      case "nameerr":
        setcansignup(true);
        $(".spannerrsignup").eq(0).show();
        break;

      case "emailerr":
        setcansignup(true);
        $(".spannerrsignup").eq(1).show();
        break;
      case "emaildoterr":
        setcansignup(true);
        $(".spannerrsignup").eq(1).show();
        break;

      case "contacterr":
        setcansignup(true);
        $(".spannerrsignup").eq(2).show();
        break;
      case "passworderr":
        setcansignup(true);
        $(".spannerrsignup").eq(3).show();
        break;
      default:
        break;
    }
  }
  function loginsubmit(data) {
    axios
      .post("/api/userAuth/login", data)
      .then((responsedata) => {
        if (responsedata.data.accepted) {
          setcanlogin(true);
          localStorage.setItem("token", responsedata.data.msg);
          user.saveuserinfo();
          router.push("/");
        } else {
          setcanlogin(true);
          alert(responsedata.data.msg);
        }
      })
      .catch((err) => {
        alert(err.responseText);
        setcanlogin(true);
      });
  }
  function verifylogin(e, callback) {
    if (/^\d+$/.test($(".emailinplogin").val().replace("+", ""))) {
      // console.log("Number");
      let datatosend = {
        contact: $(".emailinplogin").val(),
        password: $(".passinplogin").val(),
      };
      $(".spannerrlogin").hide();
      if (
        $(".emailinplogin").val().length >= 10 &&
        $(".passinplogin").val().length > 7
      ) {
        callback(datatosend);
        //   loginsubmit(datatosend);
      } else if ($(".emailinplogin").val().length < 10) {
        setcanlogin(true);
        $(".spannerrlogin").eq(0).show();
      } else if ($(".passinplogin").val().length < 8) {
        setcanlogin(true);
        $(".spannerrlogin").eq(1).show();
      } else {
        setcanlogin(true);
      }
    } else {
      let datatosend = {
        email: $(".emailinplogin").val(),
        password: $(".passinplogin").val(),
      };
      $(".spannerrlogin").hide();
      if (
        checkemail($(".emailinplogin").val()) &&
        $(".passinplogin").val().length > 7
      ) {
        callback(datatosend);
        //   loginsubmit(datatosend);
      } else if (!checkemail($(".emailinplogin").val())) {
        setcanlogin(true);
        $(".spannerrlogin").eq(0).show();
      } else if ($(".passinplogin").val().length < 8) {
        setcanlogin(true);
        $(".spannerrlogin").eq(1).show();
      } else {
        setcanlogin(true);
      }
    }
  }
  return current_user_Country_Code ? (
    <div
      style={{
        background: "linear-gradient(#141e30, #243b55)",
        height: "100vh",
        width: "100%",
      }}
    >
      <Head>
        <title>Login </title>
        <meta name="description" content="Created By Aditya" />
      </Head>
      <div className="min-h-[100vh] md:min-h-fit py-[40px]  md:px-[40px] px-[10px] w-[100%] xl:w-[55%] md:h-auto outerall-login_signup">
        <div>
          <h6 className="mb-0 pb-2 text-center flex gap-[2rem] justify-center text-[1.3rem]">
            <span>Log In </span>
            <span>Sign Up</span>
          </h6>
          <input
            className={toggle.checkbox}
            type="checkbox"
            id={"reg-log"}
            name="reg-log"
            onChange={(e) => {
              e.target.disabled = true;
              if (e.currentTarget.checked) {
                setCurrentuserState("Get Into");
                document.title = "Signup ";
                $(".login-box")
                  .eq(0)
                  .slideToggle(() => {
                    $(".login-box")
                      .eq(1)
                      .slideToggle(() => {
                        e.target.disabled = false;
                      });
                  });
              } else {
                setCurrentuserState("Get Back To");
                document.title = "Login ";
                $(".login-box")
                  .eq(1)
                  .slideToggle(() => {
                    $(".login-box")
                      .eq(0)
                      .slideToggle(() => {
                        e.target.disabled = false;
                      });
                  });
              }
            }}
          />
          <label htmlFor={"reg-log"}></label>
        </div>
        <div className=" flex md:flex-row flex-col mt-[2rem]">
          <div className=" mb-[1rem]">
            {/* <div className="img-shadow"> */}
            <div className="relative md:w-[26rem] w-auto h-auto md:h-[28rem] justify-between flex flex-col">
              <div className="hidden md:block pt-[12%]">
                <div className="p-2 border-4  hover:border-green-600 transition-all duration-300 border-white flex flex-center items-center w-fit m-auto rounded-full ">
                  <img
                    className=""
                    style={{
                      height: "8rem",
                      //   width: "80rem",
                      borderTopLeftRadius: "1rem",
                      borderBottomLeftRadius: "1rem",
                    }}
                    src={
                      "https://res.cloudinary.com/dk3vn0s8q/image/upload/v1670283581/Mtransparent_sfuk3e_jczlrs.png"
                    }
                    // src={logo.src}
                    alt=""
                  />
                </div>
                <div className="mt-[13px]">
                  <h3 className="text-[1.8rem] text-center">
                    {`${CurrentuserState} Movizz`}
                  </h3>
                  <h3 className="text-[1rem] text-center">
                    & Access 99M+ Collection
                  </h3>
                </div>
              </div>
              <div className="text-[1.5rem] flex justify-center ">
                <div className=" flex justify-center flex-col items-center gap-4">
                  <h3>Or Access With</h3>
                  <div className="flex gap-4">
                    <div className="w-[4.5rem] cursor-pointer hover:bg-[rgba(51,65,85,0.7)] rounded-lg border-[1px] border-[rgba(255,255,255,0,1)] flex justify-center py-2 px-2">
                      <img
                        width={35}
                        className=""
                        src="https://res.cloudinary.com/dk3vn0s8q/image/upload/v1670285218/google_anekjq.png"
                        alt=""
                      />
                    </div>
                    <div className="w-[4.5rem] cursor-pointer hover:bg-[rgba(51,65,85,0.7)] rounded-lg border-[1px] border-[rgba(255,255,255,0,1)] flex justify-center py-2 px-1">
                      <img
                        width={35}
                        className=""
                        src="https://res.cloudinary.com/dk3vn0s8q/image/upload/v1670286921/facebook_qa0pwq.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <img
                className=""
                style={{
                  height: "28rem",
                  //   width: "80rem",
                  borderTopLeftRadius: "1rem",
                  borderBottomLeftRadius: "1rem",
                }}
                src={
                  "https://res.cloudinary.com/dk3vn0s8q/image/upload/v1670281007/bbf81a94e2c74a2389964d52e0bb0800_ylzowq.png"
                }
                // src={logo.src}
                alt=""
              /> */}
              {/* <div className="absolute top-[35%] left-[54%] w-[80%] translate-x-[-50%]">
                <h3 className="text-[1.8rem] text-center">
                  {`${CurrentuserState} To Movizz For`}
                </h3>
                <h3 className="text-[1.2rem] ml-[4.7rem] w-[20rem]">
                  Access 99M+ Collection
                </h3>
              </div> */}
            </div>
          </div>
          {/*For Login Screen */}
          <div className="w-auto md:w-[50%] login-box">
            <h2>Login</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (canlogin) {
                  setcanlogin(false);
                  verifylogin(e, loginsubmit);
                }
              }}
            >
              <div className="user-box flex">
                <input
                  type="text"
                  name=""
                  required
                  className="emailinplogin"
                  onChange={(e) => {
                    if (
                      e.currentTarget.value.length >= 10 &&
                      /^\d+$/.test(e.currentTarget.value)
                    ) {
                      if (
                        !e.currentTarget.value.includes(
                          current_user_Country_Code
                        )
                      ) {
                        if (
                          e.currentTarget.value.includes(
                            current_user_Country_Code.substring(
                              0,
                              current_user_Country_Code.length - 1
                            )
                          )
                        ) {
                          e.currentTarget.value =
                            e.currentTarget.value +
                            current_user_Country_Code.split("").at(-1)[0];
                        } else {
                          e.currentTarget.value =
                            current_user_Country_Code + e.currentTarget.value;
                        }
                      } else {
                        e.currentTarget.value = e.currentTarget.value;
                      }
                    }
                  }}
                />
                <label>Email/PhoneNo.</label>
                <span className=" text-red-500 absolute mt-11 hidden font-normal spannerrlogin">
                  <h5>Please Enter A valid Email/Phoneno.!</h5>
                </span>
              </div>
              <div className="user-box flex">
                <input
                  type="password"
                  name=""
                  required
                  className="passinplogin"
                />
                <label>Password</label>
                <span className=" text-red-500 absolute mt-11 hidden font-normal spannerrlogin">
                  <h5>Must Be More Than 7 Digits</h5>
                </span>
              </div>
              <div className="flex items-center gap-4 mt-[40px]">
                <button style={{ marginTop: "0px" }}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Submit
                </button>
                {!canlogin ? <Spinner /> : ""}
              </div>
            </form>
          </div>
          {/*For Signup Screen */}
          <div
            className="w-auto md:w-[50%] login-box hidden"
            style={{ padding: "11px 40px" }}
          >
            <h2>Signup</h2>
            <form
              id="signupform"
              onSubmit={(e) => {
                e.preventDefault();
                if (!alreadygototponsignup) {
                  if (cansignup) {
                    setnowcontact("");
                    setcansignup(false);
                    verifysubmit(e, (e) => signupsubmit(e));
                  }
                } else {
                  setcansignup(false);
                  verifysubmit(e, (e) => signupsubmitverifyotp(e));
                }
              }}
            >
              <div className="user-box flex">
                <input type="text" name="" required className="namesignupcl" />
                <label>Name</label>
                <span className=" text-red-500 absolute mt-11 hidden spannerrsignup">
                  <h5>Please Enter A valid Name!</h5>
                </span>
              </div>
              <div className="user-box flex">
                <input type="text" name="" required className="emailsignupcl" />
                <label>Email</label>
                <span className=" text-red-500 absolute mt-11 hidden spannerrsignup">
                  <h5>Please Enter A valid Email!</h5>
                </span>
              </div>
              <div className="user-box flex group">
                {!alreadygototponsignup ? (
                  <div className="w-fit border-b-[1px] border-white justify-end items-center mb-[1.85rem] pr-[0.1rem] hidden">
                    {current_user_Country_Code + " "}
                  </div>
                ) : (
                  ""
                )}
                <input
                  type="number"
                  name=""
                  required
                  className="contactsignupcl"
                  onChange={(e) => {
                    if (e.currentTarget.value.length >= 10) {
                      e.currentTarget.previousElementSibling.classList.remove(
                        "hidden"
                      );
                      e.currentTarget.previousElementSibling.classList.add(
                        "flex"
                      );
                      // e.currentTarget.value =
                      //   current_user_Country_Code.substring(
                      //     1,
                      //     current_user_Country_Code.length
                      //   ) + e.currentTarget.value;
                      // if (!alreadygototponsignup) {
                      //   if (
                      //     !e.currentTarget.value.includes(
                      //       current_user_Country_Code
                      //     )
                      //   ) {
                      //     if (
                      //       e.currentTarget.value.includes(
                      //         current_user_Country_Code.substring(
                      //           0,
                      //           current_user_Country_Code.length - 1
                      //         )
                      //       )
                      //     ) {
                      //       e.currentTarget.value =
                      //         e.currentTarget.value +
                      //         current_user_Country_Code.split("").at(-1)[0];
                      //     } else {
                      //       e.currentTarget.value =
                      // current_user_Country_Code.substring(
                      //   1,
                      //   current_user_Country_Code.length
                      // ) + e.currentTarget.value;
                      //     }
                      //   } else {
                      //     e.currentTarget.value = e.currentTarget.value;
                      //   }
                      // } else {
                      //   e.currentTarget.value = e.currentTarget.value;
                      // }
                    }
                  }}
                />
                <label>Contact No.</label>
                <span className=" text-red-500 absolute mt-11 hidden spannerrsignup">
                  <h5>Please Enter A valid Number!</h5>
                </span>
                <span className=" w-[105%] !text-[13px] gap-[11px] text-red-500 absolute mt-11 hidden spannerrsignup">
                  <div className="flex w-full  text-green-400">
                    <h5 className="w-max mr-[0.3rem]">Otp Sent On </h5>
                    <h5></h5>
                  </div>
                  <h5
                    onClick={gotogetotpsignup}
                    className="cursor-pointer w-full text-blue-600"
                  >
                    {" Change Number"}
                  </h5>
                </span>
              </div>
              <div className="user-box flex">
                <input
                  type="password"
                  name=""
                  required
                  className="passwordsignupcl"
                />
                <label>Password</label>
                <span className=" text-red-500 absolute mt-11 hidden spannerrsignup">
                  <h5>Must Be More Than 7 Digits</h5>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button style={{ marginTop: "0px" }}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Get Otp
                </button>
                {!cansignup ? <Spinner /> : ""}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Fetching Your Country Code!</div>
  );
};

export default GetUser;
