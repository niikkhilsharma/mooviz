import nc from "next-connect";
import verifyauth from "../../../lib/jsonWebToken/verifytoken";
import db from "../../../lib/database/dbconnect";
import usermodel from "../../../lib/database/models/usermodel";

const router = nc({
  onError(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Internal Server Error");
  },
})
  .use(verifyauth)
  .get(async (req, res) => {
    await db();
    var data = await usermodel.findById(req.user).select("-password");
    if (data) {
      data = JSON.parse(JSON.stringify(data));
      if (data.Isbanned) {
        res.send({
          accepted: false,
          msg: "Soory But Your Account Has Been Blocked Due To Security Reasons!",
        });
        return;
      }
      delete data._id;
      delete data.__v;
      delete data.Isbanned;
      res.send({ accepted: true, msg: data });
    } else {
      res.send({
        accepted: false,
        msg: "We Dont Have Corresponding Data Here ",
      });
    }
  });

export default router;
