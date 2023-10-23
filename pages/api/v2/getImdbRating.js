import nc from "next-connect";
var axios = require("axios");
const { JSDOM } = require("jsdom");
const jquery = require("jquery");

const handler = nc({
  onError: (err, req, res) => {
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

      const rating = await getImdbRating(imdb);

      res.send(rating);
    })();
  } catch (error) {
    res.send("Error");
  }
});

async function getImdbRating(imdbID) {
  try {
    let { data } = await axios.get(`https://www.imdb.com/title/${imdbID}/`);

    const dom = new JSDOM(data);
    const $ = jquery(dom.window);
    const allhomelists =
      dom.window.document.getElementsByClassName("sc-7ab21ed2-1");

    return $(allhomelists[0]).text();
  } catch {
    return null;
  }
}

export default handler;
