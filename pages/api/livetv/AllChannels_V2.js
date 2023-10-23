import axios from "axios";
import nc from "next-connect";
import allChannels from "./AllChannelsList.js";

var overseasSports = [
  // {
  //   title: "Movizz Sports",
  //   logo: "https://res.cloudinary.com/samrat-tech/image/upload/v1669170599/MovizzTransparent_q2kyuz.png",
  //   key: "anycric-starhindi1",
  //   language: "English",
  //   type: "tv",
  // },
  // {
  //   title: "Star Sports 1 Hindi HD",
  //   logo: "https://snoidcdnems05.cdnsrv.jio.com/jiotv.catchup.cdn.jio.com/dare_images/images/Star_Sports_3.png",
  //   key: "anycric-starhindi",
  //   language: "English",
  //   type: "tv",
  // },
  // {
  //   title: "Star Sports 1 HD",
  //   logo: "https://jiotv.catchup.cdn.jio.com/dare_images/images/Star_Sports_HD_1.png",
  //   key: "anycric-star1in",
  //   language: "English",
  //   type: "tv",
  // },
  {
    title: "Sky Sports Cricket",
    logo: "data:image/png;base64,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",
    key: "anycric-skyscric",
    language: "English",
    type: "tv",
  },
  {
    title: "A Sports HD",
    logo: "https://pbs.twimg.com/profile_images/1445713521136730118/QhkT-1X-_400x400.jpg",
    key: "anycric-asportshd",
    language: "English",
    type: "tv",
  },
  {
    title: "Willow Cricket HD",
    logo: "https://mma.prnewswire.com/media/1919551/WillowTV_Logo.jpg",
    key: "anycric-willowusa",
    language: "English",
    type: "tv",
  },
  {
    title: "Willow Xtra",
    logo: "https://res.cloudinary.com/samrat-tech/image/upload/v1669170680/Willow_xtra_logo_zy1cv6.jpg",
    key: "anycric-willowextra",
    language: "English",
    type: "tv",
  },
  {
    title: "Fox 501 Cricket HD",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f4/Fox_Cricket_Logo.png",
    key: "anycric-fox501",
    language: "English",
    type: "tv",
  },
  {
    title: "BT Sport 1",
    logo: "https://s3-eu-west-1.amazonaws.com/static.media.info/l/o/1/1539.1647384977.png",
    key: "anycric-bbtsp1",
    language: "English",
    type: "tv",
  },
  {
    title: "BT Sport 2",
    logo: "https://s3-eu-west-1.amazonaws.com/static.media.info/l/o/1/1540.1647385004.png",
    key: "anycric-bbtsp2",
    language: "English",
    type: "tv",
  },
  {
    title: "BT Sport 3",
    logo: "https://media.info/i/lf/0/1647385037/5712.png",
    key: "anycric-bbtsp3",
    language: "English",
    type: "tv",
  },
  {
    title: "BT Sport 4",
    logo: "https://s3-eu-west-1.amazonaws.com/static.media.info/l/o/1/1491.1659387051.png",
    key: "anycric-bbtespn",
    language: "English",
    type: "tv",
  },

  {
    title: "PTV Sports",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/e4/PTV_Sports.png",
    key: "anycric-ptvpk",
    language: "English",
    type: "tv",
  },
];

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get(async (req, res) => {
  let ch = allChannels;
  let nch = Object.keys(ch).map((cateogry) => {
    let data = [];
    Object.keys(ch[cateogry]).map((language) =>
      ch[cateogry][language].map((channel) =>
        data.push({
          ...channel,
          cateogry: cateogry,
          language: language,
          type: "tv",
        })
      )
    );

    // nch.push({ cateogry, id: Math.random(), channels: data });

    return { cateogry, id: Math.random(), channels: data };
  });

  let { data } = await axios.post(
    `${process.env.HOST_URL}/api/livetv/server2/channels/listChannel`,
    {
      // token:
      genereId: "258",
      page: "9",
    }
  );

  let server2Channels = data.channels.map((i) => ({
    ...i,
    logo: i.logo,
    key: "server2" + i.key + "maal" + i.token,
    streamtype: "mp2t",
  }));

  let ser3adult = await axios.post(
    `${process.env.HOST_URL}/api/livetv/server2/channels/listChannel`,
    {
      // token:
      genereId: "23",
      page: "3",
    }
  );

  let server3Channels = ser3adult.data.channels.map((i) => ({
    ...i,
    logo: i.logo,
    key: "server2" + i.key + "maal" + i.token,
    streamtype: "mp2t",
  }));

  nch.push({
    id: Math.random(),
    cateogry: "Adult Channels",
    channels: server3Channels,
  });

  nch.unshift({
    id: Math.random(),
    cateogry: "Indian Channels",
    channels: server2Channels,
  });

  nch.unshift({
    id: Math.random(),
    cateogry: "Sports Overseas",
    channels: overseasSports.map((c) => ({ ...c, id: Math.random() })),
  });

  res.send({ error: false, channels: nch });
});

export default handler;
