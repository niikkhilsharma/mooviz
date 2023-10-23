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
      // let stalkerHost = "http://scarnet.xyz:8880/c/";
      // let stalkerMac = "00:1A:79:4A:58:60";
      // let host = "http://scarnet.xyz:8880";

      let stalkerHost = "http://zulu1778.server4you.net/stalker_portal/c/";
      let stalkerMac = "00:1A:79:4B:B0:C4";
      let host = "http://zulu1778.server4you.net:80/stalker_portal";

      let TokenResp = (
        await axios.get(
          `${host}/server/load.php?type=stb&action=handshake&token=&JsHttpRequest=1-xml`,
          {
            headers: {
              Cookie: `timezone=Asia%2FKolkata; stb_lang=en; mac=${encodeURIComponent(
                stalkerMac
              )}`,
            },
          }
        )
      ).data;

      let token = TokenResp.js.token;

      let TvGenereResp = (
        await axios.get(`${host}/server/load.php?type=itv&action=get_genres`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Cookie: `timezone=Europe%2FParis; stb_lang=en; mac=${encodeURIComponent(
              stalkerMac
            )}`,
            "User-Agent":
              "Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3",
          },
          Referrer: "http://zulu1778.server4you.net/stalker_portal/c/",
          "X-User-Agent: Model": "MAG250; Link: WiFi",
        })
      ).data;

      console.log(TvGenereResp);
      console.log(TokenResp);

      res.send({ status: true, token, genres: TvGenereResp.js });
    } catch (error) {
      res.send({ status: false });
      //   res.setHeader({});
      console.log(error);
      //   res.status(404).end("Something went wrong");
    }
  })();
});

export default handler;

`GET /stalker_portal/server/load.php?type=stb&action=handshake&token=&JsHttpRequest=1-xml HTTP/1.1
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
Referrer: http://zulu1778.server4you.net/stalker_portal/c/
X-User-Agent: Model: MAG250; Link: WiFi
Cache-Control: no-cache
Host: zulu1778.server4you.net:-1
Cookie: mac=00%3A1A%3A79%3A4B%3AB0%3AC4; stb_lang=en; timezone=Europe%2FParis
Connection: close
Accept-Encoding: gzip, deflate`;

("");
