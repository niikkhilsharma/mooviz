import axios from "axios";

import nc from "next-connect";

const handler = nc({
  onError: (err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get((req, res) => {
  try {
    (async () => {
      const id = req.query.id;
      // console.log(title);

      let Response = await getStream(id);

      if (Response) {
        res.send({ streamable: true, data: Response });
      } else {
        res.send({ streamable: false });
      }
    })();
  } catch (error) {
    // console.log(error);

    res.send({ streamable: false });
  }
});

export default handler;

async function getStream(id) {
  let link = (await axios.get(`https://mdisks.herokuapp.com/c/${id}`)).request
    ._redirectable._currentUrl;

  let { data } = await axios.get(
    `https://diskuploader.entertainvideo.com/v1/file/cdnurl?param=${
      link.split("/")[link.split("/").length - 1]
    }`
  );

  //   console.log(data);

  let resObj;

  if (!data.source.includes("mp4")) {
    try {
      await axios.head(data.source);

      resObj = {
        stream: data.source,
        download: data.download,
        duration: data.duration,
        size: data.size,
        name: data.filename,
        resolution: data.width,
      };
    } catch {
      //   console.log(data.source);
    }
  }

  // resObj.url = newlink;

  // // if (!data.source.includes("mp4")) {
  // //   try {
  // //     await axios.head(data.source);
  // resArray.push(resObj);
  //   } catch {
  //     // console.log(data.source);
  //   }
  // }
  //   }

  // console.log(msgs[0]);

  //   console.log(resArray);
  return resObj;
}

/*

{
  "streamable": true,
  "data": [
    {
      "title": "Thor Love and Thunder 2022 Part001 dual audio1080p mkv mkv⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      "size": "1.96 GB",
      "mdiskId": "1230227968/TdIBwO"
    },
    {
      "title": "Thor Love and Thunder 2022 HDCAM Rip 720p Tamil HQ C mkv⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      "size": "0.95 GB",
      "mdiskId": "1230227968/CXsbnv"
    },
    {
      "title": "MM Thor Love and Thunder 2022 Hindi HDCAM Rip mkv⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      "size": "407  MB",
      "mdiskId": "1230227968/WUbf54"
    },
    {
      "title": "Thor Love and Thunder 2022 720p HDTS Hindi English x26 mkv⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      "size": "0.97 GB",
      "mdiskId": "1230227968/Ki7HDT"
    },
    {
      "title": "Thor love and Thunder 2022 1080p HdCam hindi+Eng mkv⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      "size": "1.87 GB",
      "mdiskId": "1230227968/jp2FTo"
    },
    {
      "title": "Thor Love and Thunder 2022 720p HDTS Hindi English x264 mkv⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      "size": "0.97 GB",
      "mdiskId": "1230227968/OXIjzx"
    },
    {
      "title": "Thor love and Thunder 2022 1080p HdCam hindi+Eng mkv⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      "size": "1.87 GB",
      "mdiskId": "1230227968/SWcCA3"
    },
    {
      "title": "Thor Love and Thunder 2022 mkv⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      "size": "1.50 GB",
      "mdiskId": "1230227968/gvOLQ1"
    },
    {
      "title": "Thor Love and Thunder 2022 Tmail 720p PreDVDRip x264 mkv mkv⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      "size": "0.95 GB",
      "mdiskId": "1230227968/cB1Oqj"
    },
    {
      "title": "Thor Love and Thunder 2022 720p HDTS Hindi English x264 mkv⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      "size": "0.96 GB",
      "mdiskId": "1230227968/l4znCM"
    }
  ]
}

*/
