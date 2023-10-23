import React, { useState, useEffect, useMemo, useContext } from "react";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import $, { easing } from "jquery";
import Link from "next/link";
import { User, allhomemovies } from "../context/allcontexts";

const Navbar = () => {
  let user = useContext(User);
  const router = useRouter();
  const [category, setcategory] = useState({});
  const [MainsearchTerm, setMainsearchTerm] = useState("");
  const [MainsearchData, setMainsetsearchData] = useState([]);
  var { toploadingbarref } = useContext(allhomemovies);
  function imgError(image) {
    image.onerror = null;
    setTimeout(function () {
      image.src += "?" + +new Date();
    }, 1000);
  }
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  useEffect(() => {
    if (MainsearchTerm) {
      let timeout;
      let waitfortext = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          (async () => {
            if (MainsearchTerm) {
              if (
                document.querySelector('input[name="MainsearchTerm"]').value ==
                MainsearchTerm
              ) {
                // $("#mainsearchResultsdiv").slideToggle();
                var nowrl = await axios.get(
                  `/api/searchAPI?s=${MainsearchTerm}`
                );
                setMainsetsearchData([]);
                // nowrl.data.d.forEach((element) => {
                //   if (element.id.includes("tt")) {
                setMainsetsearchData(nowrl.data.d);
                //   }
                // });
              }
            }
          })();
        }, 500);
      };
      waitfortext();
    } else {
      // setMainsetsearchData([]);
      // $("#mainsearchResultsdiv").slideUp();
    }
  }, [MainsearchTerm]);
  useEffect(() => {
    $("#mainsearchinputmaindiv").on("focusout", () => {
      $("#mainsearchResultsdiv").slideUp();

      $("input[name='MainsearchTerm']").attr("disabled", true);
      $("input[name='MainsearchTerm']").removeClass("w-[20rem]");
      $("input[name='MainsearchTerm']").addClass("w-[3rem]");
    });
  }, []);

  useEffect(() => {
    $("#mainsearchResultsdiv").slideUp();
  }, []);

  useEffect(() => {
    if (MainsearchData[0]) {
      if (!$("input[name='MainsearchTerm']").attr("disabled")) {
        $("#mainsearchResultsdiv").slideDown();
      }
    } else if (!MainsearchData[0]) {
    }
    if (!MainsearchTerm && MainsearchData[0]) {
      $("#mainsearchResultsdiv").slideUp(500, "", () => {
        setMainsetsearchData([]);
      });
    }
  }, [MainsearchData, MainsearchTerm]);

  const [Query, setQuery] = useState("");
  // useEffect(() => {
  //   try {
  //     (async () => {
  //       var dat = await axios.get(`/api/categories`);
  //       setcategory(dat.data);
  //     })();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // const [mobileShow, setmobileShow] = useState(false)
  // useEffect(() => {
  //   var lastScrollTop = 0;
  //   let timeoutslidedown;
  //   let whenMouseMovesslidedown = () => {
  //     clearTimeout(timeoutslidedown);
  //     timeoutslidedown = setTimeout(() => {
  //       // $("#navfixed").slideDown(200);
  //       // if ($("#navfixed2").queue()[0]) {
  //       //   $("#navfixed2").clearQueue().finish();
  //       //   $("#navfixed2").stop();
  //       //   $("#navfixed2").dequeue();
  //       // }
  //       $("#navfixed2").slideUp(150, "", () => {
  //         $("#navfixed2").clearQueue().finish();
  //         $("#navfixed2").stop();
  //         $("#navfixed2").dequeue();
  //       });
  //     }, 500);
  //   };
  //   let timeoutslideup;
  //   let whenMouseMovesslideup = () => {
  //     clearTimeout(timeoutslideup);
  //     timeoutslideup = setTimeout(() => {
  //       // $("#navfixed").slideUp(200);
  //       // if ($("#navfixed2").queue()[0]) {
  //       //   $("#navfixed2").clearQueue().finish();
  //       //   $("#navfixed2").stop();
  //       //   $("#navfixed2").dequeue();
  //       // }
  //       $("#navfixed2").slideDown(200, "", () => {
  //         $("#navfixed2").clearQueue().finish();
  //         $("#navfixed2").stop();
  //         $("#navfixed2").dequeue();
  //       });
  //     }, 500);
  //   };

  //   // document.body.addEventListener("mousemove", (e) => {
  //   //   if (controlsref?.current?.classList) {
  //   //     controls("on");
  //   //   }
  //   // });
  //   window.addEventListener(
  //     "scroll",
  //     function () {
  //       var st = window.pageYOffset || document.documentElement.scrollTop;
  //       // if (window.pageYOffset > "132.8") {
  //       $("#navfixed2").clearQueue().finish();
  //       $("#navfixed2").stop();
  //       if (st > lastScrollTop) {
  //         whenMouseMovesslidedown();

  //         // console.log(
  //         //   parseInt($("#navfixed").css("height").replace("px", "").trim())
  //         // );

  //         // if (
  //         //   parseInt($("#navfixed").css("height").replace("px", "").trim()) >=
  //         //   132
  //         // ) {
  //         // if (
  //         //   parseInt($("#navfixed").css("height").replace("px", "").trim()) < 50
  //         // ) {
  //         // $("#navfixed").slideDown(200);
  //         // $("#navfixed2").slideDown(200);
  //         // }
  //         //}
  //         //scrollup
  //       } else {
  //         whenMouseMovesslideup();
  //         //scrolldown
  //         // if (
  //         //   parseInt($("#navfixed").css("height").replace("px", "").trim()) >=
  //         //   65
  //         // ) {
  //         // console.log($("#navfixed").css("height") != "132px");
  //         // if ($("#navfixed").css("height") != "132px") {
  //         // $("#navfixed").slideUp(200);
  //         // $("#navfixed2").slideUp(200);
  //         // }
  //         // }
  //       }
  //       lastScrollTop = st <= 0 ? 0 : st;
  //       // }
  //     },
  //     false
  //   );
  // }, []);
  useEffect(() => {
    $("#mainsearchinputmaindiv").on("click", () => {
      if ($("input[name='MainsearchTerm']").hasClass("w-[3rem]")) {
        $("input[name='MainsearchTerm']").attr("disabled", false);
        $("input[name='MainsearchTerm']").removeClass("w-[3rem]");
        $("input[name='MainsearchTerm']").addClass("w-[20rem]");
        document.querySelector("input[name='MainsearchTerm']").focus();
        document
          .querySelector("input[name='MainsearchTerm']")
          .setSelectionRange(
            document.querySelector("input[name='MainsearchTerm']").value.length,
            document.querySelector("input[name='MainsearchTerm']").value.length
          );
        if (MainsearchData[0]) {
          $("#mainsearchResultsdiv").slideDown();
        }
      } else {
        // $("#mainsearchResultsdiv").slideUp();
        // console.log("slide Up trigger On Click");
        // $("input[name='MainsearchTerm']").attr(
        //   "disabled",
        //   true
        // );
        // $("input[name='MainsearchTerm']").removeClass(
        //   "w-[20rem]"
        // );
        // $("input[name='MainsearchTerm']").addClass(
        //   "w-[4rem]"
        // );
      }
      // $("input[name='MainsearchTerm']").();
      if (MainsearchData) {
        // $("#mainsearchResultsdiv").slideToggle();
      }
    });
  }, []);

  return (
    <>
      <meta name="robots" content="noindex" />
      {/* <meta name="referrer" content="no-referrer" /> */}
      <meta name="origin" content="no-cors" />
      <meta name="sec-fetch-mode" content="no-cors" />
      <div id="navfixed" className="1relative h-[5rem] md:h-[5rem] ">
        <nav
          id="navfixed2"
          className=" px-2 1bg-white 1border-gray-200 bg-[rgb(17,24,39)] 1dark:bg-gray-900 1dark:border-gray-700 fixed z-[10] w-[100%] 1h-[55px] h-[5rem] md:h-[5rem] 2md:h-[65px]"
        >
          <div className="flex justify-between gap-[0.25rem]">
            <div className="p-[5px] 1md:ml-[4rem] 1ml-[2rem]  flex flex-wrap justify-between items-center 1mx-auto">
              <Link href="/">
                <a className="flex items-center">
                  <img
                    src="/logo.png"
                    className="mr-3 w-[7rem] sm:h-9"
                    alt="Moviiz"
                    // style={{ height: 140 }}
                  />
                  {/* <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  Moviiz
                </span> */}
                </a>
              </Link>
            </div>
            <div className="p-[0.4rem] relative pl-[2rem] pr-[2.3rem] 1w-[95%]  flex  justify-between items-center 1mx-auto 1bg-slate-800 rounded-2xl  ">
              <button
                data-collapse-toggle="mobile-menu"
                type="button"
                className="inline-flex justify-center items-center  ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
                onClick={(e) => {
                  if (
                    e.currentTarget.nextElementSibling.classList.contains(
                      "hidden"
                    )
                  ) {
                    e.currentTarget.nextElementSibling.classList.add("block");
                    e.currentTarget.nextElementSibling.classList.remove(
                      "hidden"
                    );
                  } else if (
                    e.currentTarget.nextElementSibling.classList.contains(
                      "block"
                    )
                  ) {
                    e.currentTarget.nextElementSibling.classList.add("hidden");
                    e.currentTarget.nextElementSibling.classList.remove(
                      "block"
                    );
                  }
                }}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  // aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                className="hidden 1w-full  md:w-auto md:block md:static absolute top-[4rem] w-[15rem] right-[-75%]"
                id="mobile-menu"
              >
                <ul
                  id="forglassmor"
                  className="flex md:bg-[rgba(0,0,0,0)] bg-[rgba(255,255,255,0.3)] text-black flex-col p-4 mt-4 1bg-gray-50 rounded-lg border 1border-gray-100 md:flex-row gap-1 md:mt-0 md:text-sm md:font-medium md:border-0 1md:bg-white 1dark:bg-gray-800 1md:dark:bg-gray-900 1dark:border-gray-700"
                >
                  <Link href="/">
                    <li className="hover:bg-black md:bg-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0.4)] group py-[0.5rem] px-[1rem] rounded-lg cursor-pointer">
                      <a className="block  py-2 pr-4 pl-3 text-white md:md:p-0 rounded group-hover:text-white  bg-blue-700  md:bg-transparent md:text-blue-700  md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent">
                        Home
                      </a>
                    </li>
                  </Link>
                  <Link href="/TvChannels">
                    <li className="hover:bg-black md:bg-[rgba(0,0,0,0)] group bg-[rgba(0,0,0,0.4)] py-[0.5rem] px-[1rem] rounded-lg cursor-pointer">
                      <a className="block py-2 pr-4 pl-3 text-white md:text-gray-700 group-hover:text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 1dark:hover:text-white dark:md:hover:bg-transparent">
                        Tv Channels
                      </a>
                      {/* <Menu>
                    <Menu.Button className="flex flex-row items-center justify-center py-2 w-[100%] pr-4 pl-3 text-[rgb(156,163,175)] hover:text-white bg-blue-700 rounded md:bg-transparent md:p-0   md:dark:bg-transparent">
                    <h2>More</h2>
                    <svg
                    className="ml-1 w-5 h-5"
                    // aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    ></path>
                    </svg>
                    </Menu.Button>
                    <Menu.Items className="grid text-xs md:text-base gap-2 grid-cols-3 absolute border-2 p-3 z-[25] rounded mt-[1.1rem] bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                    
                    </Menu.Items>
                  </Menu> */}
                    </li>
                  </Link>
                  <li className="hover:bg-black md:bg-[rgba(0,0,0,0)] group bg-[rgba(0,0,0,0.4)] py-[0.5rem] px-[1rem] rounded-lg cursor-pointer">
                    <a
                      href="#"
                      className="block py-2 pr-4 pl-3 text-white md:text-gray-700 group-hover:text-white rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 1dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Services
                    </a>
                  </li>
                  <li className="hover:bg-black md:bg-[rgba(0,0,0,0)] group bg-[rgba(0,0,0,0.4)] py-[0.5rem] px-[1rem] rounded-lg cursor-pointer">
                    <a
                      href="#"
                      className="block py-2 pr-4 pl-3 text-white md:text-gray-700 group-hover:text-white rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 1dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Pricing
                    </a>
                  </li>
                  <li className="hover:bg-black md:bg-[rgba(0,0,0,0)] group bg-[rgba(0,0,0,0.4)] py-[0.5rem] px-[1rem] rounded-lg cursor-pointer">
                    <a
                      href="#"
                      className="block py-2 pr-4 pl-3 text-white md:text-gray-700 group-hover:text-white rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 1dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-center gap-[1rem]">
              <div
                // id="mainsearchinputmaindiv"
                className=""
                // onClick={() => {
                //   if ($("input[name='MainsearchTerm']").hasClass("w-[4rem]")) {
                //     $("input[name='MainsearchTerm']").attr("disabled", false);
                //     $("input[name='MainsearchTerm']").removeClass("w-[4rem]");
                //     $("input[name='MainsearchTerm']").addClass("w-[20rem]");
                //     document
                //       .querySelector("input[name='MainsearchTerm']")
                //       .focus();
                //     document
                //       .querySelector("input[name='MainsearchTerm']")
                //       .setSelectionRange(
                //         document.querySelector("input[name='MainsearchTerm']")
                //           .value.length,
                //         document.querySelector("input[name='MainsearchTerm']")
                //           .value.length
                //       );
                //     if (MainsearchData[0]) {
                //       $("#mainsearchResultsdiv").slideDown();
                //     }
                //   } else {
                //     // $("#mainsearchResultsdiv").slideUp();
                //     // console.log("slide Up trigger On Click");
                //     // $("input[name='MainsearchTerm']").attr(
                //     //   "disabled",
                //     //   true
                //     // );
                //     // $("input[name='MainsearchTerm']").removeClass(
                //     //   "w-[20rem]"
                //     // );
                //     // $("input[name='MainsearchTerm']").addClass(
                //     //   "w-[4rem]"
                //     // );
                //   }
                //   // $("input[name='MainsearchTerm']").();
                //   if (MainsearchData) {
                //     // $("#mainsearchResultsdiv").slideToggle();
                //   }
                // }}
              >
                <div
                  className=" cursor-pointer"
                  // onSubmit={(e) => e.preventDefault()}
                >
                  <label
                    // for="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300 my-2"
                  >
                    Search
                  </label>
                  <div
                    id="mainsearchinputmaindiv"
                    className="relative cursor-pointer "
                  >
                    <div className="flex  absolute inset-y-0 left-0 items-center pl-3 ">
                      <svg
                        // aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <input
                              className="1w-[20rem] transition-all duration-500 pt-[0.5rem] pb-[0.5rem] rounded-md pl-[2.5rem] w-[3rem]"
                              type="text"
                              disabled
                              autoComplete="off"
                              name="MainsearchTerm"
                              value={MainsearchTerm}
                              onChange={(e) =>
                                setMainsearchTerm(e.currentTarget.value)
                              }
                              id="MainsearchTerm"
                            />
                          </div>
                          <div className="absolute ">
                            <div
                              id="mainsearchResultsdiv"
                              className="w-[20rem]  overflow-scroll  max-h-[90vh] pb-[1rem] scrollbar-thin flex flex-col gap-1 bg-black  rounded-md  "
                            >
                              {MainsearchData.map((el) => {
                                if (el?.qid)
                                  return (
                                    <div
                                      className=" w-full"
                                      onClick={() => {
                                        if (
                                          getParameterByName("imdbID") != el.id
                                        ) {
                                          $("#mainsearchResultsdiv").slideUp();
                                          toploadingbarref.current.continuousStart();
                                          router.push({
                                            pathname: "MovieDetails",
                                            query: {
                                              imdbID: el.id,
                                            },
                                          });
                                        }
                                      }}
                                    >
                                      <div className="relative flex flex-row  gap-3 rounded-lg  w-full ">
                                        <button
                                          style={{
                                            display: "flex",
                                            border: 0,
                                          }}
                                          className="!absolute h-[9rem] !z-1 flex flex-row text-start  justify-start items-start gap-3 rounded-lg  w-full btn-0 before:transition-all before:duration-500 p-4 font-semibold  elevation-24 bg-[rgba(31,41,55,0.2)]"
                                        ></button>
                                        <div className="z-[2] flex pointer-events-none p-3 gap-3 h-[9rem]">
                                          <div className=" left-0">
                                            <img
                                              className="w-full min-w-[5rem] h-full rounded-md max-w-[6rem]"
                                              src={el.i?.imageUrl}
                                              alt=""
                                              // onError={imgError}
                                            />
                                          </div>
                                          <div className="flex flex-col gap-2">
                                            <div className="text-sm">
                                              {el.l}
                                            </div>
                                            <div className="flex gap-1 text-sm">
                                              <div className="text-blue-300">
                                                🌍 Rank:
                                              </div>
                                              <div> {el.rank}</div>
                                            </div>
                                            <div className="flex gap-1 text-sm">
                                              <div className="text-red-300">
                                                Released:
                                              </div>
                                              <div> {el.yr || el.y}</div>
                                            </div>
                                            <div className="flex gap-1 text-sm">
                                              <div className="text-yellow-300">
                                                Itz a
                                              </div>
                                              <div>
                                                {el.qid.includes("movie")
                                                  ? "Movie"
                                                  : "TV Series"}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* <div className="block bg-slate-500 h-[1px] w-full mt-3"></div> */}
                                      {/* <hr className="mt-3 rounded-2xl bg-red-700 text-red-900" /> */}
                                    </div>
                                  );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="1px-[0.8rem] h-[3rem] w-[4.2rem] flex justify-center py-[1.5rem] 1mr-[4rem] my-[1rem] 1md:mr-[8rem] relative cursor-pointer bg-slate-800 items-center text-center rounded-lg">
                {user.login ? (
                  <div className="flex items-center flex-col  md:order-2">
                    <button
                      type="button"
                      className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      id="user-menu-button"
                      aria-expanded="false"
                      onClick={(e) => {
                        e.currentTarget.nextElementSibling.classList.toggle(
                          "hidden"
                        );
                        e.currentTarget.nextElementSibling.classList.toggle(
                          "block"
                        );
                      }}
                      data-dropdown-toggle="user-dropdown"
                      data-dropdown-placement="bottom"
                    >
                      <img
                        className="w-8 h-8 bg-cover rounded-full"
                        src="/user_image.png"
                        alt="user photo"
                      />
                    </button>
                    <div
                      className="z-50 hidden my-4 top-[2.5rem] right-0 absolute text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                      id="user-dropdown"
                    >
                      <div className="absolute top-[-9.5px] rotate-[45deg] w-[18px] h-[18px] md:right-[1.9rem] right-[2.53rem] bg-slate-700 "></div>
                      <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">
                          {user?.userdata?.msg?.name}
                        </span>
                        <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                          {user?.userdata?.msg?.emailOrignal}
                        </span>
                      </div>
                      <ul className="py-1" aria-labelledby="user-menu-button">
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Settings
                          </a>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              localStorage.removeItem("token");
                              router.push("/User");
                            }}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Sign out
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  "Loading Your Account..."
                )}
              </div>
            </div>
          </div>
          {/* </div> */}
        </nav>
      </div>
      {/* <div className="h-[90px]"></div> */}
    </>
  );
};

export default Navbar;
