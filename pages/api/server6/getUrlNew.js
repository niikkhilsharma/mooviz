const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jquery = require("jquery");
const virtualConsole = new jsdom.VirtualConsole();
var cloudscraper = require("cloudscraper");
virtualConsole.on("error", () => {
  // No-op to skip console errors.
});
import serversmovizzDB from "../../../lib/database/models/serversmovizzDB";
import { decrypthex } from "../../../lib/encryption/encryption";
import { createkey } from "../../../lib/encryption/encryption";
import { encrypthex } from "../../../lib/encryption/encryption";

import nc from "next-connect";
import dbConnect from "../../../lib/database/dbconnect";
import moviesModel from "../../../lib/database/models/moviesModel";
import verifyToken from "../../../lib/jsonWebToken/verifytoken";
import verifyAuth from "../../../lib/socket/socketAuth";

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
        //   await dbConnect();
        try {
          var decrypted = JSON.parse(
            decrypthex(
              JSON.parse(atob(req.body))[0],
              Buffer.from(JSON.parse(atob(req.body))[1]),
              createkey(process.env.SecretCipherKey)
            )
          );
        } catch (error) {
          console.log(error);
          res.send({ streamable: false, accepted: false });
          return;
        }
        const link = decrypted.link;
        let Response = await getQuality(link);

        if (Response) {
          res.send({
            streamable: true,
            accepted: false,
            data: btoa(
              JSON.stringify(
                encrypthex(
                  JSON.stringify({
                    quality: decrypted.quality,
                    link: Response,
                    type: decrypted.type,
                    IMDB: decrypted.IMDB,
                  }),
                  createkey(process.env.SecretCipherKey)
                )
              )
            ),
          });
        } else {
          res.send({ streamable: false, accepted: false });
        }
      })();
    } catch (error) {
      res.send({ streamable: false, accepted: false });
    }
  });

export default handler;

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
        console.log(ress12);
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

function getallresponse(link) {
  return new Promise(async (resolve, reject) => {
    async function mainfunc(resfunc) {
      try {
        var options = {
          uri: link,
          headers: {
            "User-Agent":
              "Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36",
            Accept:
              "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5",
          },
        };
        let data = await cloudscraper(options);
        resolve(data);
      } catch (error) {
        resfunc();
      }
    }
    function resfunc() {
      mainfunc(resfunc);
    }
    mainfunc(resfunc);
  });
}

async function getQuality(link) {
  try {
    var data = await getallresponse(link);
    const dom = new JSDOM(data, { virtualConsole });
    const $ = jquery(dom.window);

    let gLink = $(".maxbutton-fast-server-gdrive").attr("href");

    if (typeof gLink != "undefined") {
      return gLink;
    }
  } catch (e) {
    console.log(e);
  }
}

async function getUrl(link) {
  let Response;

  try {
    let { data } = await axios.get(link);
    const dom = new JSDOM(data, { virtualConsole });
    const $ = jquery(dom.window);

    let gLink = $(".maxbutton-fast-server-gdrive").attr("href");

    if (typeof gLink != "undefined") {
      Response = gLink;
    }
  } catch (e) {
    console.log(e);
  }

  // let Response = await getQuality(link);

  if (Response) {
    return { streamable: true, data: Response };
  } else {
    return { streamable: false };
  }
}
