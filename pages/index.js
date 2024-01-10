import Head from 'next/head'
import Banner from '../components/Banner'
import Row from '../components/Row'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { allhomemovies } from '../context/allcontexts'
import $ from 'jquery'
import { useRouter } from 'next/router'
import Script from 'next/script'

const Home = () => {
	const [adonlyonefordev, setadonlyonefordev] = useState(false)
	useEffect(() => {}, [])

	var router = useRouter()
	var { toploadingbarref, AllHomeMoviesData, setAllHomeMoviesData, topbaractive } =
		useContext(allhomemovies)

	useEffect(() => {
		$('#navfixed').removeClass('hidden')
		$('#navfixed').removeClass(['bg-[rgb(17,24,39)]', 'h-[55px]', 'md:h-[65px]'])
		// $("#navfixed").addClass(["bg-[rgba(0,0,0,0)]"]);
		// $("#navfixed2").removeClass(["bg-[rgb(17,24,39)]", "fixed"]);
		$('#navfixed2').addClass(['absolute', 'top-0'])
		$('#forglassmor').css({
			background: ' rgba( 255, 255, 255, 0.15 )',
			'box-shadow': '0 8px 32px 0 rgba( 0,0,0 , 0.37 )',
			'backdrop-filter': ' blur( 3.5px )',
			'-webkit-backdrop-filter': 'blur( 3.5px )',
			'border-radius': '10px',
			border: '1px solid rgba( 255, 255, 255, 0.18 )',
		})

		return () => {
			// $("#navfixed2").removeClass();
			$('#forglassmor').css({
				background: 'rgba(0,0,0,0)',
				'box-shadow': '0 0px 0px 0 rgba( 0,0,0 , 0.37 )',
				'backdrop-filter': ' blur( 0px )',
				'-webkit-backdrop-filter': 'blur( 3.5px )',
				'border-radius': '0px',
				border: '0px solid rgba( 255, 255, 255, 0.18 )',
			})
			$('#navfixed2').removeClass(['bg-[rgba(0,0,0,0)]', 'absolute', 'top-0'])
			$('#navfixed2').addClass(['bg-[rgb(17,24,39)]', 'fixed'])
			$('#navfixed').addClass(['bg-[rgb(17,24,39)]', 'h-[55px]', 'md:h-[65px]'])
		}
	}, [])

	function getKeyByValue(object, value) {
		return Object.keys(object).find(key => object[key] === value)
	}

	const [datasec, setdatasec] = useState(AllHomeMoviesData || [])
	useEffect(() => {
		if (topbaractive) {
			toploadingbarref?.current?.complete()
		}
	}, [datasec])

	// useEffect(() => {
	// 	;(async () => {
	// 		var dat = await axios.get('/api/v3/getHome')
	// 		if (!datasec[0]) {
	// 			if (dat.data.accepted) {
	// 				setAllHomeMoviesData(dat.data.data)
	// 				setdatasec(dat.data.data)
	// 			} else {
	// 				alert(dat.data.msg)
	// 				localStorage.clear('token')
	// 				router.push('/User')
	// 			}
	// 		}
	// 	})()
	// }, [])

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
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Banner datalist={AllHomeMoviesData['Trending']} />
			<main
				id="_MainOuterIndexJs"
				className="relative md:pl-4 pb-[11rem] min-h-[100vh] lg:space-y-24 lg:pl-16 bg-gradient-to-t overflow-hidden  to-[rgb(17,24,39)] from-[rgb(0,0,0)]"
			>
				{/* <Script type="text/javascript">{`
                    `}</Script> */}
				<section className="flex flex-col md:gap-[0rem] gap-[0.2rem]">
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
								<div
									id={ind == 2 ? '__DivForRowsAndAdsNow' : ''}
									key={el.title + JSON.stringify(Math.random())}
								>
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
												id="container-30f7e650d345d8b815288b697bec1bfa"
											></div>
											<Script
												// key={el.title + Math.random()}
												id="3eR4gFsG5pH"
												type="text/javascript"
											>{`
                    //var atOptions = {
                    //  key: "5f1a3f1492cdc432d6834e9849e5ee95",
                    //  format: "iframe",
                    //  height: 600,
                    //  width: 160,
                    //  params: {},
                    //}
                    // var scr = document.createElement("script");
                    scr.src =
                    "http" +
                    (location.protocol === "https:" ? "s" : "") +
                    "://pl18099556.highperformancecpmgate.com/30f7e650d345d8b815288b697bec1bfa/invoke.js";
                                 document.querySelector("#${'__DivForRowsAndAdsNow'}").appendChild(scr);
                                  `}</Script>
										</>
									)}
								</div>
							)
						}
					})}
					{!Object.values(datasec)[Object.values(datasec).length - 1] ? (
						<div className="flex items-center justify-center space-x-2 animate-bounce mt-[15rem] h-[100%]">
							<div className="w-8 h-8 bg-blue-400 rounded-full animate-bounce-slow" />
							<div className="w-8 h-8 bg-green-400 rounded-full animate-bounce" />
							<div className="w-8 h-8 bg-red-400 rounded-full animate-bounce-slow" />
						</div>
					) : (
						''
					)}
				</section>
				<div id="__BottomAdsindexjs" className="flex flex-wrap w-[105vw]"></div>
			</main>
		</div>
	)
}

export default Home
