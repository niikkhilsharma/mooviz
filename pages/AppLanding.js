import $ from 'jquery'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { useEffect, useState, useMemo } from 'react'
import { FaPlay } from 'react-icons/fa'
import Image from 'next/image'
import Download from '../components/LandingPage/Download'
import Experience from '../components/LandingPage/Experience'
import Footer from '../components/LandingPage/Footer'
// import Header from "../components/LandingPage/Header";
import Hero from '../components/LandingPage/Hero'
// import Search from "../components/LandingPage/Search";

function AppLanding() {
	// useEffect(() => {
	//   $("#navfixed").addClass("hidden");
	//   return () => {
	//     $("#navfixed").removeClass("hidden");
	//   };
	// }, [$.ready]);
	useEffect(() => {
		$('#navfixed2').addClass('bg-[#081730]')
		return () => {
			$('#navfixed').removeClass('bg-[#081730]')
		}
	}, [$.ready])

	return (
		<div className="App text-white overflow-hidden">
			{/* <Header /> */}
			<Hero />
			<Experience />
			{/* <Search/> */}
			<Download />
			<Footer />
		</div>
	)
}

export default AppLanding
