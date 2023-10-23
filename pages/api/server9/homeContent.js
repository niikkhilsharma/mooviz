import axios from "axios";
import verifyToken from "../../../lib/jsonWebToken/verifytoken";
import verifyAuth from "../../../lib/socket/socketAuth";

import nc from "next-connect";

const handler = nc({
  onError: (err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(verifyToken)
  .use(verifyAuth)
  .get((req, res) => {
    try {
      (async () => {
        // console.log(title);

        let { data } = await axios.get(
          `http://streamappsindia.com/rest-api/v130/home_content_for_android`,
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
