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
      var { type, id } = req.query;
      // console.log(title);

      let { data } = await axios.get(
        `https://streamappsindia.com/rest-api/v130/single_details?type=${type}&id=${id}`,
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
