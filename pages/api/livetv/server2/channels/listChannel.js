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
      let { token, genereId, page } = req.body;

      // let stalkerHost = "http://scarnet.xyz:8880/c/";
      // let stalkerMac = "00:1A:79:4A:58:60";
      // let host = "http://scarnet.xyz:8880";
      let stalkerHost = "http://zulu1778.server4you.net/stalker_portal/c/";
      let stalkerMac = "00:1A:79:4B:B0:C4";
      let host = "http://zulu1778.server4you.net/stalker_portal";

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

      let TvChannelListResp = (
        await axios.get(
          `${host}/server/load.php?type=itv&action=get_ordered_list&genre=${genereId}&force_ch_link_check&p=${page}&JsHttpRequest=1-xml`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Cookie: `timezone=GMT; stb_lang=en; mac=${stalkerMac}`,
            },
          }
        )
      ).data;

      console.log(TvChannelListResp);

      res.send({
        status: true,

        page,

        itmsInThisPage: TvChannelListResp.js.data.length,
        totalPages: Math.ceil(
          parseInt(TvChannelListResp.js.total_items) /
            parseInt(TvChannelListResp.js.max_page_items)
        ),
        total_items: TvChannelListResp.js.total_items,
        token,
        // channels: TvChannelListResp.js.data,
        channels: TvChannelListResp.js.data.map((ch) => ({
          id: ch.id,
          number: ch.number,
          adult: ch.censored == 1,
          title: ch.name,
          language: "",
          //   cur_playing: ch.cur_playing,
          logo: ch.logo,
          //   epg: ch.epg,
          key: btoa(ch.cmd),
          cur_playing: ch.cur_playing,
          type: "tv",
          token: token,
        })),
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
