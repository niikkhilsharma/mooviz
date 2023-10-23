import nc from "next-connect";
import { body, validationResult } from "express-validator";
import DB from "../../../lib/database/dbconnect";
import usermodel from "../../../lib/database/models/usermodel";
import { decrypthex } from "../../../lib/encryption/encryption";
import createtoken from "../../../lib/jsonWebToken/createToken";

const route = nc({
  onError(err, req, res, next) {
    console.log(err.stack);
    res.send("Internal Error Occured");
  },
})
  .use(
    // body("email", "Please Enter Valid Email").isEmail(),
    body("password", "Password Length Must Be More Than 5").isLength({ min: 5 })
  )
  .post(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ accepted: false, msg: "Try Again" });
    }
    await DB();
    if (req.body.email) {
      const { email, password } = req.body;
      usermodel
        .findOne({ email: email.toUpperCase() })
        .then((data) => {
          if (data) {
            let secpassword = decrypthex(
              data.password[0],
              Buffer.from(data.password[1].toString("hex"), "hex")
            );
            if (password == secpassword) {
              if (data.Isbanned) {
                res.send({
                  accepted: false,
                  msg: "Soory But Your Account Has Been Blocked Due To Security Reasons!",
                });
                return;
              }
              var token = createtoken({
                _id: data._id,
              });
              res.send({ accepted: true, msg: token });
            } else {
              res.send({ accepted: false, msg: "Try Again" });
            }
          } else {
            res.send({ accepted: false, msg: "Try Again" });
          }
        })
        .catch((err) => res.send("Request Completed With Errors "));
    } else if (req.body.contact) {
      const { contact, password } = req.body;
      usermodel
        .findOne({ contact: contact })
        .then((data) => {
          if (data) {
            let secpassword = decrypthex(
              data.password[0],
              Buffer.from(data.password[1].toString("hex"), "hex")
            );
            if (password == secpassword) {
              if (data.Isbanned) {
                res.send({
                  accepted: false,
                  msg: "Soory But Your Account Has Been Blocked Due To Security Reasons!",
                });
                return;
              }
              var token = createtoken({
                _id: data._id,
              });
              res.send({ accepted: true, msg: token });
            } else {
              res.send({ accepted: false, msg: "Try  Again" });
            }
          } else {
            res.send({ accepted: false, msg: "Try Again " });
          }
        })
        .catch((err) => res.send("Request Completed With Errors "));
    }
  });

export default route;
