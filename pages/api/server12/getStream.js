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
    const { id } = req.query;

    let vootStreamApi = `https://wapi.voot.com/ws/ott/getMediaInfo.json?platform=Web&pId=2&mediaId=${id}`;

    let { data } = await axios.get(vootStreamApi);

    let result = data.assets;

    if (result.MediaTypeName.toLowerCase().includes("movie")) {
      let { EntryId, MediaName, Files, Pictures } = result;

      let duration = Files[0].Duration;

      let banner = Pictures[0].URL;

      let streamUrl = `https://cdnapisec.kaltura.com/p/1982551/playManifest/pt/https/f/applehttp/t/web/e/${EntryId}`;

      res.send({
        status: true,
        data: { MediaName, duration, banner, streamUrl },
      });
    } else {
      res.send({ status: false, msg: "Currently This Content Is Unavailbale" });
    }
  } catch (error) {
    console.log(error);
    const dat = `<></>`;
    res.send(dat);
  }
});

export default handler;

("https://zee5livemedia.zee5.com/v1/master/5c95b915ce5f89df583d7097ff7e9fdb77a6461e/LinearStream-SSAI-POC/out/v1/1d59d08fec89495584d2b7e4059492a4/index.m3u8?hdnts=st=1672829604~exp=1672832604~acl=/out/v1/1d59d08fec89495584d2b7e4059492a4/index.m3u8*~hmac=a1f36bd88b262cfef977d0bc55f3d0911c82d017631d22d146c49041939d405d");
("https://z5ak-live.zee5.com/out/v1/1d59d08fec89495584d2b7e4059492a4/index.m3u8");

("https://zee5livemedia.zee5.com/v1/master/5c95b915ce5f89df583d7097ff7e9fdb77a6461e/LinearStream-SSAI-POC/out/v1/1d59d08fec89495584d2b7e4059492a4/index.m3u8?hdnts=st=1672830194~exp=1672833194~acl=/out/v1/1d59d08fec89495584d2b7e4059492a4/index.m3u8*~hmac=cde9415e6017da64ebeba43cc21b3c1c010aca8bcf3e729e6b43fb0a5710554e");

("../../../../../../manifest/5c95b915ce5f89df583d7097ff7e9fdb77a6461e/LinearStream-SSAI-POC/9e9461c4-6e77-4ae7-9450-bda6f082ab6d/5.m3u8");

("https://zee5livemedia.zee5.com/v1/manifest/5c95b915ce5f89df583d7097ff7e9fdb77a6461e/LinearStream-SSAI-POC/9e9461c4-6e77-4ae7-9450-bda6f082ab6d/5.m3u8?hdnts=st=1672830194~exp=1672833194~acl=/9e9461c4-6e77-4ae7-9450-bda6f082ab6d/5.m3u8*~hmac=cde9415e6017da64ebeba43cc21b3c1c010aca8bcf3e729e6b43fb0a5710554e");
