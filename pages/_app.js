import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '../styles/login.css'
import Head from 'next/head'
import '../styles/seekbarSTY.css'
import Context from '../context/AllContextProv'
import UserContext from '../context/accessacc'
import React, { useContext, useMemo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
const { io } = require('socket.io-client')
import axios from 'axios'
import MovizLoding from '../components/MovizLoding'
import ProfilePage from '../components/ProfilePage'

function MyApp({ Component, pageProps }) {
	const [canallow, setcanallow] = useState(<></>)
	const [alreadyjoined, setalreadyjoined] = useState(false)
	const [cangoahed, setcangoahed] = useState(false)
	const [authtoken, setauthtoken] = useState('')
	var router = useRouter()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			axios.defaults.headers.common['auth_token'] = localStorage.getItem('token')
		}
	}, [router.route, authtoken])
	var socket = useMemo(() => ({ connected: false, disconnect: () => {} }))
	// useEffect(() => {
	// 	if (authtoken != '') {
	// 		if (!socket.connected) {
	// 			socket = io('wss://socket.mooviz.tk/', {
	// 				auth: {
	// 					token: localStorage.getItem('token'),
	// 				},
	// 			})
	// 			// socket.connect();
	// 		}
	// 		socket.off('connect')
	// 		socket.on('connect', () => {
	// 			// socket.emit("new-user-joined", () => {});
	// 			socket.off('banned')
	// 			setcangoahed(true)

	// 			socket.on('banned', d => {
	// 				setcanallow(<></>)
	// 				localStorage.clear('token')
	// 				router.push('/User')
	// 				alert(d.message)
	// 			})
	// 		})
	// 	}
	// 	return () => {
	// 		socket?.disconnect()
	// 	}
	// }, [authtoken])

	// useEffect(() => {
	// 	if (localStorage.getItem('token')) {
	// 		setauthtoken(localStorage.getItem('token'))
	// 	}
	// }, [router.route])

	var compforinit = (
		<Context>
			<UserContext>
				<Head>
					<link rel="shortcut icon" href="/favicon.svg" />
				</Head>
				{/* <ProfilePage /> */}
				<Navbar />
				<Component {...pageProps} />
			</UserContext>
		</Context>
	)
	var compforinitAUTH = (
		<Context>
			<UserContext>
				<Head>
					<link rel="shortcut icon" href="/favicon.svg" />
				</Head>
				<Component {...pageProps} />
			</UserContext>
		</Context>
	)

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			if (router.route != '/User') {
				setcanallow(<></>)
				router.push('/User')
			} else {
				setcanallow(compforinitAUTH)
			}
		} else {
			if (router.route == '/User') {
				setcanallow(<></>)
				router.push('/')
			}
			if (router.route == '/' && !cangoahed) {
				setcanallow(compforinit)
			}
			if (router.route != '/' && !cangoahed) {
				setcanallow(<MovizLoding />)
			}
			if (cangoahed) {
				setcanallow(compforinit)
			}
		}
	}, [router.route, cangoahed])

	return canallow
}

export default MyApp
