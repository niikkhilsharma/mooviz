import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import $ from "jquery";
import useDynamicRefs from "use-dynamic-refs";

const Playerfloatsettings = props => {
	var {
		server4_5,
		servermovieland,
		getserver2,
		server1aws,
		getParameterByName,
		getserver5servers,
		floatviewtoggle,
		router,
		getserver4EmbedVegaMovservers,
	} = props;
	const [allserverofaml, setallserverofaml] = useState([]);
	const [serveramlspinner, setserveramlspinner] = useState(false);
	const seasonref = useRef(null);
	const mainfloatview = useRef(null);

	const [mediadata, setmediadata] = useState([]);

	const [currentselectedseason, setcurrentselectedseason] = useState(
		getParameterByName("s", document.location.href) || 1
	);
	const [currentselectedepisode, setcurrentselectedepisode] = useState(
		getParameterByName("e", document.location.href) || 1
	);

	const [getRef, setRef] = useDynamicRefs();
	const [mainfloatviewhovered, setmainfloatviewhovered] = useState(false);
	const [mainfloatviewwidth, setmainfloatviewwidth] = useState(0);

	var getservermovielandservers = async () => {
		servermovieland();
		// if (getParameterByName("ty") == "movie") {
		//   setserveramlspinner(true);
		//   var d = await axios.get(
		//     `/api/server9/search?q=${getParameterByName(
		//       "t"
		//     )}&type=movie&range_to=${getParameterByName(
		//       "release"
		//     )}&range_from=${getParameterByName("release")}`
		//   );
		//   if (
		//     d.data.streamable &&
		//     d.data.data.status !== "error" &&
		//     d.data.data.movie.length !== 0
		//   ) {
		//     axios
		//       .get(
		//         `/api/server9/singleDetails?type=movie&id=${d.data.data.movie[0].videos_id}`
		//       )
		//       .then((d) => {
		//         setallserverofaml(d.data.data.videos);
		//         setserveramlspinner(false);
		//       });
		//   } else {
		//     return 0;
		//   }
		// }
	};
	// useEffect(() => {
	//   seasonref.current.
	// }, [seasonref])
	useEffect(
		() => {
			getRef(`season-${currentselectedseason}`)?.current?.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
			// console.log($("#mainfloatsettingsview").css("width"));
		},
		[getRef(`season-${currentselectedseason}`)?.current],
		$("#mainfloatsettingsview").css("width")
	);

	var addspinner = () => {
		return $.ready ? (
			<div role='status'>
				<svg
					aria-hidden='true'
					className='mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
					viewBox='0 0 100 101'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
						// fill="currentColor"
						className='lvu76yjkb'
					/>
					<path
						d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
						// fill="currentFill"
						className='uigh678giu'
					/>
				</svg>
				{/* <span className="sr-only">Loading...</span> */}
			</div>
		) : (
			<></>
		);
	};
	useEffect(() => {
		if (getParameterByName("ty", document.location.href) == "tv") {
			(async () => {
				var { data } = await axios.get(
					`/api/getEpisodes?imdb=${getParameterByName("d", document.location.href)}&tmdb=${getParameterByName("tmdb")}&s=all`
				);
				console.log(data);
				setmediadata(data);
			})();
		}
	}, []);
	useEffect(() => {
		$("#mainfloatsettingsview").on("focusin", () => {
			console.log("focus");
		});
		$("#mainfloatsettingsview").on("focus", () => {
			console.log("focusout");
		});
		$("#mainfloatsettingsview").resize(() => {
			console.log("focusout");
		});
		mainfloatview?.current.addEventListener("focusin", () => {
			console.log("focus");
			mainfloatviewhovered(true);
		});
		mainfloatview?.current.addEventListener("focusout", () => {
			console.log("focusout");
			mainfloatviewhovered(false);
		});
	}, [mainfloatview?.current, $.ready]);

	return (
		<div className=''>
			<div
				ref={mainfloatview}
				id={"mainfloatsettingsview"}
				onFocus={() => {
					// document
					//   .getElementById(`seasonitem-${currentselectedseason}`)
					//   .scrollIntoView({
					//     behavior: "smooth",
					//     block: "start",
					//     inline: "nearest",
					//   });
				}}
				className={`hover:h-[95vh] /hover:h-fit overflow-x-hidden overflow-y-scroll group absolute right-[1rem] top-[1rem]  /bg-gradient-to-t /from-cyan-400 /via-blue-300 /to-blue-500  /bg-blue-500 /hover:bg-blue-500 bg-slate-800  shadow-inner shadow-black /drop-shadow-md rounded-md /hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-20 /border border-gray-400  /*/*/   w-[4rem] h-[3.5rem] /rounded-bl-[100%] hover:rounded-lg z-10   hover:translate-x-0 hover:translate-y-0 transition-all duration-500 hover:w-[70%] md:hover:w-[30%] ${
					floatviewtoggle ? "hidden" : "flex"
				}`}>
				<div className='group-hover:hidden pt-[0.65rem] pl-[0.9rem]'>
					<i className='fi fi-rr-high-definition flex items-center text-[2rem]'></i>
				</div>
				<div
					className='w-full group-hover:block transition-all duration-100 opacity-0 group-hover:opacity-100 hidden'
					style={{ fontFamily: "Rubik" }}>
					<div className='mt-[3rem] mb-[1rem] text-white font-semibold text-[1.2rem] ml-[2.2rem]'>
						Our Best Dedicated Servers
					</div>
					<div className='flex flex-wrap items-center justify-evenly gap-2 mx-2'>
						<div
							onClick={server1aws}
							className='p-4 text-[12px] gap-2 flex-col md:text-[13px] cursor-pointer rounded-2xl items-center justify-center flex min-h-[6.5rem] md:min-h-[6.8rem] w-[11rem] md:w-[12rem] bg-[rgba(107,114,128,0.4)] border-2 border-[rgba(0,0,0,0.20)] hover:bg-[rgba(156,163,175,0.5)] transition-all duration-300'>
							<div className='flex flex-row'>
								<img src='/svg/gold-vip.png' alt='' />
								<h3 className='text-[2rem]'>#1</h3>
							</div>
							<h3>Vip Aws Cloud</h3>
						</div>
						<div
							onClick={getserver2}
							className='p-4 text-[12px] gap-2 flex-col md:text-[13px] cursor-pointer rounded-2xl items-center justify-center flex min-h-[6.5rem] md:min-h-[6.8rem] w-[11rem] md:w-[12rem] bg-[rgba(107,114,128,0.4)] border-2 border-[rgba(0,0,0,0.20)] hover:bg-[rgba(156,163,175,0.5)] transition-all duration-300'>
							<div className='flex flex-row'>
								<img src='/svg/lightbluestrip-vip.png' alt='' />
								<h3 className='text-[2rem]'>#2</h3>
							</div>
							<h3>Vip Serverless Systems</h3>
						</div>
						<div
							className='p-4 text-[12px] gap-2 flex-col md:text-[13px] cursor-pointer rounded-2xl items-center justify-center flex min-h-[6.5rem] md:min-h-[6.8rem] w-[11rem] md:w-[12rem] bg-[rgba(107,114,128,0.4)] border-2 border-[rgba(0,0,0,0.20)] hover:bg-[rgba(156,163,175,0.5)] transition-all duration-300 my-3'
							onClick={server4_5}>
							<div className='flex flex-row'>
								<img src='/svg/gradient-vip.png' alt='' />
								<h3 className='text-[2rem]'>#3</h3>
							</div>
							<h3>Vip Google Clouds</h3>
						</div>
						<div
							className='p-4 text-[12px] gap-2 flex-col md:text-[13px] cursor-pointer rounded-2xl items-center justify-center flex min-h-[6.5rem] md:min-h-[6.8rem] w-[11rem] md:w-[12rem] bg-[rgba(107,114,128,0.4)] border-2 border-[rgba(0,0,0,0.20)] hover:bg-[rgba(156,163,175,0.5)] transition-all duration-300'
							onClick={getserver4EmbedVegaMovservers}>
							<div className='flex flex-row'>
								<img src='/svg/black-vip.png' alt='' />
								<h3 className='text-[2rem]'>#4</h3>
							</div>
							<h3>Vip Embed Servers</h3>
						</div>
						<div
							onClick={e => {
								if (!allserverofaml[0]) {
									getservermovielandservers();
								} else {
									if (e.currentTarget.lastElementChild.classList.contains("hidden")) {
										e.currentTarget.lastElementChild.classList.add("flex");
										e.currentTarget.lastElementChild.classList.remove("hidden");
									} else {
										e.currentTarget.lastElementChild.classList.remove("flex");
										e.currentTarget.lastElementChild.classList.add("hidden");
									}
								}
							}}
							className={`p-4 z-11 text-[12px] gap-2 flex-col md:text-[13px] cursor-pointer rounded-2xl items-center justify-center flex   ${
								allserverofaml[0] || serveramlspinner ? "min-h-[6.5rem] md:min-h-[6.8rem]" : "h-[8rem] md:h-[8rem]"
							}  clip-y-anim-initial   w-[13rem] md:w-[12rem] bg-[rgba(107,114,128,0.4)] border-2 border-[rgba(0,0,0,0.20)] hover:bg-[rgba(156,163,175,0.5)] transition-all duration-300`}>
							<div className='flex flex-row'>
								<img src='/svg/gold-vip.png' alt='' />
								<h3 className='text-[2rem]'>#5</h3>
							</div>
							<h3>Vip Server Systems</h3>
							<div>{serveramlspinner ? addspinner() : ""}</div>
							<div className='flex flex-col gap-2'>
								{allserverofaml?.map(el => {
									if (el.file_url.includes("gxplayer")) {
										return (
											<div
												key={el.video_file_id}
												onClick={() => servermovieland(el.file_url)}
												className='border-2 p-1 border-[rgba(100,120,176,0.5)] hover:bg-[rgba(100,120,176,0.5)] rounded-lg'>
												{el.label}
											</div>
										);
									}
								})}
							</div>
						</div>
						<div
							onClick={getserver5servers}
							className='p-4 text-[12px] gap-2 flex-col md:text-[13px] cursor-pointer rounded-2xl items-center justify-center flex min-h-[6.5rem] md:min-h-[6.8rem] w-[11rem] md:w-[12rem] bg-[rgba(107,114,128,0.4)] border-2 border-[rgba(0,0,0,0.20)] hover:bg-[rgba(156,163,175,0.5)] transition-all duration-300'>
							<div className='flex flex-row'>
								<img src='/svg/black-vip.png' alt='' />
								<h3 className='text-[2rem]'>#6</h3>
							</div>
							<h3>Vip AI Servers</h3>
						</div>
					</div>
					{mediadata ? (
						<div>
							<div
								className='mx-[4px] flex gap-[1.3rem] overflow-x-scroll scrollbar-hide w-[100%] overflow-y-hidden pl-8 pb-[1rem]'
								// style={{ width: "100%" }}

								// className="overflow-x-scroll"
							>
								{mediadata.map((item, ind) => {
									return (
										// <div></div>
										<div
											key={`${item.index}-${item.name}`}
											id={`seasonitem-${ind}`}
											ref={setRef(`season-${ind}`)}
											// className="rounded"
											// style={{ position: "relative" }}
											className='hover:scale-110  tansition-all duration-500 mt-5 cursor-pointer'
											onClick={() => {
												setcurrentselectedseason(ind);
											}}>
											<div
												className={`p-2 hover:bg-[rgba(203,213,225,0.8)] ${
													ind == currentselectedseason ? "bg-[rgba(203,213,225,0.8)]" : ""
												} relative  flex rounded-2xl justify-center transition-all duration-300`}>
												<LazyLoadImage
													alt={`${item.index}-${item.name}`}
													src={item?.poster}
													style={{
														// border: "2px solid red",
														overflow: "hidden",
														width: 110,
														borderRadius: 8,
														// height: 145,
														// marginRight: 8,
													}}
												/>
												<div
													style={{
														backgroundColor: "#0009",
														padding: 10,
														position: "absolute",
														top: "50%",
														left: "50%",
														transform: "translate(-50%,-50%)",
														borderRadius: 20,
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}>
													<img
														alt={"play"}
														src={"/play-white.png"}
														style={{
															width: 17,
															height: 17,
															position: "relative",
															// left: 1,
															// marginRight: 5,
															// margin: 10,
														}}
													/>
												</div>
											</div>
											<div
												style={{
													// backgroundColor: "green",
													position: "relative",
													// top: -130,
													display: "flex",
													// width: 100,
													// height: 1,
													// backgroundColor: "green",
													// backgroundColor: "red",
													// marginRight: 8,
													alignItems: "center",
													justifyContent: "center",
													// marginLeft:
													//   season.episodes.indexOf(item) == 0 ? 8 : 0,
												}}
												// imageStyle={{ borderRadius: 5 }}
												// defaultSource={require('../assets/images/series/money_heist/money_heist.jpg')}
											>
												<div
													style={{
														width: "100%",
														display: "flex",
														flexDirection: "row",
														justifyContent: "flex-end",
														paddingRight: 15,
														paddingTop: 2,
													}}>
													<h3
														style={{
															color: "white",
															fontWeight: "600",
															fontSize: 13,
														}}></h3>
												</div>
												<div
													style={{
														width: "100%",
														position: "absolute",

														display: "flex",
														flexDirection: "row",
														paddingRight: 15,
														paddingTop: 2,
													}}>
													<div
														style={
															{
																// transform: " translate(100px, 36px)",
															}
														}></div>
												</div>
											</div>

											<div
												style={{
													width: 110,
													paddingLeft: 5,
													paddingTop: 5,
												}}>
												<h3
													style={{
														color: "white",
														fontWeight: "500",
														fontSize: 14,
													}}>
													{`${item.name} & Eps-${item.episodes.length}`}
												</h3>
												<h3
													style={{
														color: "#fff9",
														fontWeight: "400",
														fontSize: 13,
														marginTop: -4,
														marginBottom: 2,
													}}>
													{item.plot.substr(0, 30)}
												</h3>
											</div>
										</div>
									);
								})}
							</div>
							<div
								className='mx-[4px] flex gap-[1.3rem] overflow-x-scroll scrollbar-hide w-[100%] overflow-y-hidden pl-8 pb-14 pr-6'
								// style={{ width: "100%" }}

								// className="overflow-x-scroll"
							>
								{mediadata[currentselectedseason]?.episodes?.map((item, indde) => {
									return (
										// <div></div>
										<div
											key={`${item.episodeDetails.episode_number}-${item.name}`}
											// className="rounded"
											// style={{ position: "relative" }}
											className='hover:scale-110 tansition-all duration-500 mt-5 cursor-pointer'
											onClick={() => {
												item.streamable
													? (window.location.href = `/SupportPlayer?d=${getParameterByName("d")}&t=${getParameterByName(
															"t"
													  )}&ty=${getParameterByName("ty")}&w=${getParameterByName("w")}&s=${
															item.episodeDetails.season_number
													  }&e=${item.episodeDetails.episode_number}&tmdb=${getParameterByName("tmdb")}`)
													: null;
												// ? router.push({
												//     pathname: "/SupportPlayer",
												//     query: {
												//       d: Movie.imdbID,
												//       t: Movie.tmdbTitle,
												//       ty: Movie.type,
												//       w: Movie.isWebseries,
												//       s: item.episodeDetails.season_number,
												//       e: item.episodeDetails.episode_number,
												//       tmdb: Movie.tmdbID,
												//     },
												// })
											}}>
											<div className=' w-[11rem] relative flex rounded-2xl justify-center'>
												<LazyLoadImage
													alt={`${item.episodeDetails.episode_number}-${item.name}`}
													src={`https://image.tmdb.org/t/p/original${mediadata[currentselectedseason]?.episodes[indde].episodeDetails.still_path}`}
													style={{
														// border: "2px solid red",
														overflow: "hidden",
														width: 200,
														borderRadius: 8,
														// height: 145,
														// marginRight: 8,
													}}
												/>
												<div
													style={{
														backgroundColor: "#0009",
														padding: 10,
														position: "absolute",
														top: "50%",
														left: "50%",
														transform: "translate(-50%,-50%)",
														borderRadius: 20,
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}>
													<img
														alt={"play"}
														src={"/play-white.png"}
														style={{
															width: 17,
															height: 17,
															position: "relative",
															// left: 1,
															// marginRight: 5,
															// margin: 10,
														}}
													/>
												</div>
											</div>
											<div
												style={{
													// backgroundColor: "green",
													position: "relative",
													// top: -130,
													display: "flex",
													// width: 100,
													// height: 1,
													// backgroundColor: "green",
													// backgroundColor: "red",
													// marginRight: 8,
													alignItems: "center",
													justifyContent: "center",
													// marginLeft:
													//   season.episodes.indexOf(item) == 0 ? 8 : 0,
												}}
												// imageStyle={{ borderRadius: 5 }}
												// defaultSource={require('../assets/images/series/money_heist/money_heist.jpg')}
											>
												<div
													style={{
														width: "100%",
														display: "flex",
														flexDirection: "row",
														justifyContent: "flex-end",
														paddingRight: 15,
														paddingTop: 2,
													}}>
													<h3
														style={{
															color: "white",
															fontWeight: "600",
															fontSize: 13,
														}}></h3>
												</div>
												<div
													style={{
														width: "100%",
														position: "absolute",

														display: "flex",
														flexDirection: "row",
														paddingRight: 15,
														paddingTop: 2,
													}}>
													<div
														style={
															{
																// transform: " translate(100px, 36px)",
															}
														}></div>
												</div>
											</div>

											<div
												style={{
													width: 110,
													paddingLeft: 5,
													paddingTop: 5,
												}}>
												<h3
													style={{
														color: "white",
														fontWeight: "500",
														fontSize: 14,
													}}>
													{`Ep-${item.episodeDetails.episode_number}`}
												</h3>
												<h3
													style={{
														color: "#fff9",
														fontWeight: "400",
														fontSize: 13,
														marginTop: -4,
														marginBottom: 2,
													}}>
													{`${item.episodeDetails.name}`}
												</h3>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default Playerfloatsettings;
