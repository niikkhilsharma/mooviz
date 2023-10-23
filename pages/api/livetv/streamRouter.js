import nc from "next-connect";

var axios = require("axios");

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
      // title, body, data, image
      var { Response, Headers } = await routeStream(
        "https://cdncloudflare.anonymouscdn.cfd/live/mastre2.m3u8"
      );

      //   var {Headers}  =
      for (let header of Object.keys(Headers)) {
        res.setHeader(header, Headers[header]);
      }
      //   console.log(Headers);

      res.status(302).send(Response);
    } catch (error) {
      //   res.setHeader({});
      res.status(404).end("Something went wrong");

      console.log(error);
    }
  })();
});

async function routeStream(url) {
  var options = {
    method: "GET",
    url: "https://red.anonymouscdn.cfd/live.php",
    headers: { Referer: " https://ww1.live4wap.xyz/ " },
  };

  let res = await axios.request(options);
  //   console.log(Object.keys(res));

  return { Response: res.data, Headers: res.headers };
}

export default handler;
