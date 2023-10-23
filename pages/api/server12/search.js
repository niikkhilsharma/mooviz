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
    const { query } = req.query;

    let vootSearchApi =
      "https://jn1rdqrfn5-3.algolianet.com/1/indexes/*/queries?x-algolia-application-id=JN1RDQRFN5&x-algolia-api-key=e426ce68fbce6f9262f6b9c3058c4ea9";

    let postData = `{"requests":[{"indexName":"prod_voot_v4_elastic_jio","params":"query=${query}&hitsPerPage=20&page=0"}]}`;

    let { data } = await axios.post(vootSearchApi, postData);

    let results = data.results[0].hits;

    results = results.map((r) => {
      let {
        name,
        id,
        defaultLanguage,
        genres,
        fullTitle,
        fullSynopsis,
        badgeName,
        characters,
        contributors,
        mediaType,
        seo,
      } = r;

      return {
        name,
        mediaType,
        id,
        lang: defaultLanguage,
        title: fullTitle,
        desc: fullSynopsis,
        genres,

        badgeName,
        characters,
        contributors,

        about: seo,
      };
    });

    res.send(results);
  } catch (error) {
    console.log(error);
    const dat = `<></>`;
    res.send(dat);
  }
});

export default handler;
