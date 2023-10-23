// import nc from "next-connect";

// var axios = require("axios");
// const admin = require("firebase-admin");
// const app = admin.initializeApp({
//   credential: admin.credential.cert(
//     JSON.parse(process.env.FIREBASE_ADMIN_CRED)
//   ),
// });

// const handler = nc({
//   onError: (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).end("Something broke!");
//   },
//   onNoMatch: (req, res) => {
//     res.status(404).end("Page is not found");
//   },
// }).post((req, res) => {
//   (async () => {
//     try {
//       const title = req.body.title;
//       const body = req.body.body;
//       const imdb = req.body.imdb;
//       const image = req.body.image;

//       // title, body, data, image
//       var Response = await sendNotification(title, body, image, imdb);
//       res.send(Response);
//     } catch (error) {
//       res.status(404).end("Something went wrong");

//       console.log(error);
//     }
//   })();
// });

// async function sendNotification(title, body, image, imdb) {
//   //

//   let msg = await admin.messaging().sendMulticast({
//     tokens: [
//       "cqMjY9DATt-9MUlgKFUHzW:APA91bF_o3MYEdrNC_Oi1t780cC9Bo_Kf5e8uaDEu28Q720EitXPO3dCk4Cvd6mzp_i47iZtHZuKC-OmgkofHEe1KNNs_kbo_dhJrWxn85mULoVaSU7jdxLuhG_zkcMdIjK00aMjnvyw",
//     ], // ['token_1', 'token_2', ...]

//     data: {
//       channelID: "movieUpdate",
//       channelName: "Movies Updates",
//       imdb: imdb,
//       title: `<p style="color: #06A4F3;"><b>${title}</b></p>`,
//       body: `${body}`,
//       imageUrl: `${image}`,
//       button1: JSON.stringify({
//         title: "<b>OK</b>",
//         id: "ok",
//       }),

//       button2: JSON.stringify({
//         title: "<b>NO</b>",
//         id: "no",
//       }),
//     },
//   });

//   console.log(msg);

//   return msg;
// }

// export default handler;
