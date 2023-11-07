import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Row from "../components/Row";
import dynamic from "next/dynamic";
import axios from "axios";
import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { LottiePlayer } from "lottie-web";
import { allhomemovies } from "../context/allcontexts";
import $ from "jquery";
import { useRouter } from "next/router";
import Script from "next/script";

const Home = () => {
	const [adonlyonefordev, setadonlyonefordev] = useState(false);
	useEffect(() => {
		// if (!adonlyonefordev) {
		//   setadonlyonefordev(true);
		//   for (let i = 0; i < 2; i++) {
		//     var scr1 = document.createElement("script");
		//     scr1.innerHTML = `
		//     var scr = document.createElement("script");
		//     var atOptions = {
		//       'key' : 'c92496b479ac9c7faab2bcc81ae8fc45',
		//       'format' : 'iframe',
		//       'height' : 90,
		//       'width' : 728,
		//       'params' : {}
		//     }
		//     scr.src =
		//     "http" +
		//     (location.protocol === "https:" ? "s" : "") +
		//     "://www.profitabledisplayformat.com/c92496b479ac9c7faab2bcc81ae8fc45/invoke.js";
		//   document.querySelector("#__BottomAdsindexjs").appendChild(scr);
		//   `;
		//     document.querySelector("#__BottomAdsindexjs").appendChild(scr1);
		//   }
		//   var scr1 = document.createElement("script");
		//   scr1.src =
		//     "//pl18103833.highperformancecpmgate.com/79/b4/33/79b4338c64f3a3232c121d9cbfc85d4c.js";
		//   document.body.appendChild(scr1);
		// }
		// scr.src =
		//   "http" +
		//   (location.protocol === "https:" ? "s" : "") +
		//   "://www.profitabledisplayformat.com/c92496b479ac9c7faab2bcc81ae8fc45/invoke.js";
		// var atOptions = {
		//   key: "5f1a3f1492cdc432d6834e9849e5ee95",
		//   format: "iframe",
		//   height: 600,
		//   width: 160,
		//   params: {},
		// };
		// var scr = document.createElement("script");
		// scr.innerHTML = `var atOptions = {
		//   key: "5f1a3f1492cdc432d6834e9849e5ee95",
		//   format: "iframe",
		//   height: 600,
		//   width: 160,
		//   params: {},
		//  }
		// scr.src =
		//  "http" +
		//  (location.protocol === "https:" ? "s" : "") +
		//  "://www.profitabledisplayformat.com/5f1a3f1492cdc432d6834e9849e5ee95/invoke.js";
		//  document.querySelector("#_MainOuterIndexJs").appendChild(scr);
		// `;
		// document.querySelector("#_MainOuterIndexJs").appendChild(scr);
		// document.write(
		//   "<scr" +
		//     'ipt type="text/javascript" src="http' +
		//     (location.protocol === "https:" ? "s" : "") +
		//     '://www.profitabledisplayformat.com/5f1a3f1492cdc432d6834e9849e5ee95/invoke.js"></scr' +
		//     "ipt>"
		// );
		// document.write(
		//   "<scr" +
		//     'ipt type="text/javascript" src="http' +
		//     (location.protocol === "https:" ? "s" : "") +
		//     '://www.profitabledisplayformat.com/5f1a3f1492cdc432d6834e9849e5ee95/invoke.js"></scr' +
		//     "ipt>"
		// );
	}, []);

	var router = useRouter();
	var { toploadingbarref, AllHomeMoviesData, setAllHomeMoviesData, topbaractive } = useContext(allhomemovies);

	useEffect(() => {
		$("#navfixed").removeClass("hidden");
		$("#navfixed").removeClass(["bg-[rgb(17,24,39)]", "h-[55px]", "md:h-[65px]"]);
		// $("#navfixed").addClass(["bg-[rgba(0,0,0,0)]"]);
		// $("#navfixed2").removeClass(["bg-[rgb(17,24,39)]", "fixed"]);
		$("#navfixed2").addClass(["absolute", "top-0"]);
		$("#forglassmor").css({
			background: " rgba( 255, 255, 255, 0.15 )",
			"box-shadow": "0 8px 32px 0 rgba( 0,0,0 , 0.37 )",
			"backdrop-filter": " blur( 3.5px )",
			"-webkit-backdrop-filter": "blur( 3.5px )",
			"border-radius": "10px",
			border: "1px solid rgba( 255, 255, 255, 0.18 )",
		});
		// $("#navfixed2").removeClass();
		// $("#navfixed").css("display", "none");

		return () => {
			// $("#navfixed2").removeClass();
			$("#forglassmor").css({
				background: "rgba(0,0,0,0)",
				"box-shadow": "0 0px 0px 0 rgba( 0,0,0 , 0.37 )",
				"backdrop-filter": " blur( 0px )",
				"-webkit-backdrop-filter": "blur( 3.5px )",
				"border-radius": "0px",
				border: "0px solid rgba( 255, 255, 255, 0.18 )",
			});
			$("#navfixed2").removeClass(["bg-[rgba(0,0,0,0)]", "absolute", "top-0"]);
			$("#navfixed2").addClass(["bg-[rgb(17,24,39)]", "fixed"]);
			$("#navfixed").addClass(["bg-[rgb(17,24,39)]", "h-[55px]", "md:h-[65px]"]);
			// $("#navfixed").css("display", "block");
		};
	}, []);

	function getKeyByValue(object, value) {
		return Object.keys(object).find(key => object[key] === value);
	}

	const [datasec, setdatasec] = useState(AllHomeMoviesData || []);
	useEffect(() => {
		if (topbaractive) {
			toploadingbarref?.current?.complete();
		}
	}, [datasec]);
	// const [datasec, setdatasec] = useState({
	//   latestMovies: nowmovcontext.AllHomeMoviesData?.FeaturedBollywood || null,
	//   popularMovies: nowmovcontext.AllHomeMoviesData?.MostViewed || null,
	//   latestSeries: nowmovcontext.AllHomeMoviesData?.Hotstar || null,
	//   popularSeries: nowmovcontext.AllHomeMoviesData?.Zee5 || null,
	//   latestHotstar: nowmovcontext.AllHomeMoviesData?.NetflixIndia || null,
	//   latestNetflix: nowmovcontext.AllHomeMoviesData?.TrendingSeriesIndia || null,
	//   latestPrime: nowmovcontext.AllHomeMoviesData?.KoreanSeries || null,
	//   latestVoot: nowmovcontext.AllHomeMoviesData?.FeaturedHollywood || null,
	//   // NetflixGlobal: nowmovcontext.AllHomeMoviesData?.NetflixGlobal || null,
	//   // AmazonPrimeIndia: nowmovcontext.AllHomeMoviesData?.AmazonPrimeIndia || null,
	//   // AmazonPrimeGlobal:
	//   //   nowmovcontext.AllHomeMoviesData?.AmazonPrimeGlobal || null,
	// });
	// const [datasec, setdatasec] = useState({
	//   FeaturedBollywood:
	//     nowmovcontext.AllHomeMoviesData?.FeaturedBollywood || null,
	//   MostViewed: nowmovcontext.AllHomeMoviesData?.MostViewed || null,
	//   Hotstar: nowmovcontext.AllHomeMoviesData?.Hotstar || null,
	//   Zee5: nowmovcontext.AllHomeMoviesData?.Zee5 || null,
	//   NetflixIndia: nowmovcontext.AllHomeMoviesData?.NetflixIndia || null,
	//   TrendingSeriesIndia:
	//     nowmovcontext.AllHomeMoviesData?.TrendingSeriesIndia || null,
	//   KoreanSeries: nowmovcontext.AllHomeMoviesData?.KoreanSeries || null,
	//   FeaturedHollywood:
	//     nowmovcontext.AllHomeMoviesData?.FeaturedHollywood || null,
	//   NetflixGlobal: nowmovcontext.AllHomeMoviesData?.NetflixGlobal || null,
	//   AmazonPrimeIndia: nowmovcontext.AllHomeMoviesData?.AmazonPrimeIndia || null,
	//   AmazonPrimeGlobal:
	//     nowmovcontext.AllHomeMoviesData?.AmazonPrimeGlobal || null,
	// });
	// useEffect(() => {
	//   (async () => {
	//     if (!datasec?.FeaturedBollywood) {
	//       await axios
	//         .get("/api/v2/getCollection?sort=home&wood=bolly&page=1")
	//         .then((response) => {
	//           setdatasec((dat) => ({ ...dat, FeaturedBollywood: response.data }));
	//           nowmovcontext.setAllHomeMoviesData((dat) => ({
	//             ...dat,
	//             FeaturedBollywood: response.data,
	//           }));
	//         });
	//     }
	//     if (!datasec?.MostViewed) {
	//       await axios
	//         .get(
	//           "/api/v2/getCollection?sort=provider&wood=holly&type=tv&provider=marvel-dc&page=1"
	//         )
	//         .then((response) => {
	//           setdatasec((dat) => ({ ...dat, MostViewed: response.data }));
	//           nowmovcontext.setAllHomeMoviesData((dat) => ({
	//             ...dat,
	//             MostViewed: response.data,
	//           }));
	//         });
	//     }
	//     if (!datasec?.Hotstar) {
	//       await axios
	//         .get(
	//           "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=hotstar"
	//         )
	//         .then((response) => {
	//           setdatasec((dat) => ({ ...dat, Hotstar: response.data }));
	//           nowmovcontext.setAllHomeMoviesData((dat) => ({
	//             ...dat,
	//             Hotstar: response.data,
	//           }));
	//         });
	//     }
	//     if (!datasec?.Zee5) {
	//       await axios
	//         .get(
	//           "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=zee5"
	//         )
	//         .then((response) => {
	//           setdatasec((dat) => ({ ...dat, Zee5: response.data }));
	//           nowmovcontext.setAllHomeMoviesData((dat) => ({
	//             ...dat,
	//             Zee5: response.data,
	//           }));
	//         });
	//     }
	//     if (!datasec?.NetflixIndia) {
	//       await axios
	//         .get(
	//           "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=netflix"
	//         )
	//         .then((response) => {
	//           setdatasec((dat) => ({ ...dat, NetflixIndia: response.data }));
	//           nowmovcontext.setAllHomeMoviesData((dat) => ({
	//             ...dat,
	//             NetflixIndia: response.data,
	//           }));
	//         });
	//     }
	//     if (!datasec?.TrendingSeriesIndia) {
	//       await axios
	//         .get(
	//           "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=all&page=1"
	//         )
	//         .then((response) => {
	//           setdatasec((dat) => ({
	//             ...dat,
	//             TrendingSeriesIndia: response.data,
	//           }));
	//           nowmovcontext.setAllHomeMoviesData((dat) => ({
	//             ...dat,
	//             TrendingSeriesIndia: response.data,
	//           }));
	//         });
	//     }
	//     if (!datasec?.KoreanSeries) {
	//       await axios
	//         .get(
	//           "/api/v2/getCollection?sort=provider&wood=holly&type=tv&provider=korean-web"
	//         )
	//         .then((response) => {
	//           setdatasec((dat) => ({ ...dat, KoreanSeries: response.data }));
	//           nowmovcontext.setAllHomeMoviesData((dat) => ({
	//             ...dat,
	//             KoreanSeries: response.data,
	//           }));
	//         });
	//     }
	//     if (!datasec?.FeaturedHollywood) {
	//       await axios
	//         .get("/api/v2/getCollection?sort=home&wood=holly&page=1")
	//         .then((response) => {
	//           setdatasec((dat) => ({ ...dat, FeaturedHollywood: response.data }));
	//           nowmovcontext.setAllHomeMoviesData((dat) => ({
	//             ...dat,
	//             FeaturedHollywood: response.data,
	//           }));
	//         });
	//     }
	//     if (!datasec?.NetflixGlobal) {
	//       await axios
	//         .get(
	//           "/api/v2/getCollection?sort=provider&wood=holly&type=tv&provider=netflix"
	//         )
	//         .then((response) => {
	//           setdatasec((dat) => ({ ...dat, NetflixGlobal: response.data }));
	//           nowmovcontext.setAllHomeMoviesData((dat) => ({
	//             ...dat,
	//             NetflixGlobal: response.data,
	//           }));
	//         });
	//     }
	//     if (!datasec?.AmazonPrimeIndia) {
	//       await axios
	//         .get(
	//           "/api/v2/getCollection?sort=provider&wood=bolly&type=tv&provider=amazon-prime"
	//         )
	//         .then((response) => {
	//           setdatasec((dat) => ({ ...dat, AmazonPrimeIndia: response.data }));
	//           nowmovcontext.setAllHomeMoviesData((dat) => ({
	//             ...dat,
	//             AmazonPrimeIndia: response.data,
	//           }));
	//         });
	//     }
	//     if (!datasec?.AmazonPrimeGlobal) {
	//       await axios
	//         .get(
	//           "/api/v2/getCollection?sort=provider&wood=holly&type=tv&provider=amazon-prime-video"
	//         )
	//         .then((response) => {
	//           setdatasec((dat) => ({ ...dat, AmazonPrimeGlobal: response.data }));
	//           nowmovcontext.setAllHomeMoviesData((dat) => ({
	//             ...dat,
	//             AmazonPrimeGlobal: response.data,
	//           }));
	//         });
	//     }
	//   })();
	// }, []);

	// useEffect(() => {
	//   (async () => {
	//     // await axios
	//     //   .get("/api/homepage?search=https://185.53.88.204/top-imdb/")
	//     //   .then((axdat) => {
	//     //     setdatasec((dat) => ({ ...dat, netflixOriginals: axdat.data }));
	//     //   });
	//     await axios
	//       .get(
	//         `/api/homepage?search=https://185.53.88.204/category/all-movies-and-tv-shows/`
	//       )
	//       .then((axdat1) => {
	//         setdatasec((dat) => ({ ...dat, trendingNow: axdat1.data }));
	//       });
	//     await axios.get(`/api/homepage`).then((axdat2) => {
	//       setdatasec((dat) => ({ ...dat, topRated: axdat2.data }));
	//     });
	//     await axios
	//       .get(`/api/homepage?search=https://185.53.88.204/category/action/`)
	//       .then((axdat7) => {
	//         setdatasec((dat) => ({ ...dat, actionMovies: axdat7.data }));
	//       });
	//     await axios
	//       .get(`/api/homepage?search=https://185.53.88.204/category/comedy/`)
	//       .then((axdat6) => {
	//         setdatasec((dat) => ({ ...dat, comedyMovies: axdat6.data }));
	//       });
	//     await axios
	//       .get(`/api/homepage?search=https://185.53.88.204/category/horror/`)
	//       .then((axdat4) => {
	//         setdatasec((dat) => ({ ...dat, horrorMovies: axdat4.data }));
	//       });
	//     await axios
	//       .get(`/api/homepage?search=https://185.53.88.204/category/romance/`)
	//       .then((axdat3) => {
	//         setdatasec((dat) => ({ ...dat, romanceMovies: axdat3.data }));
	//       });
	//     await axios
	//       .get(`/api/homepage?search=https://185.53.88.204/category/documentary/`)
	//       .then((axdat5) => {
	//         setdatasec((dat) => ({ ...dat, documentaries: axdat5.data }));
	//       });
	//   })();
	// }, []);

	useEffect(() => {
		(async () => {
			var dat = await axios.get("/api/v3/getHome");
			if (!datasec[0]) {
				if (dat.data.accepted) {
					setAllHomeMoviesData(dat.data.data);
					setdatasec(dat.data.data);
				} else {
					alert(dat.data.msg);
					localStorage.clear("token");
					router.push("/User");
				}
			}
		})();
	}, []);

	return (
		<div
			className={`relative min-h-[100vh] bg-gradient-to-b from-gray-900/10 to-[#000000] lg:h-[100vh] `}
			// className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
			//   showModal && "!h-screen overflow-hidden"
			// }`}
		>
			<Head>
				<title>
					Home - Movizz
					{/* {movie?.title || movie?.original_name || "Home"} - Netflix */}
				</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Banner datalist={AllHomeMoviesData["Trending"]} />
			<main
				id='_MainOuterIndexJs'
				className='relative md:pl-4 pb-[11rem] min-h-[100vh] lg:space-y-24 lg:pl-16 bg-gradient-to-t overflow-hidden  to-[rgb(17,24,39)] from-[rgb(0,0,0)]'>
				{/* <Script type="text/javascript">{`
                    `}</Script> */}
				<section className='flex flex-col md:gap-[0rem] gap-[0.2rem]'>
					{Object.values(datasec).map((el, ind) => {
						if (el && el[0]) {
							// return (
							//   <>
							//     <Row
							//       key={el.title}
							//       title={getKeyByValue(datasec, el)}
							//       movies={el}
							//     />
							//   </>
							// );
							return (
								<div id={ind == 2 ? "__DivForRowsAndAdsNow" : ""} key={el.title + JSON.stringify(Math.random())}>
									{ind != 2 ? (
										<>
											<Row
												// key={el.title}
												title={getKeyByValue(datasec, el)}
												movies={el}
											/>
										</>
									) : (
										<>
											<Row
												// key={el.title}
												title={getKeyByValue(datasec, el)}
												movies={el}
											/>
											<div
												// key={el.title + Math.random()}
												id='container-30f7e650d345d8b815288b697bec1bfa'></div>
											<Script
												// key={el.title + Math.random()}
												id='3eR4gFsG5pH'
												type='text/javascript'>{`
                    //var atOptions = {
                    //  key: "5f1a3f1492cdc432d6834e9849e5ee95",
                    //  format: "iframe",
                    //  height: 600,
                    //  width: 160,
                    //  params: {},
                    //}
                    var scr = document.createElement("script");
                    scr.src =
                    "http" +
                    (location.protocol === "https:" ? "s" : "") +
                    "://pl18099556.highperformancecpmgate.com/30f7e650d345d8b815288b697bec1bfa/invoke.js";
                                 document.querySelector("#${"__DivForRowsAndAdsNow"}").appendChild(scr);
                                  `}</Script>
										</>
									)}
								</div>
							);
						}
					})}
					{!Object.values(datasec)[Object.values(datasec).length - 1] ? (
						<div className='flex items-center justify-center space-x-2 animate-bounce mt-[15rem] h-[100%]'>
							<div className='w-8 h-8 bg-blue-400 rounded-full animate-bounce-slow' />
							<div className='w-8 h-8 bg-green-400 rounded-full animate-bounce' />
							<div className='w-8 h-8 bg-red-400 rounded-full animate-bounce-slow' />
						</div>
					) : (
						""
					)}
				</section>
				<div id='__BottomAdsindexjs' className='flex flex-wrap w-[105vw]'></div>
			</main>
		</div>
	);
};

export default Home;
