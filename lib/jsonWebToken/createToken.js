var jwt = require('jsonwebtoken')
import privateKEYs from './tokenKeys/private_key.js'

var cratetoken = DataToEncToken => {
	// console.log(privateKEYs);
	// var privateKEY = `${}`;
	// SIGNING OPTIONS
	var signOptions = {
		issuer: process.env.JWT_Issuer,
		subject: process.env.JWT_Subject,
		audience: process.env.JWT_Audience, // Audience
		// expiresIn: "12h",
		// algorithm: "RS256",
	}
	var token = jwt.sign(DataToEncToken, privateKEYs, signOptions)
	return token
}

module.exports = cratetoken
