import axios from "axios";
import jsdomi from "jsdom";
const { JSDOM } = jsdomi;
import jqreyi from "jquery";
import FormData from "form-data";
const VirtualConsole = new jsdomi.VirtualConsole();
import nc from "next-connect";
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

const handler = nc({
  onError: (err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get((req, res) => {
  try {
    (async () => {
      ///adda
      let firstbaseurl =
        "https://newzhubs.com/?id=K1pXbWpHYUNTOEpNSG9VcFBQbTEvcjhNa3oxeWFlbDNYUkV1bTdTeVBDRjV4RFRobloxeGRpQ29CUExJY2dPenphN0hWZk14TkhSaEQ2ZFNTc1NBR0ZLVUM0QzhhMkxHUElTT3g3RDM2bG5ONlBSY0FpQm5mbjMzaHR3Y0E3RVpRRk54T3NUeVUyU21xc2Frb3MwZ0J4VGpvN3k1QWpJVU1MZlowQUZvbHE1UEpGVDI3bzNKdWlISDZEOGEwZjI4dTRaZ1dFVFNrRG5GY1NKaWQvaFVLQk9YMXVYRDZIRk95L0VHaWZwK3ZYaXdtWmQvcFNQTEFtUVE5ZTJxQURPVg==";
      var rees1 = await axios
        .get(
          req.query.l.replace("https://href.li/?", "")
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
          `${$("input").eq(0).attr("name")}=${$("input")
            .eq(0)
            .attr("value")}&${$("input").eq(1).attr("name")}=${$("input")
            .eq(1)
            .attr("value")}`,
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
      var worrkurrl = rees4.split("url=")[1].split('"')[0];
      if (
        worrkurrl.includes("raninfoapi") ||
        worrkurrl.includes("mverseplay")
      ) {
        console.log(worrkurrl);
        var rees5 = await axios.get(worrkurrl).then((dat) => dat.data);
        dom = new JSDOM(rees5, { virtualConsole });
        if (!dom.window.document.querySelector("#videoautoplay")?.src) {
          console.log("VIDEO NOT AVAILABLE");
          res.json({ streamable: false });
          await new Promise((resolve, reject) => {});
        }
        var rees6 = await axios
          .get(dom.window.document.querySelector("#videoautoplay").src)
          .then((dat) => dat.data);
        dom = new JSDOM(rees6, { virtualConsole });
        $ = jqreyi(dom.window);
        const finalencdata = String(
          String(
            "[{" +
              $("script")
                .last()
                .text()
                .trim()
                .split(`[{`)[1]
                .split("}]")[0]
                .concat("}]")
          )
        );
        const finalenckey1type = $("script").last().text().trim().split(`,`)[
          $("script").last().text().trim().split(`,`).length - 3
        ];
        const finalenckey2type = $("script").last().text().trim().split(`,`)[
          $("script").last().text().trim().split(`,`).length - 2
        ];

        const finalenckey = $("script")
          .last()
          .text()
          .trim()
          .split(`,`)
          [$("script").last().text().trim().split(`,`).length - 1].split(
            ".split"
          )[0]
          .replaceAll("'", "");
        var nowkk = finalenckey.split("|");
        eval(
          (function (p, a, c, k, e, d) {
            while (c--)
              if (k[c]) {
                p = p.replace(
                  new RegExp("\\b" + c.toString(a) + "\\b", "g"),
                  k[c]
                );
              }
            res.json({
              streamable: true,
              data: p.split('file:"')[1].split('"')[0],
            });
            // console.log(p.split('file:"')[1].split('"')[0]);
            return p;
          })(finalencdata, finalenckey1type, finalenckey2type, nowkk)
        );
      } else if (worrkurrl.includes("gdrivepro.xyz/r.php")) {
        var rees8 = await axios.get(worrkurrl).then((dat) => dat.data);
        dom = new JSDOM(rees8, { virtualConsole });
        $ = jqreyi(dom.window);
        res.json({
          streamable: true,
          data: $("form").children("a").attr("href"),
        });
        // console.log($("form").children("a").attr("href"));
      } else if (worrkurrl.includes("gdrivepro.xyz/view")) {
        var rees8 = await axios
          .post(worrkurrl, "download=", {
            headers: {
              referer: worrkurrl,
              "Content-Type": "application/x-www-form-urlencoded",
              Origin: "https://gdrivepro.xyz",
            },
            maxRedirects: 0,
          })
          .then((dat) => dat)
          .catch((dat) =>
            res.json({ streamable: true, data: dat.response.headers.location })
          );
      } else if (
        worrkurrl.includes("driveace.in") ||
        worrkurrl.includes("drivesharer")
      ) {
        // var rees8 = await axios.get(worrkurrl).then((dat) => dat.data);
        axios
          .post(worrkurrl, "", {
            maxRedirects: 0,
          })
          .then((dat) => console.log(dat))
          .catch(async (dat) => {
            // console.log(rees8.headers);
            // var nowcookie = dat.response.headers["set-cookie"][0].split(";")[0];
            var nowloc = `https://${dat.request.host}${dat.response.headers.location}`;
            var rees10 = await axios.get(nowloc);
            var nowcookie = rees10.headers["set-cookie"][0].split(";")[0];
            var pstdata = new FormData();
            pstdata.append("action", "direct");
            pstdata.append("type", 1);
            pstdata.append("key", rees10.data.split('"key",')[1].split('"')[1]);
            var rees9 = await axios
              .post(nowloc, pstdata, {
                headers: {
                  accept: "*/*",
                  cookie: nowcookie,
                  origin: `https://${dat.request.host}`,
                  referer: nowloc,
                  "sec-ch-ua":
                    '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": '"Windows"',
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
                  "content-type": `multipart/form-data; ${pstdata._boundary}`,
                },
              })
              .then((dat) => dat.data);
            var rees11 = await axios
              .get(JSON.parse(JSON.stringify(rees9)).url)
              .then((dat) => dat.data);
            dom = new JSDOM(rees11, { virtualConsole });
            $ = jqreyi(dom.window);
            $("a").each(async (ee, ii) => {
              if ($(ii).text().includes("Direct Download")) {
                var rees12 = await axios.get(ii.href).then((dat) => dat.data);
                dom = new JSDOM(rees12, { virtualConsole });
                $ = jqreyi(dom.window);
                $("a").each(async (ee, ii) => {
                  if ($(ii).text().includes("Watch Online")) {
                    var rees13 = await axios
                      .get($(ii).attr("onclick").split("'")[1])
                      .then((dat) => dat.data);
                    dom = new JSDOM(rees13, { virtualConsole });
                    $ = jqreyi(dom.window);
                    var firstkey = $("script")
                      .last()
                      .text()
                      .split("))}(")[1]
                      .split('"')[1];
                    var seckey = $("script")
                      .last()
                      .text()
                      .split("))}(")[1]
                      .split(",")[1];
                    var thikey = $("script")
                      .last()
                      .text()
                      .split("))}(")[1]
                      .split(",")[2]
                      .replaceAll('"', "");
                    var fourkey = $("script")
                      .last()
                      .text()
                      .split("))}(")[1]
                      .split(",")[3];
                    var fisthkey = $("script")
                      .last()
                      .text()
                      .split("))}(")[1]
                      .split(",")[4];
                    var sixthkey = $("script")
                      .last()
                      .text()
                      .split("))}(")[1]
                      .split(",")[5]
                      .replaceAll(")", "");

                    var _0xc65e = [
                      "",
                      "split",
                      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/",
                      "slice",
                      "indexOf",
                      "",
                      "",
                      ".",
                      "pow",
                      "reduce",
                      "reverse",
                      "0",
                    ];
                    function _0xe34c(d, e, f) {
                      var g = _0xc65e[2][_0xc65e[1]](_0xc65e[0]);
                      var h = g[_0xc65e[3]](0, e);
                      var i = g[_0xc65e[3]](0, f);
                      var j = d[_0xc65e[1]](_0xc65e[0])
                        [_0xc65e[10]]()
                        [_0xc65e[9]](function (a, b, c) {
                          if (h[_0xc65e[4]](b) !== -1)
                            return (a +=
                              h[_0xc65e[4]](b) * Math[_0xc65e[8]](e, c));
                        }, 0);
                      var k = _0xc65e[0];
                      while (j > 0) {
                        k = i[j % f] + k;
                        j = (j - (j % f)) / f;
                      }
                      return k || _0xc65e[11];
                    }
                    eval(
                      (function (h, u, n, t, e, r) {
                        r = "";
                        for (var i = 0, len = h.length; i < len; i++) {
                          var s = "";
                          while (h[i] !== n[e]) {
                            s += h[i];
                            i++;
                          }
                          for (var j = 0; j < n.length; j++)
                            s = s.replace(new RegExp(n[j], "g"), j);
                          r += String.fromCharCode(_0xe34c(s, e, 10) - t);
                        }
                        res.json({
                          streamable: true,
                          data: decodeURIComponent(escape(r))
                            .split('file: "')[1]
                            .split('"')[0],
                        });
                        // return decodeURIComponent(escape(r));
                      })(
                        firstkey,
                        // "DDYYwCDCYDwCDDDYwCDCDDwCDCCCwCDYYDwCDDDDwCDYDYwCDDYCwDDDDwDDYDwCDCCDwCDDDDwCCYYCwCDCCCwCDYDYwCDCCDwCDYDYwCDCDYwCDDCYwDDYDwCYYYYwCYYCDwCDDYDwCDYDYwCDDCYwCDDCCwCDCDDwDDDDwDYYYCwDDYYwCDYDCwCDCYCwCDCCCwCDYDYwCYCDDwDDYYwDDYDwCDCYYwCDDCYwCDDCYwCDCDDwCDDYDwCYCDDwCYYDYwCYYDYwCDCDDwCDDYCwCDCDCwCDYCDwCDDCCwCDYCCwCDDCYwCDCYCwCDCDCwCDCDYwCYYCDwCDDDDwCDCDCwCDDCCwCDCDYwCDYDDwCYYCCwCDYDDwCDDYCwCDYYDwCDDYDwCDDYDwCYYCCwCDYCCwCDYCYwCDYYDwCYCCYwCDYDDwCDYDCwCDYDCwCYYCDwCDYDCwCDCYCwCDDYCwCDYDYwCDCCDwCDCYCwCDDDYwCYCDYwCYCYCwCYCDYwCYCYYwCYCYDwCYCCYwCYCCYwCYYCDwCDDDYwCDCDCwCDDYCwCDCCYwCDYDYwCDDYCwCDDYDwCYYCDwCDYCDwCDYDYwCDDCDwCYYDYwCCDYDwCDDCYwCCCCDwCYCDCwCCYYYwCCCDDwCYCCCwCDCDYwCDCDDwCYCYCwCDYCCwCYCYCwCYDDDwCCYCCwCCYYCwCCCYDwCDYDCwCCCCCwCCYYCwCYDDCwCCCDCwCDYYDwCDCYDwCCYDDwCCYYDwCDCYDwCDDDCwCDDYDwCCCDYwCCYYCwCDYDCwCDDDYwCDYDDwCDDCYwCDYDYwCCYCDwCCYCCwCYCYDwCCCCYwCDDCYwCYYDYwCDYDDwCDYCDwCYCCDwCYYCDwCDYCYwCDCDCwCDDCYwCDDDYwCDCDCwCDDYCwCDCCYwCDYDYwCDDYCwCYYCDwCDDDCwCDDDDwDYYYYwCYYDYwCYDDYwCDCCCwCDCYCwCDYDYwCDCDYwCDCDCwCDCYCwCDYCDwCYYCDwCYDDYwCDCCYwCDYYDwCYYCDwCYDDYwCDCCCwCDCYCwCDYDYwCDCDYwCCYCCwCDDCCwCDCCDwCDYYDwCDCDYwCYYCDwCCCCYwCDYYDwCDDYCwCDDCYwCYYCDwCYYDDwCYYCDwCYCYDwCYCDYwCYYDCwCCCCYwCYYCDwCCDYCwCDYDYwCDYCYwCCYYYwCDCCCwCYYCDwCCYDCwCDCDCwCDDYCwCDYDYwCDYYDwCDCDYwCYYCDwCCYYCwCDDYDwCDDCCwCDYCYwCDDYDwCYYCDwCCCYYwCDCDCwCDDCDwCDCYCwCDYDYwDYYYYwCCDYYwCDYDYwCDDYCwCDDYDwCDYDYwCYYCDwCDCDCwCDDYCwCDYDDwCYYCDwCDCCDwCDCCYwCDDCDwDDYDwCYYCYwDDYYwCDYYDwCDDCCwCDDCYwCDCDCwCDDYDwCDDCYwCDYYDwCDDYCwCDDCYwCYCDDwDDYYwCDDCYwCDDYCwCDDCCwCDYDYwCYYCYwDDYYwCDYYDwCDDYDwCDCDDwCDYDYwCDYCCwCDDCYwCDDYCwCDYYDwCDDCYwCDCYCwCDCDCwCYCDDwDDYYwDDYDwCYYDDwCYCCCwCYCDDwCYCDCwDDYDwCYYCYwDDYYwCDDCYwCDDDDwCDCDDwCDYDYwCYCDDwDDYYwDDYDwCDDCDwCDCYCwCDYCDwCDYDYwCDCDCwCYYDYwCDCCDwCDCDDwCYCYDwDDYDwCYYCYwDDYYwDYYCYwCYYYYwCYDYYwDDYYw",
                        seckey,
                        thikey,
                        fourkey,
                        fisthkey,
                        sixthkey
                      )
                    );
                  }
                });
              }
            });
          });
      } else if (worrkurrl.includes("indidrive.in")) {
        console.log(worrkurrl);
        // var rees8 = await axios.get(worrkurrl).then((dat) => dat.data);
        axios
          .post(worrkurrl, "", {
            headers: {
              cookie:
                "_ga=GA1.1.1905048980.1663312261; _ga_SD6WG2HV7C=GS1.1.1663312261.1.1.1663314027.0.0.0; PHPSESSID=f87a17d3c3aa31b89b02b75553d1d1ca; MD=938be94ce69d571606e94b6ad76ddc11bc1017c93605d1a04c51414e6f6027b5",
            },
            maxRedirects: 0,
          })
          .then((dat) => console.log(dat))
          .catch(async (dat) => {
            // console.log(rees8.headers);
            // var nowcookie = dat.response.headers["set-cookie"][0].split(";")[0];
            var nowloc = `https://${dat.request.host}${dat.response.headers.location}`;

            var rees10 = await axios.get(
              `https://${dat.request.host}${dat.response.headers.location}`,
              {
                headers: {
                  cookie: `_ga=GA1.1.1905048980.1663312261; _ga_SD6WG2HV7C=GS1.1.1663312261.1.1.1663314027.0.0.0; PHPSESSID=f87a17d3c3aa31b89b02b75553d1d1ca; MD=938be94ce69d571606e94b6ad76ddc11bc1017c93605d1a04c51414e6f6027b5`,
                },
              }
            );
            // console.log(rees10.data.split('"key",')[1].split('"')[1]);
            if (!rees10.data.split('"key",')[1]?.split('"')[1]) {
              console.log("VIDEO NOT AVAILABLE");
              res.json({ streamable: false });
              await new Promise((resolve, reject) => {});
            }
            var ppsdata = () => {
              var pstdataad = new FormData();
              pstdataad.append("action", "original");
              pstdataad.append("type", 1);
              pstdataad.append(
                "key",
                rees10.data.split('"key",')[1].split('"')[1]
              );
              return pstdataad;
            };
            var pstdata = await ppsdata();
            // console.log(pstdata);

            // .then((dat) => dat.data);
            // console.log(rees9);
            var nowurlforfor = await getdfileurl(
              dat.request.host,
              dat.response.headers.location,
              pstdata._boundary,
              pstdata
            );
            setInterval(() => {}, 100);
            if (!nowurlforfor) {
              var nowurlforfor = await getdfileurl(
                dat.request.host,
                dat.response.headers.location,
                pstdata._boundary,
                pstdata
              );
            }
            console.log(nowurlforfor);
            // console.log(JSON.parse(JSON.stringify(rees9.data)));
            var res11 = await axios.get(nowurlforfor).then((dat) => dat.data);
            dom = new JSDOM(res11, { virtualConsole });
            $ = jqreyi(dom.window);
            $("a").each(async (ii, dd) => {
              if ($(dd).text().toUpperCase().includes("GDRIVE")) {
                console.log(dd.href);
                console.log(
                  `https://drive.google.com/u/4/uc?id=${
                    dd.href.split("id=")[1]
                  }&export=download&confirm=t&uuid=517326a5-effa-438f-ac80-4c9f0a78fddc`
                );
                await axios
                  .get(
                    `https://drive.google.com/u/4/uc?id=${
                      dd.href.split("id=")[1]
                    }&export=download&confirm=t&uuid=517326a5-effa-438f-ac80-4c9f0a78fddc`,
                    { maxRedirects: 0 }
                  )
                  .then((dat) => dat)
                  .catch(async (dat) => {
                    if (!dat.response?.headers?.location) {
                      console.log(
                        "Not Able To Get docs.googleusercontent.com Link Delivering File Streaming Link"
                      );
                      res.json(
                        res.json({
                          streamable: true,
                          data: `https://drive.google.com/u/4/uc?id=${
                            dd.href.split("id=")[1]
                          }&export=download&confirm=t&uuid=517326a5-effa-438f-ac80-4c9f0a78fddc`,
                        })
                      );
                      await new Promise((resolve, reject) => {});
                    }
                    await axios
                      .get(dat.response.headers.location, { maxRedirects: 0 })
                      .then((dat1) => dat1)
                      .catch(async (dat1) => {
                        res.json({
                          streamable: true,
                          data: [
                            `https://drive.google.com/u/4/uc?id=${
                              dd.href.split("id=")[1]
                            }&export=download&confirm=t&uuid=517326a5-effa-438f-ac80-4c9f0a78fddc`,
                            dat1.response.headers.location,
                          ],
                        });
                        //   console.log();
                      });
                  });
              }
            });
            // console.log(res11);
            // var rees11 = await axios
            //   .get(JSON.parse(JSON.stringify(rees9)).url)
            //   .then((dat) => dat.data);
          });
      } else {
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
    // console.log(error);
    const dat = `
            <style type='text/css'>
          @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&family=Roboto:wght@100;300&display=swap");
          :root {
              --button: #b3b3b3;
              --button-color: #0a0a0a;
              --shadow: #000;
              --bg: #737373;
              --header: #7a7a7a;
              --color: #fafafa;
              --lit-header: #e6e6e6;
              --speed: 2s;
          }
      
          * {
              box-sizing: border-box;
              transform-style: preserve-3d;
          }
      
          @property --swing-x {
              initial-value: 0;
              inherits: false;
              syntax: '<integer>';
          }
      
          @property --swing-y {
              initial-value: 0;
              inherits: false;
              syntax: '<integer>';
          }
      
          body {
              min-height: 100vh;
              display: flex;
              font-family: 'Roboto', sans-serif;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background: black;
              color: var(--color);
              perspective: 1200px;
          }
      
          a {
              text-transform: uppercase;
              text-decoration: none;
              background: var(--button);
              color: var(--button-color);
              padding: 1rem 4rem;
              border-radius: 4rem;
              font-size: 0.875rem;
              letter-spacing: 0.05rem;
          }
      
          p {
              font-weight: 100;
          }
      
          h1 {
              -webkit-animation: swing var(--speed) infinite alternate ease-in-out;
              animation: swing var(--speed) infinite alternate ease-in-out;
              font-size: clamp(5rem, 40vmin, 20rem);
              font-family: 'Open Sans', sans-serif;
              margin: 0;
              margin-bottom: 1rem;
              letter-spacing: 1rem;
              transform: translate3d(0, 0, 0vmin);
              --x: calc(50% + (var(--swing-x) * 0.5) * 1%);
              background: radial-gradient(var(--lit-header), var(--header) 45%) var(--x) 100%/200% 200%;
              -webkit-background-clip: text;
              color: transparent;
          }
      
          h1:after {
              -webkit-animation: swing var(--speed) infinite alternate ease-in-out;
              animation: swing var(--speed) infinite alternate ease-in-out;
              content: "404";
              position: absolute;
              top: 0;
              left: 0;
              color: var(--shadow);
              filter: blur(1.5vmin);
              transform: scale(1.05) translate3d(0, 12%, -10vmin) translate(calc((var(--swing-x, 0) * 0.05) * 1%), calc((var(--swing-y) * 0.05) * 1%));
          }
      
          .cloak {
              animation: swing var(--speed) infinite alternate-reverse ease-in-out;
              height: 100%;
              width: 100%;
              transform-origin: 50% 30%;
              transform: rotate(calc(var(--swing-x) * -0.25deg));
              background: radial-gradient(40% 40% at 50% 42%, transparent, #000 35%);
          }
      
          .cloak__wrapper {
              position: fixed;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              overflow: hidden;
          }
      
          .cloak__container {
              height: 250vmax;
              width: 250vmax;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
          }
      
          .info {
              text-align: center;
              line-height: 1.5;
              max-width: clamp(16rem, 90vmin, 25rem);
          }
      
          .info>p {
              margin-bottom: 3rem;
          }
      
          @-webkit-keyframes swing {
              0% {
                  --swing-x: -100;
                  --swing-y: -100;
              }
      
              50% {
                  --swing-y: 0;
              }
      
              100% {
                  --swing-y: -100;
                  --swing-x: 100;
              }
          }
      
          @keyframes swing {
              0% {
                  --swing-x: -100;
                  --swing-y: -100;
              }
      
              50% {
                  --swing-y: 0;
              }
      
              100% {
                  --swing-y: -100;
                  --swing-x: 100;
              }
          }
      </style>
            <h1>404</h1>
            <div class="cloak__wrapper">
              <div class="cloak__container">
                <div class="cloak"></div>
              </div>
            </div>
            <div class="info">
              <h2>We can't find that page</h2>
              <p>We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's behalf.</p><a href="/" rel="noreferrer noopener">Home</a>
            </div>`;
    res.send({ streamable: false });
  }
});

export default handler;
