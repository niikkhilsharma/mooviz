import nc from "next-connect";
//AXIOS
var axios = require("axios");
import { JSDOM } from "jsdom";

async function getallID(imdbID) {
  var axres = await axios
    .get(`https://www.2embed.to/embed/imdb/movie?id=${imdbID}`)
    .then((d) => d.data);
  var dom = new JSDOM(axres);
  var serversArray = [];
  dom.window.document.querySelectorAll(".item-server").forEach((el) => {
    serversArray.push({
      server: el.textContent,
      id: el.getAttribute("data-id"),
    });
  });
  return serversArray;
}
const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).post(async (req, res) => {
  try {
    var type = req.body.t;
    var imdbID = JSON.parse(
      decrypthex(
        JSON.parse(atob(req.query.d))[0],
        Buffer.from(JSON.parse(atob(req.query.d))[1])
      )
    );
    if (type == "tv") {
    } else {
      var allids = await getallID(imdbID);
      res.send(allids);
    }
  } catch (error) {
    res.send(error);
  }
});
export default handler;
