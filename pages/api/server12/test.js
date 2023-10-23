import nc from "next-connect";

//AXIOS
var axios = require("axios");

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get(async (req, res) => {
  try {
    // const { id } = req.query;

    fetch(
      "https://recapiv3-jio.voot.com/voot/v1/voot-web/watchnow?id=2114133&responseType=common",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          accesstoken: "dummy",
          "content-version": "V5",
          "save-data": "on",
          "sec-ch-ua":
            '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          usertype: "avod",
        },
        // referrer: "https://www.voot.com/",
        // referrerPolicy: "strict-origin-when-cross-origin",
        // body: null,
        // method: "GET",
        // mode: "cors",
        // credentials: "omit",
      }
    ).then(async (d) => {
      let data = await d.json();
      console.log(data);
      res.send(data);
    });
  } catch (error) {
    console.log(error);
    const dat = `<></>`;
    res.send(dat);
  }
});

export default handler;
