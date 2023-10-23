import axios from "axios";
import jsdomi from "jsdom";
const { JSDOM } = jsdomi;
import jqreyi from "jquery";
import FormData from "form-data";
const VirtualConsole = new jsdomi.VirtualConsole();
VirtualConsole.on("error", () => {
  // No-op to skip console errors.
});

import dbConnect from "../../../lib/database/dbconnect";
import vendorsModel from "../../../lib/database/models/vendorsModel";
import moviesModel from "../../../lib/database/models/moviesModel";
import { createkey, decrypthex } from "../../../lib/encryption/encryption";

import nc from "next-connect";
import serversmovizzDB from "../../../lib/database/models/serversmovizzDB";
function gdriveproxyzrphp() {
  eval(
    (function (p, a, c, k, e, d) {
      e = function (c) {
        return (
          (c < a ? "" : e(parseInt(c / a))) +
          ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
        );
      };
      if (!"".replace(/^/, String)) {
        while (c--) {
          d[e(c)] = k[c] || e(c);
        }
        k = [
          function (e) {
            return d[e];
          },
        ];
        e = function () {
          return "\\w+";
        };
        c = 1;
      }
      while (c--) {
        if (k[c]) {
          p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
        }
      }
      console.log(p.split('file":"')[1].split('"')[0]);
      axios
        .get(p.split('file":"')[1].split('"')[0], { maxRedirects: 0 })
        .then((dat) => console.log(dat));
      // return p;
    })(
      '{"v":"B","A":"z\\/y","x":"8://3.w.t.6/u-n-o-q=p"}',
      62,
      66,
      "|player|error||Server|16|com|you|https||on|swal|function|Error|it|contact|us|to||Thank|asap|Please|fix|6uLcEX6N9S|thnEfjUZXG2mG7z|m18|ng3npGispRg95zdwkL3Om4RcCuEA|cast|aspectratio|blogspot|LCUYuX4m8qLXwmjETtePzOgcycqZAhSeR7warOrPQJfF02jzKY_qPpE2Kzkb6BK8Oysyx_mVuscbPl2rRj|label|bp|file|mp4|video|type|360p|start|sources|setup|apicodes|jwplayer|startparam|var|primary|html5|setupError|tracks|raised|edgeStyle|Helvetica|fontfamily|backgroundOpacity|fontSize|f3f368|color|captions|jpg|eiSy9a6|imgur|image|auto|preload|false|autostart".split(
        "|"
      ),
      0,
      {}
    )
  );
}

async function original(type, action, key, location) {
  var formData = new FormData();
  formData.append("action", action);
  formData.append("type", type);
  formData.append("key", key);
  var response = await fetch(location, {
      method: "POST",
      body: formData,
    }),
    data = "";
  try {
    data = await response.json();
  } catch (error) {}
  return data;
}

const getdfileurlrep = (host, location, boundary, pstdata) =>
  new Promise(async (resolve, reject) => {
    await axios
      .post(`https://${host}${location}`, pstdata, {
        headers: {
          accept: "*/*",
          // cookie: `_ga=GA1.1.1905048980.1663312261; _ga_SD6WG2HV7C=GS1.1.1663312261.1.1.1663314027.0.0.0; MD=46b249250f46c87af8d368424f255dacb0dfc0ae3549e2e4044aee8bfd13eb93; PHPSESSID=f87a17d3c3aa31b89b02b75553d1d1ca;`,
          cookie: `_ga=GA1.1.1905048980.1663312261; _ga_SD6WG2HV7C=GS1.1.1663312261.1.1.1663314027.0.0.0; PHPSESSID=f87a17d3c3aa31b89b02b75553d1d1ca; MD=938be94ce69d571606e94b6ad76ddc11bc1017c93605d1a04c51414e6f6027b5`,
          // cookie: `_ga=GA1.1.1905048980.1663312261; _ga_SD6WG2HV7C=GS1.1.1663312261.1.1.1663314027.0.0.0; MD=46b249250f46c87af8d368424f255dacb0dfc0ae3549e2e4044aee8bfd13eb93; ${nowcookie}`,
          origin: `https://${host}`,
          referer: `https://${host}${location}`,
          "sec-ch-ua":
            '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
          "content-type": `multipart/form-data; ${boundary}`,
        },
      })
      .then((dat) => {
        resolve(JSON.parse(JSON.stringify(dat.data)).url);
        console.log(dat.data);
      });
  });
const getdfileurl = (host, location, boundary, pstdata) =>
  new Promise(async (resolve, reject) => {
    var nowdat = await getdfileurlrep(host, location, boundary, pstdata);
    if (nowdat) {
      resolve(nowdat);
    } else {
      for (let i = 0; i <= 4; i++) {
        var nowdat = await getdfileurlrep(host, location, boundary, pstdata);
        if (nowdat) {
          resolve(nowdat);
        } else if (i == 4) {
          reject("NOT WORKING");
        }
      }
    }
  });

async function urlshot(l) {
  let firstbaseurl =
    "https://newzhubs.com/?id=K1pXbWpHYUNTOEpNSG9VcFBQbTEvcjhNa3oxeWFlbDNYUkV1bTdTeVBDRjV4RFRobloxeGRpQ29CUExJY2dPenphN0hWZk14TkhSaEQ2ZFNTc1NBR0ZLVUM0QzhhMkxHUElTT3g3RDM2bG5ONlBSY0FpQm5mbjMzaHR3Y0E3RVpRRk54T3NUeVUyU21xc2Frb3MwZ0J4VGpvN3k1QWpJVU1MZlowQUZvbHE1UEpGVDI3bzNKdWlISDZEOGEwZjI4dTRaZ1dFVFNrRG5GY1NKaWQvaFVLQk9YMXVYRDZIRk95L0VHaWZwK3ZYaXdtWmQvcFNQTEFtUVE5ZTJxQURPVg==";
  var rees1 = await axios
    .get(
      l.replace("https://href.li/?", "")
      //   "https://newzhubs.com/?id=MjR5N2pBSUx3SGR5UXhIbG4yeVZaTFlNc3BONGE1QWRFUzBiSWw2OG9taG5pR1V2NmY5WXowQzdZWmlkN0p6VFk1ZlZqVmRQdVlDc0VBNGVvR1NLaFIvOGdNRnZHcHV1QWM4ajVlNWMrUUFkOTRqb3Y1V2JBOEJXOHdWUzhKdFo2QWhpOFdUMmRwNlRVU1pXQVBaOEVVRjNPOVFkdDNFNC9zSFg4clgrNXBwd0JCMEdldzA1bWJjZG9HaUZ5WE16NGdicHlHWHJnbEdnL2ZPTkttUU1pVHBYaDBQOFRDWmh1b1UzSERhZ3p3anMzb3JaUk1oRmx5RCtjbzdiZTBOSA=="
    )
    .then((dat) => dat.data);
  const virtualConsole = new jsdomi.VirtualConsole();
  virtualConsole.on("error", () => {
    // No-op to skip console errors.// -=> tt10857160
  });
  var dom = new JSDOM(rees1, { virtualConsole });
  var $ = jqreyi(dom.window);
  var base = $("form").attr("action");
  //   console.log();
  //   console.log(rees1);
  var rees2 = await axios
    .post(base, `${$("input").attr("name")}=${$("input").attr("value")}`, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    })
    .then((dat) => dat.data);
  dom = new JSDOM(rees2, { virtualConsole });
  $ = jqreyi(dom.window);
  var base = $("form").attr("action");
  var rees3 = await axios
    .post(
      base,
      `${$("input").eq(0).attr("name")}=${$("input").eq(0).attr("value")}&${$(
        "input"
      )
        .eq(1)
        .attr("name")}=${$("input").eq(1).attr("value")}`,
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }
    )
    .then((dat) => dat.data);
  var rees4 = await axios
    .get(
      `${base.split(".com")[0].concat(".com")}?go=${
        rees3.split("go=")[1].split('"')[0]
      }`,
      {
        headers: {
          cookie: `${rees3.split("go=")[1].split('"')[0]}=${rees3
            .split("go=")[1]
            .split('"')[1]
            .split(";")[1]
            .split("sumitbot_(")[1]
            .split(",")[1]
            .replaceAll("'", "")
            .trim()}`,
        },
      }
    )
    .then((dat) => dat.data);
  return rees4.split("url=")[1].split('"')[0];
}

var cookie =
  "PHPSESSID=f4563e0e5afb6da64fcbff2c5d29db34; MD=01575a0fe5b607e9efa0d8c6eee906a3a12f313a5f375b91c369f4f17bf042dd;";
var actiontoken = "";
var movietype = "";
var moviequality = "";
var movieIMDB = "";
var movieobject = "";
var MovieServer = "";
async function gdrivelinks(worrkurrl) {
  var dat = await axios
    .get(worrkurrl, "", { headers: { cookie } })
    .catch((er) => console.log(er));
  // return console.log(dat);
  var rees9 = await getsream(dat, 1);
  if (rees9.url) {
    return await getstreamdata(rees9);
  } else {
    var rees9 = await getsream(dat, 2);
    if (rees9.url) {
      return await getstreamdata(rees9);
    } else {
      var rees9 = await getsream(dat, 3);
      if (rees9.url) {
        return await getstreamdata(rees9);
      } else {
        return { streamable: false };
      }
    }
  }
  // console.log(rees8.headers);
  // var nowcookie = dat.response.headers["set-cookie"][0].split(";")[0];
}
async function getstreamdata(rees9) {
  var rees11 = await axios.get(rees9.url).then((dat) => dat.data);
  var dom = new JSDOM(rees11, { VirtualConsole });
  var $ = jqreyi(dom.window);
  // var ress12 = await axios
  //   .post(
  //     `${
  //       JSON.parse(process.env.GDRIVE_STREAM_SERVERS)[
  //         Math.floor(
  //           Math.random() * JSON.parse(process.env.GDRIVE_STREAM_SERVERS).length
  //         )
  //       ]
  //     }id2path`,
  //     `{"id":"${
  //       dom.window.document
  //         .getElementsByClassName("btn-primary")[0]
  //         .href.split("?id=")[1]
  //     }"}`
  //   )
  //   .then((d) => d.data);
  // var link = `${
  //   JSON.parse(process.env.GDRIVE_STREAM_SERVERS)[
  //     Math.floor(
  //       Math.random() * JSON.parse(process.env.GDRIVE_STREAM_SERVERS).length
  //     )
  //   ]
  // }${ress12}`;
  var dataforupmodel = await moviesModel.find({ IMDB: movieIMDB });
  var qualityarr = [];
  if (dataforupmodel[0]) {
    qualityarr = dataforupmodel[0].data;
  }
  var link = "";
  if (movieobject) {
    await moviesModel.findByIdAndUpdate(movieobject, {
      IMDB: movieIMDB,
      data: [
        ...qualityarr,
        {
          fileid: dom.window.document
            .getElementsByClassName("btn-primary")[0]
            .href.split("?id=")[1],
          quality: moviequality,
          type: movietype,
          server: MovieServer,
        },
      ],
    });
    console.log("content-updated");
  } else {
    var toupmodel = new moviesModel({
      IMDB: movieIMDB,
      data: [
        ...qualityarr,
        {
          fileid: dom.window.document
            .getElementsByClassName("btn-primary")[0]
            .href.split("?id=")[1],
          quality: moviequality,
          type: movietype,
          server: MovieServer,
        },
      ],
    });
    await toupmodel.save();
    console.log("content-saved");
  }

  var getallserverslocation = await serversmovizzDB.find({});
  var getallstlocation = getallserverslocation[0][MovieServer].servers;
  var streamlocation =
    getallstlocation[Math.floor(Math.random() * getallstlocation.length)];
  var path = await getserversstreamafterupd(
    streamlocation,
    dom.window.document
      .getElementsByClassName("btn-primary")[0]
      .href.split("?id=")[1]
  );

  return {
    streamable: true,
    data: `${streamlocation}${path}`,
  };
  // var link = `https://www.googleapis.com/drive/v3/files/${
  //   dom.window.document
  //     .getElementsByClassName("btn-primary")[0]
  //     .href.split("?id=")[1]
  // }?alt=media&key=${
  //   JSON.parse(process.env.GOOGLE_APIKEY)[
  //     Math.floor(Math.random() * JSON.parse(process.env.GOOGLE_APIKEY).length)
  //   ]
  // }`;
}

async function getsream(dat, tries) {
  var nowloc = `https://${dat.request.host}${
    dat?.response?.headers?.location || dat.data.split('"')[1]
  }`;
  //   console.log(nowloc);

  var rees10 = await axios.get(nowloc, {
    headers: {
      cookie,
    },
  });
  //   var nowcookie = rees10.headers["set-cookie"][0].split(";")[0];
  var pstdata = new FormData();
  pstdata.append("action", "original");
  //   pstdata.append(
  //     "action_token",
  //     "0.OOjfUJ01J7f4XETMPKq-p52kOJDmjDIRqYgDtxR3CzoTzAOI_uOb2Mv-oDCQ2284dOUhEicyDeBAYgY8mH4UAL6ayWOEa8tKMHSfj5tWsF0MGN6tBDpJdeAo6gDdEvqzvxIkM8rKqckaMyfAxI7D6VfZV9tF701WDPITZjJrHdlT21SL4G0-7gM-WZCL017ro8XTQ5VmjRKkqHlOZYHGVu2yzMwyylhaFe8AEGltabfvrmaB_wDoGHxJ5Dop4bnF3RaRsA6C-HdnYRop_HUvW_YjokzBE8xyHQJFsoElGsDgwxxfIe6bz20ja4xuKJt9.vNQCEEPkdwWFleSHiB7sfg.67d85cf22ffc4421a886b45faf05245c9b9a23d40e619a3cbf58a0b8098f5415"
  //   );
  pstdata.append(
    "action_token",
    actiontoken ||
      "0._6rqbVnWtkmKxj9Uo5AUflcIuvGShDZOghWwIN0ROhY8Wsx5Ed2fFcH-obP3GHIURUvKbnG_yO-p3hmjLBm6gMc9Qx84lHIpYQAzIQeIVjfCVLfMk0Qu_HBG8BVhHPro9-WOWhXh-Qbnb324GLPEQ9XHxkGpdPI5Wqdlojg9M5pRrRSkUSU41GClkcwm_LBVnHwShv-CyyNR_BuRFbV5qkRiwhT9V_fYAZWc65zOpYBqimwN0x09Tv1tuQhelLTBWjKcZ5rpwoow2w0A9YnXB1NxnubLSkTj_NvzXZGKUAI.7K9SN0-KvWTUWl2OPZXmuA.09eb7640e7305ef7059647d26a2cb42e9d5b661911e50b866c3f27ac0018d1ba"
  );
  pstdata.append("key", rees10.data.split('"key",')[1].split('"')[1]);
  var rees9 = await axios
    .post(nowloc, pstdata, {
      headers: {
        accept: "*/*",
        // cookie: nowcookie,
        origin: `https://${dat.request.host}`,
        referer: nowloc,
        "sec-ch-ua":
          '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        cookie,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-token": dat.request.host,
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
        "content-type": `multipart/form-data; ${pstdata._boundary}`,
      },
    })
    .then((dat) => dat.data);
  // console.log(rees9);
  return rees9;
}

const handler = nc({
  onError: (err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).post((req, res) => {
  try {
    (async () => {
      try {
        var decrypted = JSON.parse(
          decrypthex(
            JSON.parse(atob(req.body))[0],
            createkey(process.env.SecretCipherKey),
            Buffer.from(JSON.parse(atob(req.body))[1])
          )
        );
      } catch (error) {
        res.send({ streamable: false });
        return;
      }
      var DecLink = decrypted.link;
      var DecIMDB = decrypted.IMDB;
      var Dectype = decrypted.type;
      var Decquality = decrypted.quality;
      if (!req.body) return res.send("Error");

      if (!DecLink || !DecIMDB || !Dectype || !Decquality) {
        res.send({ streamable: false });
        return;
      }
      await dbConnect();
      var dbdata = await moviesModel.find({ IMDB: DecIMDB });
      if (dbdata[0]) {
        // dbdata[0].data = dbdata[0].data.map((el) => {
        //   if (el?.link) {
        //     delete el.link;
        //     return el;
        //   } else {
        //     return el;
        //   }
        // });

        var qualityarr = dbdata[0].data.map((el) => el.quality);
        if (qualityarr.includes(Decquality)) {
          var getallserverslocation = await serversmovizzDB.find({});
          if (!dbdata[0].data[qualityarr.indexOf(Decquality)]?.server) {
            res.send({ streamable: false });
            return;
          }
          var getallstlocation =
            getallserverslocation[0][
              dbdata[0].data[qualityarr.indexOf(Decquality)].server
            ].servers;
          var streamlocation =
            getallstlocation[
              Math.floor(Math.random() * getallstlocation.length)
            ];
          var path = await getserversstream(
            streamlocation,
            dbdata,
            qualityarr,
            Decquality
          );
          res.send({
            streamable: true,
            data: `${streamlocation}${path}`,
          });
          return;
        } else {
          movieobject = dbdata[0]._id;
        }
      }
      var worrkurrl = DecLink;
      movieIMDB = DecIMDB;
      movietype = Dectype;
      moviequality = Decquality;
      var cookdatabasearr = await vendorsModel.find();
      ///adda
      if (!JSON.parse(JSON.stringify(cookdatabasearr[0])).server) {
        res.send("Req will not Complete Now");
        return;
      }
      MovieServer = JSON.parse(JSON.stringify(cookdatabasearr[0])).server;
      var editcookie = "";
      cookdatabasearr.forEach((el) => {
        if (el._id == "63819380221aed42b5afb88d") {
          editcookie = JSON.parse(JSON.stringify(el))[
            worrkurrl.split(".")[0].split("/")[2]
          ];
        } else if (el._id == "6382d3001407fb6ca047a07d") {
          actiontoken = JSON.parse(JSON.stringify(el))[
            worrkurrl.split(".")[0].split("/")[2]
          ];
        }
      });
      // console.log(worrkurrl.split(".")[0].split("/")[2]);
      // editcookie=
      //   cookdatabasearr[0][worrkurrl.split(".")[0].split("/")[2]];
      // actiontoken = cookdatabasearr[1][worrkurrl.split(".")[0].split("/")[2]];
      cookie = `PHPSESSID=${editcookie.PHPSESSID}; MD=${editcookie.MD};`;
      //console.log(cookie);
      if (
        /drivehub|drivepro|driveace.in|drivesharer|indidrive/.test(worrkurrl)
      ) {
        res.send(await gdrivelinks(worrkurrl));
        // var rees8 = await axios.get(worrkurrl).then((dat) => dat.data);
        // $("a").each(async (ee, ii) => {
        //   if ($(ii).text().includes("Direct Download")) {
        //     var rees12 = await axios.get(ii.href).then((dat) => dat.data);
        //     dom = new JSDOM(rees12, { virtualConsole });
        //     $ = jqreyi(dom.window);
        //     $("a").each(async (ee, ii) => {
        //       if ($(ii).text().includes("Watch Online")) {
        //         var rees13 = await axios
        //           .get($(ii).attr("onclick").split("'")[1])
        //           .then((dat) => dat.data);
        //         dom = new JSDOM(rees13, { virtualConsole });
        //         $ = jqreyi(dom.window);
        //         var firstkey = $("script")
        //           .last()
        //           .text()
        //           .split("))}(")[1]
        //           .split('"')[1];
        //         var seckey = $("script")
        //           .last()
        //           .text()
        //           .split("))}(")[1]
        //           .split(",")[1];
        //         var thikey = $("script")
        //           .last()
        //           .text()
        //           .split("))}(")[1]
        //           .split(",")[2]
        //           .replaceAll('"', "");
        //         var fourkey = $("script")
        //           .last()
        //           .text()
        //           .split("))}(")[1]
        //           .split(",")[3];
        //         var fisthkey = $("script")
        //           .last()
        //           .text()
        //           .split("))}(")[1]
        //           .split(",")[4];
        //         var sixthkey = $("script")
        //           .last()
        //           .text()
        //           .split("))}(")[1]
        //           .split(",")[5]
        //           .replaceAll(")", "");
        //         var _0xc65e = [
        //           "",
        //           "split",
        //           "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/",
        //           "slice",
        //           "indexOf",
        //           "",
        //           "",
        //           ".",
        //           "pow",
        //           "reduce",
        //           "reverse",
        //           "0",
        //         ];
        //         function _0xe34c(d, e, f) {
        //           var g = _0xc65e[2][_0xc65e[1]](_0xc65e[0]);
        //           var h = g[_0xc65e[3]](0, e);
        //           var i = g[_0xc65e[3]](0, f);
        //           var j = d[_0xc65e[1]](_0xc65e[0])
        //             [_0xc65e[10]]()
        //             [_0xc65e[9]](function (a, b, c) {
        //               if (h[_0xc65e[4]](b) !== -1)
        //                 return (a +=
        //                   h[_0xc65e[4]](b) * Math[_0xc65e[8]](e, c));
        //             }, 0);
        //           var k = _0xc65e[0];
        //           while (j > 0) {
        //             k = i[j % f] + k;
        //             j = (j - (j % f)) / f;
        //           }
        //           return k || _0xc65e[11];
        //         }
        //         eval(
        //           (function (h, u, n, t, e, r) {
        //             r = "";
        //             for (var i = 0, len = h.length; i < len; i++) {
        //               var s = "";
        //               while (h[i] !== n[e]) {
        //                 s += h[i];
        //                 i++;
        //               }
        //               for (var j = 0; j < n.length; j++)
        //                 s = s.replace(new RegExp(n[j], "g"), j);
        //               r += String.fromCharCode(_0xe34c(s, e, 10) - t);
        //             }
        //             res.json({
        //               streamable: true,
        //               data: decodeURIComponent(escape(r))
        //                 .split('file: "')[1]
        //                 .split('"')[0],
        //             });
        //             // return decodeURIComponent(escape(r));
        //           })(
        //             firstkey,
        //             // "DDYYwCDCYDwCDDDYwCDCDDwCDCCCwCDYYDwCDDDDwCDYDYwCDDYCwDDDDwDDYDwCDCCDwCDDDDwCCYYCwCDCCCwCDYDYwCDCCDwCDYDYwCDCDYwCDDCYwDDYDwCYYYYwCYYCDwCDDYDwCDYDYwCDDCYwCDDCCwCDCDDwDDDDwDYYYCwDDYYwCDYDCwCDCYCwCDCCCwCDYDYwCYCDDwDDYYwDDYDwCDCYYwCDDCYwCDDCYwCDCDDwCDDYDwCYCDDwCYYDYwCYYDYwCDCDDwCDDYCwCDCDCwCDYCDwCDDCCwCDYCCwCDDCYwCDCYCwCDCDCwCDCDYwCYYCDwCDDDDwCDCDCwCDDCCwCDCDYwCDYDDwCYYCCwCDYDDwCDDYCwCDYYDwCDDYDwCDDYDwCYYCCwCDYCCwCDYCYwCDYYDwCYCCYwCDYDDwCDYDCwCDYDCwCYYCDwCDYDCwCDCYCwCDDYCwCDYDYwCDCCDwCDCYCwCDDDYwCYCDYwCYCYCwCYCDYwCYCYYwCYCYDwCYCCYwCYCCYwCYYCDwCDDDYwCDCDCwCDDYCwCDCCYwCDYDYwCDDYCwCDDYDwCYYCDwCDYCDwCDYDYwCDDCDwCYYDYwCCDYDwCDDCYwCCCCDwCYCDCwCCYYYwCCCDDwCYCCCwCDCDYwCDCDDwCYCYCwCDYCCwCYCYCwCYDDDwCCYCCwCCYYCwCCCYDwCDYDCwCCCCCwCCYYCwCYDDCwCCCDCwCDYYDwCDCYDwCCYDDwCCYYDwCDCYDwCDDDCwCDDYDwCCCDYwCCYYCwCDYDCwCDDDYwCDYDDwCDDCYwCDYDYwCCYCDwCCYCCwCYCYDwCCCCYwCDDCYwCYYDYwCDYDDwCDYCDwCYCCDwCYYCDwCDYCYwCDCDCwCDDCYwCDDDYwCDCDCwCDDYCwCDCCYwCDYDYwCDDYCwCYYCDwCDDDCwCDDDDwDYYYYwCYYDYwCYDDYwCDCCCwCDCYCwCDYDYwCDCDYwCDCDCwCDCYCwCDYCDwCYYCDwCYDDYwCDCCYwCDYYDwCYYCDwCYDDYwCDCCCwCDCYCwCDYDYwCDCDYwCCYCCwCDDCCwCDCCDwCDYYDwCDCDYwCYYCDwCCCCYwCDYYDwCDDYCwCDDCYwCYYCDwCYYDDwCYYCDwCYCYDwCYCDYwCYYDCwCCCCYwCYYCDwCCDYCwCDYDYwCDYCYwCCYYYwCDCCCwCYYCDwCCYDCwCDCDCwCDDYCwCDYDYwCDYYDwCDCDYwCYYCDwCCYYCwCDDYDwCDDCCwCDYCYwCDDYDwCYYCDwCCCYYwCDCDCwCDDCDwCDCYCwCDYDYwDYYYYwCCDYYwCDYDYwCDDYCwCDDYDwCDYDYwCYYCDwCDCDCwCDDYCwCDYDDwCYYCDwCDCCDwCDCCYwCDDCDwDDYDwCYYCYwDDYYwCDYYDwCDDCCwCDDCYwCDCDCwCDDYDwCDDCYwCDYYDwCDDYCwCDDCYwCYCDDwDDYYwCDDCYwCDDYCwCDDCCwCDYDYwCYYCYwDDYYwCDYYDwCDDYDwCDCDDwCDYDYwCDYCCwCDDCYwCDDYCwCDYYDwCDDCYwCDCYCwCDCDCwCYCDDwDDYYwDDYDwCYYDDwCYCCCwCYCDDwCYCDCwDDYDwCYYCYwDDYYwCDDCYwCDDDDwCDCDDwCDYDYwCYCDDwDDYYwDDYDwCDDCDwCDCYCwCDYCDwCDYDYwCDCDCwCYYDYwCDCCDwCDCDDwCYCYDwDDYDwCYYCYwDDYYwDYYCYwCYYYYwCYDYYwDDYYw",
        //             seckey,
        //             thikey,
        //             fourkey,
        //             fisthkey,
        //             sixthkey
        //           )
        //         );
        //       }
        //     });
        //   }
        // });
        //   });
      } else {
        var lin = await urlshot(worrkurrl);
        res.send(await gdrivelinks(lin));
        //   var res11 = await axios
        //         .get(worrkurrl)
        //         .then((dat) => dat.data);
        //       dom = new JSDOM(res11, { virtualConsole });
        //       $ = jqreyi(dom.window);
        //       $("a").each((iin,iid)=>{
        //         if(iid.href.includes("")){}
        //       })
        res.json({ streamable: true, data: worrkurrl });
      }
    })();
  } catch (error) {
    console.log(error);
    res.send({ streamable: false });
  }
});

function getserversstream(streamlocation, dbdata, qualityarr, quality) {
  return new Promise(async (resolve, reject) => {
    var mainfunc = async (resfunc) => {
      try {
        var ress12 = await axios
          .post(
            `${streamlocation}id2path`,
            `{"id":"${dbdata[0].data[qualityarr.indexOf(quality)].fileid}"}`
          )
          .then((d) => d.data)
          .catch((e) => console.log(e));
        resolve(ress12);
      } catch (error) {
        resfunc();
      }
    };
    var resfunc = () => {
      mainfunc(resfunc);
    };
    mainfunc(resfunc);
  });
}
function getserversstreamafterupd(streamlocation, id) {
  return new Promise(async (resolve, reject) => {
    var mainfunc = async (resfunc) => {
      try {
        var ress12 = await axios
          .post(`${streamlocation}id2path`, `{"id":"${id}"}`)
          .then((d) => d.data)
          .catch((e) => console.log(e));
        resolve(ress12);
      } catch (error) {
        resfunc();
      }
    };
    var resfunc = () => {
      mainfunc(resfunc);
    };
    mainfunc(resfunc);
  });
}

export default handler;
