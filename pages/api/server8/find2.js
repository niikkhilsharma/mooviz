import axios from "axios";
const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

// const input = require("input"); // npm i input

const apiId = parseInt(process.env.TG_APP_ID);
const apiHash = process.env.TG_API_HASH;
const stringSession = new StringSession(process.env.TG_SESSION);

var client;

(async () => {
  client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.connect();
  if (await client.checkAuthorization()) {
    console.log("I am logged in!");
  } else {
    console.log(
      "I am connected to telegram servers but not logged in with any account/bot"
    );
  }
  //   await client.start({
  //     phoneNumber: async () => await input.text("Number ?"),
  //     password: async () => await input.text("Password?"),
  //     phoneCode: async () => await input.text("Code ?"),
  //     onError: (err) => console.log(err),
  //   });
  console.log("Server 7 Connected.");

  await client.sendMessage("me", {
    message: "Server Established ...",
  });
})();

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
      const imdb = req.query.imdb;
      let { title, year } = await getTitle(imdb);
      // console.log(title);

      let Response = await findMovie(title, year);

      if (Response.length > 0) {
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

async function getTitle(imdb) {
  try {
    let {
      data: { d },
    } = await axios.get(
      `https://v3.sg.media-imdb.com/suggestion/x/${imdb}.json`
    );

    return { title: d[0].l, year: d[0].y };
  } catch (e) {
    console.log(e);
    // return ({ streamable: false });
  }
}

async function findMovie(title, year) {
  if (await client.connected) {
    console.log("connected");
  } else {
    await client.connect();
  }
  //   let client = new TelegramClient(stringSession, apiId, apiHash, {
  //     connectionRetries: 5,
  //   });
  //   await client.start({
  //     phoneNumber: async () => await input.text("Number ?"),
  //     password: async () => await input.text("Password?"),
  //     phoneCode: async () => await input.text("Code ?"),
  //     onError: (err) => console.log(err),
  //   });
  //   console.log("Server 7 Connected.");

  //   await client.sendMessage("me", {
  //     message: "Server Established ...",
  //   });

  await client.sendMessage("Link_SearchBot", {
    message: `${title} ${year}`,
  });

  let msgs = await gotResponse(title, year);

  //   let msgs = await client.getMessages("Mdisk_Moviebot", {
  //     limit: 1,
  //   });

  //   console.log(msgs[0]);

  let resArray = [];
  let sources = [];
  let links = [];

  if (msgs[0].replyMarkup) {
    msgs[0].replyMarkup.rows.map((item) => {
      item.buttons.map((btn) => {
        sources.push({
          name: btn.text,
          data: btn.data.toString().replace("send#", ""),
        });

        //   if (btn.url && btn.url.includes("https://mdisk.pages.dev")) {
        //     resArray.push({
        //       title: btn.text
        //         .split("┋")[2]
        //         .split("#")[0]
        //         .replace("🎬", "")
        //         .trim(),
        //       size: btn.text.split("┋")[1],
        //       mdiskId: btn.url.replace("https://mdisk.pages.dev/2/", ""),
        //     });

        //   } else {
        //     //   console.log(btn);
        //   }
      });
    });
  }

  console.log(sources);

  for (let source of sources.slice(0, 1)) {
    console.log(source.data);

    await client.invoke(
      new Api.messages.StartBot({
        bot: "Link_SearchBot",
        peer: "Link_SearchBot",
        randomId: Math.round(Math.random() * 1000000000000),
        startParam: source.data,
      })
    );

    let response = await getQueryResponse(source.name);
    console.log(response);
  }

  //   for (let link of links) {
  //     let newlink = (
  //       await axios.get(`https://mdisks.herokuapp.com/c/${link.url}`)
  //     ).request._redirectable._currentUrl;

  // let { data } = await axios.get(
  //   `https://diskuploader.entertainvideo.com/v1/file/cdnurl?param=${
  //     newlink.split("/")[newlink.split("/").length - 1]
  //   }`
  // );

  // let resObj = {
  //   ...link,
  // };

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
  return resArray;
}

async function gotResponse(title, year) {
  //   console.log(title, year);

  let res;

  await new Promise((resolve1, reject1) => {
    let i = setInterval(async () => {
      let msg = await client.getMessages("Link_SearchBot", {
        limit: 1,
      });

      //   console.log(msg);

      if (
        !msg[0].message.includes(`${title} ${year}`) &&
        msg[0].message.includes(`Click`)
      ) {
        // console.log(msg[0].message);
        res = msg;
        clearInterval(i);
        resolve1();
      }

      //   resolve1();
    }, 800);
  });

  return res;
}
async function gotResponse2(title, year) {
  let res;

  await new Promise((resolve1, reject1) => {
    let i = setInterval(async () => {
      let msg = await client.getMessages("mdisk_link_search_bot", {
        limit: 1,
      });

      if (
        !msg[0].message.includes(`${title} ${year}`) &&
        !msg[0].message.includes(`choose`)
      ) {
        // console.log(msg[0].message);
        res = msg;
        clearInterval(i);
        resolve1();
      }

      //   resolve1();
    }, 500);
  });

  return res;
}

async function getQueryResponse(querytext) {
  let res;

  await new Promise((resolve1, reject1) => {
    let i = setInterval(async () => {
      let msg = await client.getMessages("Link_SearchBot", {
        limit: 1,
      });

      //   console.log(msg[0].message.toLowerCase());

      if (
        !msg[0].message.includes(`/start`) &&
        !msg[0].message.toLowerCase().includes(`processing`) &&
        msg[0].message.toLowerCase().includes(querytext.toLowerCase())
      ) {
        // console.log(msg[0].message);
        res = msg;
        clearInterval(i);
        resolve1();
      }

      //   resolve1();
    }, 500);
  });

  return res;
}
