import nc from "next-connect";

var axios = require("axios");

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).post((req, res) => {
  (async () => {
    try {
      const config = req.body;

      try {
        await axios(config);
        res.status(404).end("Something Seems Not Right");
      } catch (error) {
        // console.log(Object.keys(error));
        if (error.response && error.response.status == 302) {
          res.send(error.response.headers.location);
        } else {
          res.status(404).end("Something Seems Not Right");
        }
      }
    } catch (error) {
      res.status(404).end("Something went wrong");

      console.log(error);
    }
  })();
});

export default handler;
