import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import MovizLoding from '../components/MovizLoding'
import { allhomemovies } from '../context/allcontexts'
import { useRouter } from 'next/router'
const TvChannels = () => {
	var { AllChanneldata, setAllChanneldata } = useContext(allhomemovies)
	const [allChannels, setallChannels] = useState(
		AllChanneldata['Entertainment'] ? AllChanneldata : {}
	)
	var router = useRouter()

	useEffect(() => {
		;(async () => {
			try {
				if (!AllChanneldata['Entertainment']) {
					var axres = await axios.get('/api/livetv/AllChannels').then(d => d.data)
					if (!axres.errors) {
						setallChannels(axres.allChannels)
						setAllChanneldata(axres.allChannels)
						//   console.log(axres.allChannels["Entertainment"].Hindi[0].logo);
					}
				}
			} catch (error) {
				console.log(error)
			}
		})()
	}, [])

	return (
		<div className="w-[100vw] grid md:grid-cols-6 grid-cols-2 items-center  justify-items-center gap-[2rem] mt-[2rem]">
			{allChannels?.Entertainment ? (
				Object.keys(allChannels).map(e => (
					<div
						key={e}
						onClick={() => {
							router.push({ pathname: '/TvChannel', query: { Catagory: e } })
						}}
						className=" relative overflow-hidden w-[12rem] h-[12rem] bg-gray-300 border-2 border-[rgba(255,255,255,0.1)] rounded-2xl cursor-pointer hover:bg-gray-400 transition-all duration-200 group"
					>
						<style>{`
            @keyframes bgtransformanims {
              0%{
                transform:rotate(0deg) scale(1) translateY(-100%);
                opacity:0.4;
                // top:-20%;
              }
              25%{
                transform:rotate(90deg) scale(1.1) translateY(100%) ;
                opacity:0.6;
                // bottom:-20%;
                // top:auto;
              }
              50%{
                transform:rotate(135deg) scale(1.2)  translateY(-100%);
                opacity:0.8;
                // bottom:auto;
                // top:-20%;
              }
              75%{
                transform:rotate(180deg) scale(1.3) translateY(100%) ;
                opacity:0.6;
                // bottom:-20%;
                // top:auto;
              }
              100%{
                transform:rotate(360deg) scale(1) translateY(-100%) ;
                opacity:0.4;
                // top:-20%;
                // bottom:initial;
              }
            }
            `}</style>
						<div
							style={{
								background: 'linear-gradient(70deg,rgba(100,255,30,1),magenta)',
								animation: 'bgtransformanims 20s ease-in-out infinite',
							}}
							className="absolute top-[-20%] right-[-20%] w-[10rem] h-[10rem] rounded-full 1bg-gradient-to-b from-[rgba(0,200,30,1)] to-pink-600 blur-[1.5rem] z-[1]"
						/>
						{allChannels[e]?.Hindi || allChannels[e]?.English ? (
							<div className="h-[90%] w-full flex justify-end items-center flex-col ">
								<div className="flex group-hover:scale-110 transition-all duration-300 z-[2]">
									<img
										className="w-[5.5rem]"
										src={
											e != 'Entertainment'
												? allChannels[e]?.Hindi
													? allChannels[e]?.Hindi[0]?.logo
													: allChannels[e]?.English[0]?.logo
												: allChannels[e]?.Hindi[5]?.logo
										}
									/>
									<img
										className="w-[5.5rem]"
										src={
											allChannels[e]?.Hindi ? allChannels[e]?.Hindi[1]?.logo : allChannels[e]?.English[1]?.logo
										}
									/>
								</div>
								<div className="flex group-hover:scale-90 transition-all duration-300 z-[2]">
									<img
										className="w-[5.5rem]"
										src={
											allChannels[e]?.Hindi ? allChannels[e]?.Hindi[2]?.logo : allChannels[e]?.English[2]?.logo
										}
									/>
									<img
										className="w-[5.5rem]"
										src={
											e != 'Business'
												? allChannels[e]?.Hindi
													? allChannels[e]?.Hindi[3]?.logo
													: allChannels[e]?.English[3]?.logo
												: allChannels[e]?.English[1]?.logo
										}
									/>
								</div>
							</div>
						) : (
							''
						)}
						<div
							style={{
								clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
								fontFamily: 'kanit',
							}}
							className="absolute 1h-[1.3rem] 1group-hover:h-[15rem] transition-all duration-[.5s] top-0 1bottom-[2px] left-[50%] translate-x-[-50%] max-w-[85%] z-[2] text-[0.8rem] text-white bg-green-600 w-full text-center 1font-bold tracking-wide"
						>
							{e}
						</div>
					</div>
				))
			) : (
				<MovizLoding />
			)}
		</div>
	)
}

export default TvChannels
