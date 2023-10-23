import nc from "next-connect";
const axios = require("axios");
var jsdomi = require("jsdom");
const { JSDOM } = jsdomi;
const jqreyi = require("jquery");
const virtualConsole = new jsdomi.VirtualConsole();
virtualConsole.on("error", () => {
  // No-op to skip console errors.
});

const getmainurldat = (url) =>
  new Promise(async (resolve, reject) => {
    const axres = await axios.get(url);
    var dom = new JSDOM(axres.data);
    var $ = jqreyi(dom.window);
    var alldatofform = new Object();
    $("form")
      .children("input")
      .each((iin, dat) => {
        alldatofform[$(dat).attr("name")] = $(dat).attr("value");
      });
    resolve({ data: alldatofform, cookie: axres.headers["set-cookie"][0] });
  });

const getmainencdat = (obj, cookie) =>
  new Promise(async (resolve, reject) => {
    var axres = await axios.post(
      obj["post_location"],
      `_wpnonce=${obj["_wpnonce"]}&_wp_http_referer=%2F&userid=${obj["userid"]}`,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          cookie,
        },
      }
    );
    var dom = new JSDOM(axres.data);
    var $ = jqreyi(dom.window);
    $("script[type='text/javascript']").each((iin, dat) => {
      if ($(dat).text().includes("var _0x")) {
        var allincar = $(dat).text().split('"');
        var nowaarr = new Array();
        var keytosear;
        allincar.forEach((el, innds) => {
          try {
            var dec = atob(el);
            if (dec.includes("-") && /^[a-zA-Z0-9]+$/.test(dec.split("-")[0])) {
              keytosear = dec.split("-")[0];
            }
          } catch (e) {}
          if (el?.includes("Iye")) {
            if (el.includes("'")) {
              el.split("'").forEach((el2) => {
                if (el2.includes("Iye")) {
                  nowaarr.push(atob(el2.split("").reverse().join("")));
                }
              });
            } else {
              nowaarr.push(atob(el.split("").reverse().join("")));
            }
          }
          if (innds == allincar.length - 1) {
            // console.log(nowaarr);
            nowaarr.forEach((el) => {
              if (el.includes(keytosear)) {
                resolve({
                  cookie,
                  keytosear,
                  key: JSON.parse("{" + el.split("{")[1].split("}")[0] + "}")[
                    keytosear
                  ],
                });
              }
            });
          }
        });
      }
    });
  });

const getencdata = (url) =>
  new Promise(async (resolve, reject) => {
    var nowlink = await getmainurldat(url);
    var nowres = await getmainencdat(nowlink.data, nowlink.cookie);
    resolve({ alldata: { ...nowres, userid: nowlink.data.userid } });
  });
const getmainlink = (url) =>
  new Promise(async (resolve, reject) => {
    var allencfata = await getencdata(url);
    var axios = require("axios");
    var data = `c=&soramode=default&${
      allencfata.alldata.keytosear
    }=${allencfata.alldata.key.replaceAll("=", "%3D")}`;
    var config = {
      method: "post",
      url:
        `${url.split(".com")[0].concat(".com")}/?${
          allencfata.alldata.keytosear
        }=` + allencfata.alldata.userid,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: allencfata.alldata.cookie,
      },
      data: data,
      maxRedirects: 0,
    };
    resolve(config);
    // setTimeout(() => {
    //   axios(config)
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error.response.headers.location || error);
    //     });
    // }, 15000);
  });

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get((req, res) => {
  (async () => {
    try {
      const link = req.query.l;

      try {
        var alldat = await getmainlink(link);
        res.status(202).json(alldat);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      res.status(404).end("Something went wrong");

      console.log(error);
    }
  })();
});

export default handler;
