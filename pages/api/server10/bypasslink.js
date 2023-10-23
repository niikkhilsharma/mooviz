import nc from "next-connect";
//AXIOS
var axios = require("axios");
var FormData = require("form-data");
import cloudscraper from "cloudscraper";
// const Humanoid = require("humanoid-js");
var jsdomi = require("jsdom");
const { JSDOM } = jsdomi;
const jqreyi = require("jquery");
import moviesModel from "../../../lib/database/models/VegaMoviesModel";
import {
  createkey,
  decrypthex,
  encrypthex,
} from "../../../lib/encryption/encryption";
import dbConnect from "../../../lib/database/dbconnect";

// let humanoid = new Humanoid();

function dec(d) {
  return new Buffer(d, "base64").toString("ascii");
}

var gethostname = (link) => {
  return `${link.split(".")[0] + "." + link.split(".")[1].split("/")[0] + "/"}`;
};

var movietype = "";
var moviequality = "";
var movieIMDB = "";
var movieobject = "";

var getstreamurl = async (href) => {
  // console.error("vgmlinkstep-2");
  // console.log(href);
  var options = {
    uri: "https://cors-anywhere-c1ph.onrender.com/" + href,
    headers: {
      origin: null,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
      "Cache-Control": "private",
      Accept:
        "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
      // cf_clearance=8KcZeMhVKNIhkTjYpJSDPuu8qp4obDdDj9JeeCkLEX4-1669396935-0-150; _ga=GA1.2.730927990.1669396941; _gid=GA1.2.1829044070.1669396941; _gat_gtag_UA_158883125_9=1
      cookie:
        "cf_clearance=8KcZeMhVKNIhkTjYpJSDPuu8qp4obDdDj9JeeCkLEX4-1669396935-0-150; _ga=GA1.2.730927990.1669396941; _gid=GA1.2.1829044070.1669396941; _gat_gtag_UA_158883125_9=1",
      // "if-modified-since": "Thu, 17 Nov 2022 19:49:50 GMT",
    },
  };
  var host;
  var data = await cloudscraper(options, (er, res, body) => {
    host = res.request.response.headers["x-final-url"];
    // host = res.request.href;
  }).catch((er) => console.log(er));
  if (host) {
    updateDatabase(host);
  }
  var dom = new JSDOM(data);
  if (dom.window.document.querySelector("input[name='token']")) {
    var token = dom.window.document.querySelector("input[name='token']").value;
    // console.log(host + "?token=" + token);
    var options = {
      uri:
        "https://cors-anywhere-c1ph.onrender.com/" + host + "?token=" + token,
      headers: {
        origin: null,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
        "Cache-Control": "private",
        Accept:
          "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
        // cf_clearance=8KcZeMhVKNIhkTjYpJSDPuu8qp4obDdDj9JeeCkLEX4-1669396935-0-150; _ga=GA1.2.730927990.1669396941; _gid=GA1.2.1829044070.1669396941; _gat_gtag_UA_158883125_9=1
        cookie:
          "cf_clearance=8KcZeMhVKNIhkTjYpJSDPuu8qp4obDdDj9JeeCkLEX4-1669396935-0-150; _ga=GA1.2.730927990.1669396941; _gid=GA1.2.1829044070.1669396941; _gat_gtag_UA_158883125_9=1",
        // "if-modified-since": "Thu, 17 Nov 2022 19:49:50 GMT",
        // cookie: "PHPSESSID=f0022d1a02da7ff0b6cd40ddea2b576f",
      },
    };
  } else {
    // console.log("2-way");
    if (data.includes("The Future of the Universe")) {
      return false;
    }
    var linkk = await bypadminajax(
      data.split("url =")[1].trim().split("'")[1].replaceAll("'", "")
    );
    var options = {
      uri: "https://cors-anywhere-c1ph.onrender.com/" + linkk,
      headers: {
        origin: null,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
        "Cache-Control": "private",
        Accept:
          "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
        // cf_clearance=8KcZeMhVKNIhkTjYpJSDPuu8qp4obDdDj9JeeCkLEX4-1669396935-0-150; _ga=GA1.2.730927990.1669396941; _gid=GA1.2.1829044070.1669396941; _gat_gtag_UA_158883125_9=1
        cookie:
          "cf_clearance=8KcZeMhVKNIhkTjYpJSDPuu8qp4obDdDj9JeeCkLEX4-1669396935-0-150; _ga=GA1.2.730927990.1669396941; _gid=GA1.2.1829044070.1669396941; _gat_gtag_UA_158883125_9=1",
        // "if-modified-since": "Thu, 17 Nov 2022 19:49:50 GMT",
        // cookie: "PHPSESSID=f0022d1a02da7ff0b6cd40ddea2b576f",
      },
    };
  }

  // console.error("vgmlinkstep-3");
  var data = await cloudscraper(options).catch((er) => console.log(er));
  return data.split("url =")[1].trim().split("'")[1].replaceAll("'", "");
};

var bypvgmlink = async (url) => {
  // console.error("vgmlinkstep-1");
  var options = {
    uri: "https://cors-anywhere-c1ph.onrender.com/" + url,
    headers: {
      origin: null,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
      "Cache-Control": "private",
      Accept:
        "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
      // cf_clearance=8KcZeMhVKNIhkTjYpJSDPuu8qp4obDdDj9JeeCkLEX4-1669396935-0-150; _ga=GA1.2.730927990.1669396941; _gid=GA1.2.1829044070.1669396941; _gat_gtag_UA_158883125_9=1
      cookie:
        "cf_clearance=wtRlcEXUaXAIhXgqyDHF_FFxrJjpJaPObC7sddQmS1A-1669403338-0-150; _ga=GA1.2.730927990.1669396941; _gid=GA1.2.1829044070.1669396941; _gat_gtag_UA_158883125_9=1",
      // "if-modified-since": "Thu, 17 Nov 2022 19:49:50 GMT",
    },
  };
  var data = await cloudscraper(options).catch((er) => console.log(er));
  var dom = new JSDOM(data);
  var $ = jqreyi(dom.window);
  var href;
  [].forEach.call(dom.window.document.querySelectorAll("a"), (el) =>
    $(el).text().toLowerCase().includes("v-cloud") ? (href = el.href) : ""
  );
  return await getstreamurl(href);
};

var bypassl2 = async (pdata) => {
  var host = pdata[1];
  var allpdata = pdata[0];
  var url = "https://" + host;
  var nowform = new FormData();
  nowform.append("token", allpdata.token);
  nowform.append("id", allpdata.id);
  nowform.append("time", allpdata.time + 15000);
  nowform.append("post", allpdata.post);
  nowform.append("redirect", allpdata.redirect);
  nowform.append("cacha", "");
  nowform.append("new", JSON.stringify(allpdata.new));
  nowform.append("action", allpdata.action);
  try {
    var dat = await axios
      .post(url + "/wp-admin/admin-ajax.php", nowform, { maxRedirects: 0 })
      .then((d) => d.data);
    console.log(dat);
    console.log(dat.data);
  } catch (error) {
    return error.request.res.headers.location;
    // return await bypvgmlink(error.request.res.headers.location);
  }
};

var bypassl1 = async (link) => {
  var datatoparseing = await axios.get(link, { maxRedirects: 10 });
  // console.log(datatoparseing);

  var aallparts = datatoparseing.data
    .split("ck(")
    .map((el) => {
      if (el.includes("_wp_http_")) {
        return el.split(",")[1].replaceAll("'", "");
      }
    })
    .filter((e) => (e ? true : false))
    .join();
  var decryptedtext = dec(dec(aallparts));
  var decodedtxt = decryptedtext.replace(/[a-zA-Z]/g, function (_0x19ac91) {
    return String.fromCharCode(
      (_0x19ac91 <= "Z" ? 0x5a : 0x7a) >=
        (_0x19ac91 = _0x19ac91.charCodeAt(0x0) + 0xd)
        ? _0x19ac91
        : _0x19ac91 - 0x1a
    );
  });
  var parshedtxt = JSON.parse(dec(decodedtxt));
  var lastdectxt = btoa(parshedtxt.data);
  var url =
    datatoparseing.request.res.req.protocol +
    "//" +
    datatoparseing.request.res.req.host;
  var hosturlofmetatag = decodeURIComponent(
    datatoparseing.data
      .split("<meta")
      .filter((e) => (e.includes("refresh") ? true : false))[0]
      .split("url=")[1]
      .split("&")[0]
  );
  var hostofmetatag =
    hosturlofmetatag.split("/")[0] + "//" + hosturlofmetatag.split("/")[2];
  var fullurl = hostofmetatag + "/?re=" + lastdectxt;
  console.log(fullurl);
  var i = 0;
  var inteval = setInterval(() => {
    i++;
    console.log(i);
  }, 1000);
  async function recurse(fullurl) {
    return new Promise((resolve) => {
      recursive1(fullurl);
      async function recursive1(fullurl) {
        var axres = await axios.get(fullurl);
        if (axres.data.includes("Invalid Request")) {
          recursive1(fullurl);
        } else {
          clearInterval(inteval);
          resolve(
            atob(axres.data.split("atob(")[1].split('"')[1]).replace(
              "https://href.li/?",
              ""
            )
          );
          // stop calling recurse()
        }
      }
    });
  }

  var resolveddata = await recurse(fullurl);
  console.log(resolveddata);

  // var datatoparse = datatoparseing.data;
  // var parseddata = JSON.parse(
  //   "{" + datatoparse.split("var item")[1].split("{")[1].split("}")[0] + "}"
  // );
  // parseddata["action"] = datatoparse.split('soralink_z":"')[1].split('",')[0];
  return await bypvgmlink(resolveddata);
  // return await bypassl2([parseddata, datatoparseing.request.res.req.host]);
};
const bypadminajax = async (link) => {
  var datatoparseing = await axios.get(link, { maxRedirects: 10 });
  var datatoparse = datatoparseing.data;
  var parseddata = JSON.parse(
    "{" + datatoparse.split("var item")[1].split("{")[1].split("}")[0] + "}"
  );
  parseddata["action"] = datatoparse.split('soralink_z":"')[1].split('",')[0];
  return await bypassl2([parseddata, datatoparseing.request.res.req.host]);
};

async function recurse(fullurl) {
  return new Promise((resolve) => {
    recursive1(fullurl);
    async function recursive1(fullurl) {
      var options = {
        uri: "https://cors-anywhere-c1ph.onrender.com/" + fullurl,
        headers: {
          origin: null,
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Cache-Control": "private",
          Accept:
            "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
          // cf_clearance=8KcZeMhVKNIhkTjYpJSDPuu8qp4obDdDj9JeeCkLEX4-1669396935-0-150; _ga=GA1.2.730927990.1669396941; _gid=GA1.2.1829044070.1669396941; _gat_gtag_UA_158883125_9=1
          // cookie:
          //   "cf_clearance=wtRlcEXUaXAIhXgqyDHF_FFxrJjpJaPObC7sddQmS1A-1669403338-0-150; _ga=GA1.2.730927990.1669396941; _gid=GA1.2.1829044070.1669396941; _gat_gtag_UA_158883125_9=1",
          // "if-modified-since": "Thu, 17 Nov 2022 19:49:50 GMT",
        },
      };
      var data = await cloudscraper(options).catch((er) => console.log(er));
      // var axres = await axios.get(
      //   ,
      //   { headers: { origin: null } }
      // );
      if (data.includes("Invalid Request")) {
        if (data.includes(":T3")) {
          resolve({ error: true, msg: "Old Request Cannot Be Prossesed." });
        } else {
          recursive1(fullurl);
        }
      } else {
        // clearInterval(inteval);
        resolve(
          atob(data.split("atob(")[1].split('"')[1]).replace(
            "https://href.li/?",
            ""
          )
        );
        // stop calling recurse()
      }
    }
  });
}

const checkdatabase = async (res, link) => {
  await dbConnect();
  var dbdata = await moviesModel.find({ IMDB: movieIMDB });
  if (dbdata[0]) {
    var qualityarr = dbdata[0].data.map((el) => el.quality);
    if (qualityarr.includes(moviequality)) {
      res.send({
        streamable: true,
        data: dbdata[0].data[qualityarr.indexOf(moviequality)].fileid,
      });
      return false;
    } else {
      movieobject = dbdata[0]._id;
      var nowdat = await recurse(link);
      if (nowdat?.error) {
        res.send({ error: true, uri: nowdat });
        return;
      }
      return nowdat;
    }
  } else {
    var nowdat = await recurse(link);
    if (nowdat?.error) {
      res.send({ error: true, uri: nowdat });
      return;
    }
    return nowdat;
  }
};

async function updateDatabase(link1) {
  var dataforupmodel = await moviesModel.find({ IMDB: movieIMDB });
  var qualityarr = [];
  if (dataforupmodel[0]) {
    qualityarr = dataforupmodel[0].data;
  }
  var link = "";
  var qualityarrcheck = dataforupmodel[0]?.data?.map((el) => el.quality);
  if (dataforupmodel[0]?._id) {
    if (!qualityarrcheck.includes(moviequality)) {
      await moviesModel.findByIdAndUpdate(dataforupmodel[0]?._id, {
        IMDB: movieIMDB,
        data: [
          ...qualityarr,
          {
            fileid: link1,
            quality: moviequality,
            type: movietype,
          },
        ],
      });
      // console.log("content-updated");
    }
  } else {
    var toupmodel = new moviesModel({
      IMDB: movieIMDB,
      data: [
        ...qualityarr,
        {
          fileid: link1,
          quality: moviequality,
          type: movietype,
        },
      ],
    });
    await toupmodel.save();
    // console.log("content-saved");
  }
}

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).post(async (req, res) => {
  try {
    var decrypted = JSON.parse(
      decrypthex(
        JSON.parse(atob(req.body))[0],
        Buffer.from(JSON.parse(atob(req.body))[1]),
        createkey(process.env.SecretCipherKey)
      )
    );
    movieIMDB = decrypted.IMDB;
    movietype = decrypted.type;
    moviequality = decrypted.quality;
    var now = new Date();

    // updateDatabase();

    // var databaseResponse = await checkdatabase(res, decrypted.link);
    // if (!databaseResponse) {
    //   return;
    // }
    var nowdat = await recurse(decrypted.link);
    if (nowdat?.error) {
      res.send({
        error: true,
        streamable: false,
        accepted: false,
        uri: nowdat,
      });
      return;
    }
    var nowdat = await bypvgmlink(nowdat);
    // var nowdat = await bypassl1(req.query.l);
    if (!nowdat) {
      res.send({ error: false, streamable: false, accepted: false });
      return;
    }
    var now = new Date() - now;
    res.send({
      error: false,
      accepted: true,
      streamable: true,
      uri: nowdat,
      duration: now,
    });
    // console.error("vgmlinkstep-Sent");
  } catch (error) {
    console.log(error);
    res.send({ error: true, accepted: false, streamable: false });
  }
});
export default handler;
