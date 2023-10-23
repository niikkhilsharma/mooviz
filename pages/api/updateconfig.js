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
  let data = {
    versionName: "4.6",
    versionCode: "12",
    apkUrl:
      "https://drive.google.com/uc?export=download&id=1MrrBVrWaW0pDNr2xE1m9iEgcXBchdJ1f&confirm=t",
    forceUpdate: true,
    whatsNew: "Live Tv, Sports & More Servers",
  };

  let SizeRes = await axios.head(data.apkUrl);

  data.size = parseInt(SizeRes.headers["content-length"] / (1024 * 1024));

  res.send(JSON.stringify(data));
});
export default handler;
