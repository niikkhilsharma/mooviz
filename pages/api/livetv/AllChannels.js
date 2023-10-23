import nc from "next-connect";
import allChannels from "./AllChannelsList.js";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get((req, res) => {
  res.send({ errors: false, allChannels });
});

export default handler;
