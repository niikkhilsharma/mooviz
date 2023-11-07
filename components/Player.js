import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Router from "next/router";
import $ from "jquery";
// import ReactPlayer, { FilePlayer } from "react-player";
// import SeekBar from "react-seekbar-component";
import Seekbar from "../components/Seekbar";
import ReactPlayer from "react-player";
import ReactDOM from "react-dom/client";
const Player = props => {
	const videoref = useRef(null);
	const controlsref = useRef(null);
	const [fullplayerconfig, setfullplayerconfig] = useState({
		playing: props.playing || false,
		muted: props.muted || false,
		volume: props.volume || 1,
		url: props.url || "",
		duration: props.duration || 0,
		progess: props.progress || 0,
		seekval: props.seekval || 0,
		goto: props.goto || 0,
	});
	useEffect(() => {
		console.log("playing", props.playing);
		setfullplayerconfig(dat => ({ ...dat, playing: props.playing }));
	}, [props.playing]);

	function toggleFullScreen() {
		var doc = window.document;
		var docEl = doc.documentElement;

		var requestFullScreen =
			docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
		var cancelFullScreen =
			doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

		if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
			requestFullScreen.call(docEl);
		} else {
			cancelFullScreen.call(doc);
		}
	}
	useEffect(() => {
		if (props.url) {
			let timeout;
			let whenMouseMoves = () => {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					if (controlsref?.current?.classList) {
						controlsref.current.classList.add("hidden");
					}
				}, 8000);
			};

			document.body.addEventListener("mousemove", e => {
				whenMouseMoves();
				if (controlsref?.current?.classList) {
					controlsref.current.classList.remove("hidden");
				}
			});
			return () => {
				clearTimeout(timeout);
			};
		}
		return () => {
			// clearTimeout(timeout);
			// document.body.removeEventListener("mousemove");
		};
	}, [props.url]);

	useEffect(() => {
		$("#navfixed").addClass("hidden");
		return () => {
			$("#navfixed").removeClass("hidden");
		};
	}, [$.ready]);

	useEffect(() => {
		// console.log(fullplayerconfig.goto);
		if (props.goto) {
			videoref.current.seekTo(props.goto, "seconds");
		}
	}, [props.goto]);

	return (
		<>
			<ReactPlayer
				width={"100vw"}
				height={"100vh"}
				ref={videoref}
				controls={false}
				muted={fullplayerconfig.muted}
				onBuffer={e => console.log("loading", e)}
				playing={fullplayerconfig.playing}
				onBufferEnd={e => console.log("buffer", e)}
				volume={fullplayerconfig.volume}
				url={fullplayerconfig.url}
				onProgress={e => {
					setfullplayerconfig(dat => ({
						...dat,
						progess: Math.floor(e.playedSeconds),
						seekval: e.playedSeconds,
					}));
				}}
				onDuration={e =>
					setfullplayerconfig(dat => ({
						...dat,
						duration: Math.floor(e),
					}))
				}
				// url="https://drive1.uploadever.in:183/d/37debutxrhr3cm5l7s2lobpv4fkczi7pjb3e4eqpwlanrdab5ezqmsleoc4rlntxohyzio3d/HDMovies4u.CAM-Red 2021 WebRip UNCUT 720p Hindi Telugu AAC 2.0 x264 ESub.mkv"
			/>
		</>
	);
};

export default Player;
