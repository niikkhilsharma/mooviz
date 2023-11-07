import { Html, Head, Main, NextScript, script } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Alegreya+Sans&family=Barlow:ital,wght@1,600&family=Berkshire+Swash&family=Dosis&family=Exo+2:wght@300&family=Kanit&family=Poppins:wght@300&family=Roboto+Condensed:wght@300&family=Rubik&family=Staatliches&family=Varela+Round&display=swap'
					rel='stylesheet'
				/>

				<link href='https://unicons.iconscout.com/release/v2.1.9/css/unicons.css' rel='stylesheet' />
				{/* <link rel="stylesheet" href="/css/video-react.css" /> */}
				<link href='https://unpkg.com/lion-player@1.1.5/dist/lion-skin.min.css' rel='stylesheet'></link>
				{/* <script type="text/javascript">
	
</script> */}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
