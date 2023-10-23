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
import cloudscraper from "cloudscraper";
import verifyToken from "../../../lib/jsonWebToken/verifytoken";
import verifyAuth from "../../../lib/socket/socketAuth";

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
      `${"https://" + base.split("/")[2]}/?go=${
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

async function gdrivelinks(worrkurrl) {
  var dat = await axios.get(worrkurrl).catch((er) => console.log(er));
  // return console.log(dat);
  var rees9 = await getsream(dat);
  return rees9;
}

async function getsream(dat) {
  return new Promise(async (resolve) => {
    var nowloc = `https://${dat.request.host}${
      dat?.response?.headers?.location || dat.data.split('"')[1]
    }`;
    try {
      var rees10 = await axios.get(nowloc);
      // var rees9 = await axios.get(nowloc).then((dat) => dat.data);
      // console.log(rees9);
      var DOM = new JSDOM(rees10.data);
      var $ = jqreyi(DOM.window);
      var arr = [];
      $("a")
        .map((ind, txt1) =>
          $(txt1).text().toLowerCase().includes("resume download")
            ? $(txt1).attr("href")
            : ""
        )
        .filter((a, b) => (b != "" ? arr.push(b) : ""));
      var host = "";
      var cook = "";
      var donereq = false;
      var i = 1;
      setInterval(() => {
        i++;
        if (i == 2 && !donereq) {
          resolve({ streamable: false, data: "Error Occured" });
          return { streamable: false, data: "Error Occured" };
        }
      }, 1000);
      var rees10 = await axios.get(arr[0]).catch((e) => console.log(e));
      donereq = true;
      host =
        rees10.request.res.req.protocol + "//" + rees10.request.res.req.host;
      cook = rees10.request.res.headers["set-cookie"][0];
      if (rees10.data.includes("Drive Not Found")) {
        resolve({ streamable: false, data: "Drive Not Found" });
        return { streamable: false, data: "Drive Not Found" };
      }
      if (rees10.data.includes("Storage Quota Exceeded")) {
        resolve({ streamable: false, data: "Storage Quota Exceeded" });
        return { streamable: false, data: "Storage Quota Exceeded" };
      }
      var uri = rees10.data
        .split("fetch(")[1]
        .split("{")[0]
        .replaceAll("'", "")
        .replaceAll(",", "")
        .replaceAll('"', "")
        .trim();
      var token = rees10.data
        .split("token")[1]
        .split(")")[0]
        .replaceAll("'", "")
        .replaceAll(",", "")
        .trim()
        .replaceAll('"', "")
        .trim();
      var form1 = new FormData();
      form1.append("token", token);
      var rees11 = await axios
        .post(host + uri, form1, {
          headers: { cookie: cook },
        })
        .then((d) => d.data);
    } catch (error) {
      console.log(error);
    }
    resolve({ streamable: true, data: rees11.url });
  });
}

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
  .post((req, res) => {
    try {
      (async () => {
        try {
          var decrypted = JSON.parse(
            decrypthex(
              JSON.parse(atob(req.body))[0],
              Buffer.from(JSON.parse(atob(req.body))[1]),
              createkey(process.env.SecretCipherKey)
            )
          );
        } catch (error) {
          res.send({ streamable: false });
          return;
        }
        var DecLink = decrypted.link;
        if (!req.body) return res.send("Error");

        if (!DecLink) {
          res.send({ streamable: false });
          return;
        }
        var worrkurrl = DecLink;
        //   if (
        //     /drivehub|drivepro|driveace.in|drivesharer|indidrive/.test(worrkurrl)
        //   ) {
        if (!worrkurrl.includes("href.li") && !worrkurrl.includes("id=")) {
          res.send(await gdrivelinks(worrkurrl));
        } else {
          var lin = await urlshot(worrkurrl);
          res.send(await gdrivelinks(lin));

          // res.send(await gdrivelinks(lin));
          // res.json({ streamable: true, data: worrkurrl });
        }
      })();
    } catch (error) {
      console.log(error);
      res.send({ streamable: false });
    }
  });

export default handler;
