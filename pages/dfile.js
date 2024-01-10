import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Dfile = () => {
	function getParameterByName(name, url = window.location.href) {
		name = name.replace(/[\[\]]/g, '\\$&')
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url)
		if (!results) return null
		if (!results[2]) return ''
		return decodeURIComponent(results[2].replace(/\+/g, ' '))
	}
	const [link, setlink] = useState('')
	var getserver5servers = async () =>
		new Promise(async (resolve, reject) => {
			if (getParameterByName('ty') == 'movie') {
				var alltypes = await axios
					.get('/api/server6/getMovie?imdb=' + getParameterByName('d'))
					.then(d => d.data)
				if (!alltypes.streamable) {
					reject()
					return
				}
				var isavail = await axios
					.post('/api/server6/getUrlNew', alltypes.data[0].key, {
						headers: { 'content-type': 'text/plain' },
					})
					.then(d => d.data)
				if (!isavail.streamable) {
					reject()
					return
				}
				// if (isavail.accepted) {
				//   setSERVER5PROC(false);
				//   setcurrentselectedServer("server5mvs");
				//   setfullplayerconfig((dat) => ({
				//     ...dat,
				//     url: isavail.data,
				//   }));
				// } else {
				var axres = await axios
					.post('/api/server6/getStreamNew', isavail.data, {
						headers: { 'content-type': 'text/plain' },
					})
					.then(d => d.data)
				if (!axres.streamable) {
					reject()
					return
				}
				if (axres.streamable) {
					location.href = axres.data
					setlink(axres.data)
				}
			}
			// }
		})
	useEffect(() => {
		getserver5servers()
	}, [])

	return (
		<div className="w-[100vw] h-[100vh] text-3xl flex items-center justify-center">
			<a href={link || '#'} className="w-[50%] text-center">
				{link || 'Waiting...'}
			</a>
			;
		</div>
	)
}

export default Dfile
