import nc from "next-connect";
import { body, validationResult } from "express-validator";
import DB from "../../../lib/database/dbconnect";
import usermodel from "../../../lib/database/models/usermodel";
import { encrypthex } from "../../../lib/encryption/encryption";
import createtoken from "../../../lib/jsonWebToken/createToken";
const accountSid = process.env.twilio_accountSid;
const authToken = process.env.twilio_authToken;
const client = require("twilio")(accountSid, authToken);

const route = nc({
  onError(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Internal System Error");
  },
})
  .use(
    body("name", "UserName Must Be More Than 1 Charater").isLength({ min: 2 }),
    body("email", "Please Enter Valid Email").isEmail(),
    body("password", "Password Length Must Be Min-5").isLength({ min: 5 })
  )
  .post(async (req, res) => {
    await DB();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ accepted: false, msg: "Try Again" });
    }
    const { name, email, contact, password } = req.body;
    usermodel.findOne({ email: email.toUpperCase() }).then(async (data) => {
      if (data == null) {
        usermodel.findOne({ contact }).then(async (data) => {
          if (data == null) {
            if (req.query.mode == "GetOTP") {
              try {
                var result = await sendOTP(contact);
                res.send({
                  accepted: result == "pending" ? true : false,
                  msg:
                    result == "pending"
                      ? "OTP Sent Successfully"
                      : "Somwthing Went Wrong",
                });
              } catch (error) {
                res.send({ accepted: false, msg: "Try Again" });
              }
            } else if (req.query.mode == "VerifyOTP") {
              try {
                var result = await VerifyOTP(contact, req.body.OTP);
                let secpassword = encrypthex(password);
                const datatosave = new usermodel({
                  name,
                  email: email.toUpperCase(),
                  emailOrignal: email,
                  contact,
                  password: secpassword,
                  todel: true, //To delete Development data
                });
                datatosave.save().then((data) => {
                  var token = createtoken({
                    _id: datatosave._id,
                  });
                  res.send({
                    accepted: true,
                    msg: "SignedUp Successfully",
                    token,
                  });
                });
              } catch (error) {
                console.log(error);
                res.send({ accepted: false, msg: "Try Again" });
              }
            } else {
              res.send({ accepted: false, msg: "Try Again" });
            }
          } else {
            res.send({ accepted: false, msg: "Already Registered" });
          }
        });
      } else {
        res.send({ accepted: false, msg: "Already Registered" });
      }
    });
  });

async function sendOTP(Number) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await client.verify.v2
        .services(process.env.twilio_servicesID)
        .verifications.create({ to: Number, channel: "sms" });
      resolve(result.status);
    } catch (error) {
      reject(error);
    }
  });
}
async function VerifyOTP(Number, OTP) {
  var toverify = {
    to: Number,
    code: OTP,
  };
  return new Promise(async (resolve, reject) => {
    await client.verify.v2
      .services(process.env.twilio_servicesID)
      .verificationChecks.create(toverify)
      .then((result) => {
        if (result.status == "approved") {
          resolve(result.status);
        } else {
          reject("Try Again");
        }
      })
      .catch((er) => {
        reject("Try Again");
      });
  });
}

export default route;
