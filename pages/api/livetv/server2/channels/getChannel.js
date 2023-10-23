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
}).post((req, res) => {
  (async () => {
    try {
      let { token, slug } = req.body;

      // let stalkerHost = "http://scarnet.xyz:8880/c/";
      // let stalkerMac = "00:1A:79:4A:58:60";
      // let host = "http://scarnet.xyz:8880";

      let stalkerHost = "http://zulu1778.server4you.net/stalker_portal/c/";
      let stalkerMac = "00:1A:79:4B:B0:C4";
      let host = "http://zulu1778.server4you.net/stalker_portal";

      //   let TokenResp = (
      //     await axios.get(
      //       `${host}/server/load.php?type=stb&action=handshake&token=&JsHttpRequest=1-xml`,
      //       {
      //         headers: {
      //           Cookie: `timezone=GMT; stb*lang=en; mac=${stalkerMac}`,
      //         },
      //       }
      //     )
      //   ).data;

      //   let token = TokenResp.js.token;

      if (!token || token.trim().length <= 0) {
        let TokenResp = (
          await axios.get(
            `${host}/server/load.php?type=stb&action=handshake&token=&JsHttpRequest=1-xml`,
            {
              headers: {
                Cookie: `timezone=GMT; stb*lang=en; mac=${stalkerMac}`,
              },
            }
          )
        ).data;

        token = TokenResp.js.token;
      }

      // token = "23FA548FB86BE69A29CA9D97E9759A38";
      let channelCmd = atob(slug);

      channelCmd = "ffrt http://localhost/ch/18468";

      console.log(channelCmd);

      let TvChannelResp = (
        await axios.get(
          `${host}/server/load.php?type=itv&action=create_link&cmd=${encodeURIComponent(
            channelCmd
          )}&JsHttpRequest=1-xml`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Cookie: `timezone=GMT; stb_lang=en; mac=${stalkerMac}`,
              "X-User-Agent": "Model: MAG250; Link: WiFi",
              "User-Agent": `Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3`,
            },
          }
        )
      ).data;

      console.log(TvChannelResp);

      res.send({
        status: true,
        stream: TvChannelResp.js.cmd.replace("ffmpeg", "").trim(),
      });
    } catch (error) {
      res.send({ status: false });
      //   res.setHeader({});
      console.log(error);
      //   res.status(404).end("Something went wrong");
    }
  })();
});

export default handler;

`GET /stalker_portal/server/load.php?type=itv&action=create_link&cmd=ffrt%20http%3A%2F%2Flocalhost%2Fch%2F12757&JsHttpRequest=1-xml HTTP/1.1
Cookie: timezone=GMT; stb_lang=en; mac=00:1A:79:4B:B0:C4
Referer: http://zulu1778.server4you.net/stalker_portal/c/
Accept: */*
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
X-User-Agent: Model: MAG250; Link: WiFi
Authorization: Bearer 23FA548FB86BE69A29CA9D97E9759A38
Host: zulu1778.server4you.net
Connection: close
Accept-Encoding: gzip, deflate

`;
