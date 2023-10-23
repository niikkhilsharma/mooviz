import nc from "next-connect";
const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({
  target:
    "http://scarnet.xyz:8880/play/live.php?mac=00:1A:79:4A:58:60&stream=862742&extension=ts&play_token=kMPrkJD7Mv",

  changeOrigin: true,
  headers: {
    connection: "keep-alive",
  },
  followRedirects: true,
  preserveHeaderKeyCase: true,
  // buffer: true,
});

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
    proxy.web(req, res, {
      timeout: 8000,

      // buffer:true
      // buffer: true,
    });
  } catch (error) {
    console.log(error);
    const dat = `<></>`;
    res.send(dat);
  }
});

export default handler;
