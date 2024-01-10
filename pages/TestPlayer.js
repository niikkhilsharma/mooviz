import React from 'react'
import ReactPlayer from 'react-player'

function TestPlayer() {
	return (
		<ReactPlayer
			width={'100vw'}
			height={'100vh'}
			playing={true}
			url="https://vsd64.mycdn.me/hls/3239856769618.m3u8/sig/vG9SQtXXNyo/expires/1667672324734/srcIp/65.109.66.87/clientType/0/srcAg/CHROME_ANDROID/mid/4802816777810/video.m3u8?p
"
		/>
	)
}

export default TestPlayer
