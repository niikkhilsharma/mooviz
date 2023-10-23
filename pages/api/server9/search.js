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
      // console.log(title);
      var {
        q,
        type,
        range_to,
        range_from,
        tv_cateogry_id,
        genre_id,
        country_id,
      } = req.query;

      let { data } = await axios.get(
        `https://streamappsindia.com/rest-api/v130/search?q=${q}&type=${type}&range_to=${range_to}&range_from=${range_from}&tv_category_id=${tv_cateogry_id}&genre_id=${genre_id}&country_id=${country_id}`,
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
