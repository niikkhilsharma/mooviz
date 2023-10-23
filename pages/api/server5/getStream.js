//Based on https://hdmovies4u.pics  get data with imdb id

import fs from "fs";
import nc from "next-connect";
var axios = require("axios");
const jsdom = require("jsdom");
var cloudscraper = require("cloudscraper");
const { JSDOM } = jsdom;
const jquery = require("jquery");
const { Console } = require("console");
const virtualConsole = new jsdom.VirtualConsole();
import verifyToken from "../../../lib/jsonWebToken/verifytoken";
import verifyAuth from "../../../lib/socket/socketAuth";
virtualConsole.on("error", (error) => {
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
        const link = req.query.link;
        if (link.includes("movie")) {
          var data = await getMovie(link, req);
        } else {
          const season = req.query.s;
          const episode = req.query.e;
          var data = await getSeries(link, season, episode, req);
        }

        if (typeof data != "undefined") {
          res.send({ data, streamable: true });
        } else {
          res.send({ streamable: false });
        }
      })();
    } catch (error) {
      // console.log(error);
      // res.send(dat);
      res.send({ streamable: false });
    }
  });

async function getMovie(link, req) {
  try {
    var options = {
      uri: "https://www.movieboxpro.app" + link,
      headers: {
        cookie:
          "PHPSESSID=sis7d17h3clfkcqtn8r86cec6a; jump=%2F; ci=164ce9bbc3f37e; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NGIrQkJVa0YydXNobHdmZkFkMnVPVDNUN01Xc0U1MjY3cFJlbytFUVJOUjZ4SHRqZTJHbklheHphS21weTZIUlpsOVZ4cjRtUzRXNWYwdEZNWHlYeHYiLCJ2ZXJpZnkiOiI2MDk3ZmExYjcwZjk3NDExYjAxMzY4MjM4NmFiZWVjMyJ9; cf_clearance=8iaIIKeaG1fXqDh65bgIgSQdZDKXHykpFmzPR41QYy4-1693853945-0-1-e0c3d348.e313b369.b7c28ca8-0.2.1693853945",
        "User-Agent":
          "Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36",
        "Cache-Control": "private",
        Accept:
          "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
      },
    };
    // var options = {
    //   method: "GET",
    //   url:
    //     "https://cors-anywhere-c1ph.onrender.com/https://www.movieboxpro.app" +
    //     link,
    //   headers: {
    //     origin: null,
    //     Accept: "*/*",
    //     "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //     cookie:
    //       "tgw_l7_route=62c95d741e041784f184211096341602; PHPSESSID=f5c2ibchlve2m3b6tb9o0rfqq6; __cf_bm=SO2mxbc9h1DNy836roAaArXVK9NsH80.0GacDOSkWJQ-1663921939-0-AYYRlMOlLH+3Cf8TbHUXIb5WxxtTdIrBHWr9I1VOwNszfPSNgmoKIEdayO5RzAm1Gurc+6lVQuOiXod3St1zwRXhqMQk2tEh636R21Juaho5bLwSKBdDxgzRXruoTObZQg==; jump=%2F; ci=1632d6fddbd9aa; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NnM1OFhSVnJUNDFWVXlCUmxCT0NtNGN6MzdDN2RJTERlbm9tZ3FGXC9UNnI3OEQwVERnRUEzQW5RQTVudCtScVBMM1puYU9HU0VOTVU2MVZpNjFOYzJCIiwidmVyaWZ5IjoiODUxNWJiZDc4ODk0OWQzNDdjNjViMjZiNmEyY2MzZTcifQ%253D%253D",
    //     // host: "movieboxpro.app",
    //   },
    // };

    // let { data } = await axios(options);
    let data = await cloudscraper(options).catch((err) => console.log);
    var dom = new JSDOM(data, { virtualConsole });
    var $ = jquery(dom.window);
    var workarr = new Array();
    var mainurl = "";
    $("li[oss_download_url]").each((iin, iid) => {
      // console.log($(iid).attr("oss_download_url"));
      if ($("li[oss_download_url]").length == 1) {
        mainurl = $(iid).attr("oss_download_url");
      } else {
        workarr.push($(iid).attr("oss_download_url"));
        if (iin == $("li[oss_download_url]").length - 1) {
          mainurl = workarr;
        }
      }
    });
    if (workarr.length == 0) {
      // var res1 = await axios
      //   .get(
      //     `https://cors-anywhere-c1ph.onrender.com/https://www.movieboxpro.app/${mainurl}`,
      //     {
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
      var options = {
        uri: `https://www.movieboxpro.app/${mainurl}`,
        headers: {
          cookie:
            "PHPSESSID=sis7d17h3clfkcqtn8r86cec6a; jump=%2F; ci=164ce9bbc3f37e; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NGIrQkJVa0YydXNobHdmZkFkMnVPVDNUN01Xc0U1MjY3cFJlbytFUVJOUjZ4SHRqZTJHbklheHphS21weTZIUlpsOVZ4cjRtUzRXNWYwdEZNWHlYeHYiLCJ2ZXJpZnkiOiI2MDk3ZmExYjcwZjk3NDExYjAxMzY4MjM4NmFiZWVjMyJ9; cf_clearance=8iaIIKeaG1fXqDh65bgIgSQdZDKXHykpFmzPR41QYy4-1693853945-0-1-e0c3d348.e313b369.b7c28ca8-0.2.1693853945",
          // "ci=1632d6fddbd9aa; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NnM1OFhSVnJUNDFWVXlCUmxCT0NtNGN6MzdDN2RJTERlbm9tZ3FGXC9UNnI3OEQwVERnRUEzQW5RQTVudCtScVBMM1puYU9HU0VOTVU2MVZpNjFOYzJCIiwidmVyaWZ5IjoiODUxNWJiZDc4ODk0OWQzNDdjNjViMjZiNmEyY2MzZTcifQ%253D%253D; __stripe_mid=f7efb17f-4424-4a87-b453-bb18b246d3d461ef22; tgw_l7_route=4fe637d465ff062cddb7add0ea0c2048; PHPSESSID=40ase7r943mjqko036a0ufo77r; __cf_bm=OSnn0e6ynxB5_Wndgw5DnQbnvzV3heLOSCer9Pb8DAI-1668437342-0-AeYh2zteazd1dzrWcbp2jTiBfauSvTOV0QVe8SCe7JWsW8Wp3h9ODya2XHjjJRngZn00bmDqFCaa0wwhW2FeWRDl214Gm5/u1SG59XDu6UZ8Ojyo0ODhdKhbSGb2srocJw==",
          "User-Agent":
            "Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36",
          "Cache-Control": "private",
          Accept:
            "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
        },
      };
      let res1 = await cloudscraper(options).catch((error) =>
        console.log(error)
      );
      // fs.writeFileSync("temp1.html", res1);
      var alllinks =
        JSON.parse("[{" + res1.split("[{")[1].split("}]")[0] + "}]") || [];
      if (alllinks[0]) {
        mainurl = alllinks.filter((el) => el.label != "ORG");
      } else {
        mainurl = res1.split('file":')[1].split('"')[1];
      }
    } else {
      mainurl = await getallstreams(workarr);
      // workarr.forEach(async (el, iind) => {
      //   // var res1 = await axios
      //   //   .get(
      //   //     `https://cors-anywhere-c1ph.onrender.com/https://www.movieboxpro.app/${el}`,
      //   //     {
      //   //       headers: {
      //   //         origin: null,
      //   //         Accept: "*/*",
      //   //         "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      //   //         cookie:
      //   //           "tgw_l7_route=62c95d741e041784f184211096341602; PHPSESSID=f5c2ibchlve2m3b6tb9o0rfqq6; __cf_bm=SO2mxbc9h1DNy836roAaArXVK9NsH80.0GacDOSkWJQ-1663921939-0-AYYRlMOlLH+3Cf8TbHUXIb5WxxtTdIrBHWr9I1VOwNszfPSNgmoKIEdayO5RzAm1Gurc+6lVQuOiXod3St1zwRXhqMQk2tEh636R21Juaho5bLwSKBdDxgzRXruoTObZQg==; jump=%2F; ci=1632d6fddbd9aa; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NnM1OFhSVnJUNDFWVXlCUmxCT0NtNGN6MzdDN2RJTERlbm9tZ3FGXC9UNnI3OEQwVERnRUEzQW5RQTVudCtScVBMM1puYU9HU0VOTVU2MVZpNjFOYzJCIiwidmVyaWZ5IjoiODUxNWJiZDc4ODk0OWQzNDdjNjViMjZiNmEyY2MzZTcifQ%253D%253D",
      //   //         // host: "movieboxpro.app",
      //   //       },
      //   //     }
      //   //   )
      //   //   .then((dat) => dat.data);
      //   var options = {
      //     uri: `https://www.movieboxpro.app/${el}`,
      //     headers: {
      //       cookie:
      //         "ci=1632d6fddbd9aa; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NnM1OFhSVnJUNDFWVXlCUmxCT0NtNGN6MzdDN2RJTERlbm9tZ3FGXC9UNnI3OEQwVERnRUEzQW5RQTVudCtScVBMM1puYU9HU0VOTVU2MVZpNjFOYzJCIiwidmVyaWZ5IjoiODUxNWJiZDc4ODk0OWQzNDdjNjViMjZiNmEyY2MzZTcifQ%253D%253D; __stripe_mid=f7efb17f-4424-4a87-b453-bb18b246d3d461ef22; tgw_l7_route=4fe637d465ff062cddb7add0ea0c2048; PHPSESSID=40ase7r943mjqko036a0ufo77r; __cf_bm=OSnn0e6ynxB5_Wndgw5DnQbnvzV3heLOSCer9Pb8DAI-1668437342-0-AeYh2zteazd1dzrWcbp2jTiBfauSvTOV0QVe8SCe7JWsW8Wp3h9ODya2XHjjJRngZn00bmDqFCaa0wwhW2FeWRDl214Gm5/u1SG59XDu6UZ8Ojyo0ODhdKhbSGb2srocJw==",
      //       "User-Agent":
      //         "Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36",
      //       "Cache-Control": "private",
      //       Accept:
      //         "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
      //     },
      //   };
      //   let res1 = await cloudscraper(options).catch((error) =>
      //     console.log(error)
      //   );

      //   mainurl = [...mainurl, res1.split('file":')[1].split('"')[1]];
      //   if (iind == workarr.length - 1) {
      //     // console.log(mainurl);
      //     return;
      //   }
      // });
    }
    // console.log(mainurl);
    return mainurl;
    // return mainurl;
  } catch (error) {
    console.error(error);
  }
}
var getallstreams = async (workarr) => {
  var iind = 0;
  var mainurl = [];
  for (const el of workarr) {
    iind = iind + 1;
    var options = {
      uri: `https://www.movieboxpro.app/${el}`,
      headers: {
        cookie:
          "PHPSESSID=sis7d17h3clfkcqtn8r86cec6a; jump=%2F; ci=164ce9bbc3f37e; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NGIrQkJVa0YydXNobHdmZkFkMnVPVDNUN01Xc0U1MjY3cFJlbytFUVJOUjZ4SHRqZTJHbklheHphS21weTZIUlpsOVZ4cjRtUzRXNWYwdEZNWHlYeHYiLCJ2ZXJpZnkiOiI2MDk3ZmExYjcwZjk3NDExYjAxMzY4MjM4NmFiZWVjMyJ9; cf_clearance=8iaIIKeaG1fXqDh65bgIgSQdZDKXHykpFmzPR41QYy4-1693853945-0-1-e0c3d348.e313b369.b7c28ca8-0.2.1693853945",
        "User-Agent":
          "Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36",
        "Cache-Control": "private",
        Accept:
          "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
      },
    };
    let res1 = await cloudscraper(options).catch((error) => console.log(error));
    // console.log(mainurl);
    var alllinks =
      JSON.parse("[{" + res1.split("[{")[1].split("}]")[0] + "}]") || [];
    if (alllinks[0]) {
      mainurl = [...mainurl, ...alllinks.filter((el) => el.label != "ORG")];
    } else {
      mainurl = [...mainurl, res1.split('file":')[1].split('"')[1]];
    }

    if (iind == workarr.length) {
      let countobj = {};
      mainurl = mainurl.map((eel) => {
        if (countobj[eel.label]) {
          countobj[eel.label + "(Server2)"] = eel.label + "(Server2)";
          eel["label"] = eel.label + "(Server2)";
          return eel;
        } else {
          countobj[eel.label] = eel.label;
          return eel;
        }
      });
      return mainurl;
    }
  }
  //   workarr.forEach(async (el, iind) => {
  //     var options = {
  //       uri: `https://www.movieboxpro.app/${el}`,
  //       headers: {
  //         cookie:
  //           "ci=1632d6fddbd9aa; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NnM1OFhSVnJUNDFWVXlCUmxCT0NtNGN6MzdDN2RJTERlbm9tZ3FGXC9UNnI3OEQwVERnRUEzQW5RQTVudCtScVBMM1puYU9HU0VOTVU2MVZpNjFOYzJCIiwidmVyaWZ5IjoiODUxNWJiZDc4ODk0OWQzNDdjNjViMjZiNmEyY2MzZTcifQ%253D%253D; __stripe_mid=f7efb17f-4424-4a87-b453-bb18b246d3d461ef22; tgw_l7_route=4fe637d465ff062cddb7add0ea0c2048; PHPSESSID=40ase7r943mjqko036a0ufo77r; __cf_bm=OSnn0e6ynxB5_Wndgw5DnQbnvzV3heLOSCer9Pb8DAI-1668437342-0-AeYh2zteazd1dzrWcbp2jTiBfauSvTOV0QVe8SCe7JWsW8Wp3h9ODya2XHjjJRngZn00bmDqFCaa0wwhW2FeWRDl214Gm5/u1SG59XDu6UZ8Ojyo0ODhdKhbSGb2srocJw==",
  //         "User-Agent":
  //           "Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36",
  //         "Cache-Control": "private",
  //         Accept:
  //           "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
  //       },
  //     };
  //     let res1 = await cloudscraper(options).catch((error) =>
  //       console.log(error)
  //     );

  //     mainurl = [...mainurl, res1.split('file":')[1].split('"')[1]];
  //     if (iind == workarr.length - 1) {
  //       // console.log(mainurl);
  //       return;
  //     }
  //   });
  // console.log(mainurl);
  // return mainurl;
};
async function getSeries(link, s, e, req) {
  try {
    var options = {
      uri: `https://www.movieboxpro.app/index/index/tv_file`,
      method: "POST",
      body: `tid=${link.split("/")[2]}&season=${s}&episode=${e}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        cookie:
          "PHPSESSID=sis7d17h3clfkcqtn8r86cec6a; jump=%2F; ci=164ce9bbc3f37e; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NGIrQkJVa0YydXNobHdmZkFkMnVPVDNUN01Xc0U1MjY3cFJlbytFUVJOUjZ4SHRqZTJHbklheHphS21weTZIUlpsOVZ4cjRtUzRXNWYwdEZNWHlYeHYiLCJ2ZXJpZnkiOiI2MDk3ZmExYjcwZjk3NDExYjAxMzY4MjM4NmFiZWVjMyJ9; cf_clearance=8iaIIKeaG1fXqDh65bgIgSQdZDKXHykpFmzPR41QYy4-1693853945-0-1-e0c3d348.e313b369.b7c28ca8-0.2.1693853945",
        "User-Agent":
          "Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36",
        // "Cache-Control": "private",
        Accept:
          "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
      },
    };
    // var options = {
    //   headers: {
    //     origin: null,
    //     Accept: "*/*",
    //     referer: "https://www.movieboxpro.app" + link,
    //     "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     cookie:
    //       "tgw_l7_route=62c95d741e041784f184211096341602; PHPSESSID=f5c2ibchlve2m3b6tb9o0rfqq6; __cf_bm=SO2mxbc9h1DNy836roAaArXVK9NsH80.0GacDOSkWJQ-1663921939-0-AYYRlMOlLH+3Cf8TbHUXIb5WxxtTdIrBHWr9I1VOwNszfPSNgmoKIEdayO5RzAm1Gurc+6lVQuOiXod3St1zwRXhqMQk2tEh636R21Juaho5bLwSKBdDxgzRXruoTObZQg==; jump=%2F; ci=1632d6fddbd9aa; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NnM1OFhSVnJUNDFWVXlCUmxCT0NtNGN6MzdDN2RJTERlbm9tZ3FGXC9UNnI3OEQwVERnRUEzQW5RQTVudCtScVBMM1puYU9HU0VOTVU2MVZpNjFOYzJCIiwidmVyaWZ5IjoiODUxNWJiZDc4ODk0OWQzNDdjNjViMjZiNmEyY2MzZTcifQ%253D%253D",
    //     // host: "movieboxpro.app",
    //   },
    // };
    // let { data } = await axios.post(
    //   "https://cors-anywhere-c1ph.onrender.com/https://www.movieboxpro.app/index/index/tv_file",
    //   `tid=${link.split("/")[2]}&season=${s}&episode=${e}`,
    //   options
    // );
    let data = await cloudscraper(options).catch((error) => console.log(error));
    var dom = new JSDOM(JSON.parse(data).data.list, { virtualConsole });
    var $ = jquery(dom.window);
    var workarr = new Array();
    var mainurl;
    $("li[oss_download_url]").each((iin, iid) => {
      if ($("li[oss_download_url]").length == 1) {
        mainurl = $(iid).attr("oss_download_url");
      } else {
        workarr.push($(iid).attr("oss_download_url"));
        if (iin == $("li[oss_download_url]").length - 1) {
          mainurl = workarr;
        }
      }
    });
    if (workarr.length == 0) {
      // var res1 = await axios
      //   .get(
      //     `https://cors-anywhere-c1ph.onrender.com/https://www.movieboxpro.app/${mainurl}`,
      //     {
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
      var options = {
        uri: `https://www.movieboxpro.app/${mainurl}`,
        headers: {
          cookie:
            "PHPSESSID=sis7d17h3clfkcqtn8r86cec6a; jump=%2F; ci=164ce9bbc3f37e; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NGIrQkJVa0YydXNobHdmZkFkMnVPVDNUN01Xc0U1MjY3cFJlbytFUVJOUjZ4SHRqZTJHbklheHphS21weTZIUlpsOVZ4cjRtUzRXNWYwdEZNWHlYeHYiLCJ2ZXJpZnkiOiI2MDk3ZmExYjcwZjk3NDExYjAxMzY4MjM4NmFiZWVjMyJ9; cf_clearance=8iaIIKeaG1fXqDh65bgIgSQdZDKXHykpFmzPR41QYy4-1693853945-0-1-e0c3d348.e313b369.b7c28ca8-0.2.1693853945",
          "User-Agent":
            "Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36",
          "Cache-Control": "private",
          Accept:
            "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
        },
      };
      let res1 = await cloudscraper(options).catch((error) =>
        console.log(error)
      );
      var alllinks =
        JSON.parse("[{" + res1.split("[{")[1].split("}]")[0] + "}]") || [];
      if (alllinks[0]) {
        mainurl = alllinks.filter((el) => el.label != "ORG");
      } else {
        mainurl = res1.split('file":')[1].split('"')[1];
      }
    } else {
      mainurl = await getallstreams(workarr);

      // workarr.forEach(async (el, iind) => {
      //   // var res1 = await axios
      //   //   .get(
      //   //     `https://cors-anywhere-c1ph.onrender.com/https://www.movieboxpro.app/${el}`,
      //   //     {
      //   //       headers: {
      //   //         origin: null,
      //   //         Accept: "*/*",
      //   //         "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      //   //         cookie:
      //   //           "tgw_l7_route=62c95d741e041784f184211096341602; PHPSESSID=f5c2ibchlve2m3b6tb9o0rfqq6; __cf_bm=SO2mxbc9h1DNy836roAaArXVK9NsH80.0GacDOSkWJQ-1663921939-0-AYYRlMOlLH+3Cf8TbHUXIb5WxxtTdIrBHWr9I1VOwNszfPSNgmoKIEdayO5RzAm1Gurc+6lVQuOiXod3St1zwRXhqMQk2tEh636R21Juaho5bLwSKBdDxgzRXruoTObZQg==; jump=%2F; ci=1632d6fddbd9aa; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NnM1OFhSVnJUNDFWVXlCUmxCT0NtNGN6MzdDN2RJTERlbm9tZ3FGXC9UNnI3OEQwVERnRUEzQW5RQTVudCtScVBMM1puYU9HU0VOTVU2MVZpNjFOYzJCIiwidmVyaWZ5IjoiODUxNWJiZDc4ODk0OWQzNDdjNjViMjZiNmEyY2MzZTcifQ%253D%253D",
      //   //         // host: "movieboxpro.app",
      //   //       },
      //   //     }
      //   //   )
      //   //   .then((dat) => dat.data);
      //   var options = {
      //     uri: `https://www.movieboxpro.app/${el}`,
      //     headers: {
      //       cookie:
      //         "PHPSESSID=sis7d17h3clfkcqtn8r86cec6a; jump=%2F; ci=164ce9bbc3f37e; ui=eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJlbmNyeXB0X2RhdGEiOiJWQUtzQ1JJY0k4NGIrQkJVa0YydXNobHdmZkFkMnVPVDNUN01Xc0U1MjY3cFJlbytFUVJOUjZ4SHRqZTJHbklheHphS21weTZIUlpsOVZ4cjRtUzRXNWYwdEZNWHlYeHYiLCJ2ZXJpZnkiOiI2MDk3ZmExYjcwZjk3NDExYjAxMzY4MjM4NmFiZWVjMyJ9; cf_clearance=8iaIIKeaG1fXqDh65bgIgSQdZDKXHykpFmzPR41QYy4-1693853945-0-1-e0c3d348.e313b369.b7c28ca8-0.2.1693853945",
      //       "User-Agent":
      //         "Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36",
      //       "Cache-Control": "private",
      //       Accept:
      //         "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
      //     },
      //   };
      //   let res1 = await cloudscraper(options).catch((error) =>
      //     console.log(error)
      //   );
      //   mainurl = [...mainurl, res1.split('file":')[1].split('"')[1]];
      //   if (iind == workarr.length - 1) {
      //     return;
      //   }
      // });
    }
    return mainurl;
  } catch (error) {
    console.error(error);
  }
}

export default handler;
