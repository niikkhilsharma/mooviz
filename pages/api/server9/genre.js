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
      var { id, page } = req.query;

      let { data } = await axios.get(
        `https://streamappsindia.com/rest-api//v130/content_by_genre_id?id=${id}&page=${page}`,
        {
          headers: {
            Authorization: "Basic YWRtaW46MTIzNA==",
            "Api-Key": "6c923821c08024a",
          },
        }
      );

      if (data) {
        res.send({ streamable: true, data: data });
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
