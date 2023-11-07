//Based on https://hdmovies4u.pics  get data with imdb id

import nc from "next-connect";
var axios = require("axios");
const jsdom = require("jsdom");
var cloudscraper = require("cloudscraper");
const { JSDOM } = jsdom;
const jquery = require("jquery");
const { Console } = require("console");
const virtualConsole = new jsdom.VirtualConsole();
import { decrypthex } from "../../../lib/encryption/encryption";
import verifyToken from "../../../lib/jsonWebToken/verifytoken";
import verifyAuth from "../../../lib/socket/socketAuth";
virtualConsole.on("error", () => {
	// No-op to skip console errors.
});

const handler = nc({
	onError: (err, req, res, next) => {
		// console.error(err.stack);
		res.status(500).end("Something broke!");
	},
	onNoMatch: (req, res) => {
		res.status(404).end("Page is not found");
	},
})
	.use(verifyToken)
	.use(verifyAuth)
	.get((req, res) => {
		try {
			(async () => {
				const imdbID = JSON.parse(
					decrypthex(JSON.parse(atob(req.query.imdb))[0], Buffer.from(JSON.parse(atob(req.query.imdb))[1]))
				);

				var tmdbData = {};
				let isWebseries = false;

				if (imdbID != null) {
					// let isWebseries = currentdat.Genre.includes("TV Shows Web Series");
					// console.log();

					let movie = (await axios.get(`https://v3.sg.media-imdb.com/suggestion/x/${imdbID}.json`)).data.d;

					if (movie.length > 0) {
						let title = movie[0].l;
						let year = movie[0].y;

						let data = await getMovie(title, year, req);

						if (typeof data != "undefined") {
							res.send({ data, streamable: true });
						} else {
							let data1 = await getMovie(title, year, req);
							if (typeof data1 != "undefined") {
								res.send({ data: data1, streamable: true });
							} else {
								res.send({ streamable: false });
							}
							// res.send({ streamable: false, data });
						}
					} else {
						res.send({ streamable: false });
					}
				} else {
					res.send({ streamable: false });
				}
			})();
		} catch (error) {
			// res.send(dat);
			res.send({ streamable: false });
		}
	});

async function getMovie(title, year, req) {
	try {
		var options = {
			uri: `https://www.movieboxpro.app/index/search?word=${title}&year=${year}`,
			headers: {
				cookie:
					"PHPSESSID=sis7d17h3clfkcqtn8r86cec6a; jump=%2F; ci=164ce9bbc3f37e; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NGIrQkJVa0YydXNobHdmZkFkMnVPVDNUN01Xc0U1MjY3cFJlbytFUVJOUjZ4SHRqZTJHbklheHphS21weTZIUlpsOVZ4cjRtUzRXNWYwdEZNWHlYeHYiLCJ2ZXJpZnkiOiI2MDk3ZmExYjcwZjk3NDExYjAxMzY4MjM4NmFiZWVjMyJ9; cf_clearance=8iaIIKeaG1fXqDh65bgIgSQdZDKXHykpFmzPR41QYy4-1693853945-0-1-e0c3d348.e313b369.b7c28ca8-0.2.1693853945",
				"User-Agent": "Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36",
				"Cache-Control": "private",
				Accept: "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
			},
		};
		// var options = {
		//   method: "GET",
		//   url: "https://cors-anywhere-c1ph.onrender.com/https://www.movieboxpro.app/index/search",
		//   params: { word: `${title} ${year}` },
		//   headers: {
		//     origin: null,
		//     Accept: "*/*",
		//     "User-Agent": "Thunder Client (https://www.thunderclient.com)",
		//     cookie:
		//       "tgw_l7_route=62c95d741e041784f184211096341602; PHPSESSID=f5c2ibchlve2m3b6tb9o0rfqq6; __cf_bm=SO2mxbc9h1DNy836roAaArXVK9NsH80.0GacDOSkWJQ-1663921939-0-AYYRlMOlLH+3Cf8TbHUXIb5WxxtTdIrBHWr9I1VOwNszfPSNgmoKIEdayO5RzAm1Gurc+6lVQuOiXod3St1zwRXhqMQk2tEh636R21Juaho5bLwSKBdDxgzRXruoTObZQg==; jump=%2F; ci=1632d6fddbd9aa; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NnM1OFhSVnJUNDFWVXlCUmxCT0NtNGN6MzdDN2RJTERlbm9tZ3FGXC9UNnI3OEQwVERnRUEzQW5RQTVudCtScVBMM1puYU9HU0VOTVU2MVZpNjFOYzJCIiwidmVyaWZ5IjoiODUxNWJiZDc4ODk0OWQzNDdjNjViMjZiNmEyY2MzZTcifQ%253D%253D",
		//     // host: "movieboxpro.app",
		//   },
		// };
		// let data = await axios
		//   .get(
		//     "https://cors-anywhere-c1ph.onrender.com/https://www.movieboxpro.app/index/search",
		//     {
		//       params: { word: `${title} ${year}` },
		//       headers: {
		//         origin: null,
		//         Accept: "*/*",
		//         "User-Agent": "Thunder Client (https://www.thunderclient.com)",
		//         cookie:
		//           "tgw_l7_route=62c95d741e041784f184211096341602; PHPSESSID=f5c2ibchlve2m3b6tb9o0rfqq6; __cf_bm=SO2mxbc9h1DNy836roAaArXVK9NsH80.0GacDOSkWJQ-1663921939-0-AYYRlMOlLH+3Cf8TbHUXIb5WxxtTdIrBHWr9I1VOwNszfPSNgmoKIEdayO5RzAm1Gurc+6lVQuOiXod3St1zwRXhqMQk2tEh636R21Juaho5bLwSKBdDxgzRXruoTObZQg==; jump=%2F; ci=1632d6fddbd9aa; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NnM1OFhSVnJUNDFWVXlCUmxCT0NtNGN6MzdDN2RJTERlbm9tZ3FGXC9UNnI3OEQwVERnRUEzQW5RQTVudCtScVBMM1puYU9HU0VOTVU2MVZpNjFOYzJCIiwidmVyaWZ5IjoiODUxNWJiZDc4ODk0OWQzNDdjNjViMjZiNmEyY2MzZTcifQ%253D%253D",
		//         // host: "movieboxpro.app",
		//       },
		//     }
		//   )
		//   .then((dat) => dat.data);
		let data = await cloudscraper(options).catch(error => console.log(error));
		const dom = new JSDOM(data, { virtualConsole });
		const $ = jquery(dom.window);
		// console.log($(".search_info").children().first().attr("href"));
		if (!$(".search_info").children().first().attr("href")) {
			return;
		}
		// console.log(
		//   dom.window.document.getElementsByClassName("search_info").innerTEXT
		// );
		const allhomelists = dom.window.document.getElementsByClassName("search_info");
		// const arrallhomelists = Array.from(allhomelists);
		var DataObj = {};

		DataObj.link = $(".search_info").children().first().attr("href");

		// DataObj.name =$(".search_info").children().first()
		//   .children(".title")
		//   .text()
		//   .split("(")[0]
		//   .trim();
		DataObj.name = $(".search_info").children().first().children("div").children("p").first().text();

		// DataObj.year = $(".search_info").children().first()
		//   .children(".title")
		//   .text()
		//   .split("(")[1]
		//   .replace(")", "")
		//   .trim();
		DataObj.year = $(".search_info")
			.children()
			.first()
			.children("div")
			.children("p")
			.last()
			.text()
			.match(/\d{4}/)[0]
			.trim();

		// DataObj.genre = $(".search_info").children().first()
		//   .children(".year")
		//   .text()
		//   .replace("\n", "")
		//   .trim()
		//   .split(",");
		// DataObj.genre = '$(".search_info")';
		DataObj.genre = $(".search_info")
			.children()
			.first()
			.children("div")
			.children("p")
			.last()
			.html()
			.trim()
			.split("<br>")[1]
			.split(",");

		// DataObj.desc = $(".search_info").children().first()
		//   .children("span")
		//   .last()
		//   .text();

		// DataObj.thumb = $(".search_info").children().first()
		//   .children("img")
		//   .attr("src")
		//   .trim();

		// DataObj.desc = $("ul")
		//   .children()
		//   .first()
		//   .children("a")
		//   .children(".time")
		//   .text();
		return DataObj;
	} catch (error) {
		console.error(error.response.data);
	}
}

function titleFormatter(rawTitle, yrRange, year, isWebseries) {
	//   console.log(rawTitle);
	let trash = ["(Part", "(", "(Season", "Netflix Original", "–"];

	// console.log(yearRange);
	let yearRange;

	//   console.log();

	if (typeof yrRange == "undefined") {
		yearRange = `${year}-${new Date().getFullYear()}`;
	} else {
		yearRange = yrRange;
	}

	//   console.log(yearRange);

	let d = rawTitle;

	if (isWebseries) {
		for (let y = parseInt(yearRange.split("-")[0]); y <= parseInt(yearRange.split("-")[1]); y++) {
			// console.log(year);
			d = d.split(y)[0];
		}
	} else {
		d = d.split(year)[0];
	}
	// console.log(year);

	d = d.replace("[18+]", "").replace("Download", "").trim();

	return d;
}

function getSeason(rawTitle) {
	return `Season ${rawTitle.split("Season ")[1].split(" ")[0]}`;
}

export default handler;
