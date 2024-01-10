var jwt = require('jsonwebtoken')
import publicKEYs from './tokenKeys/public_key.js'
import usermodel from '../database/models/usermodel.js'
import dbConnect from '../database/dbconnect.js'

const verifyauth = async (req, res, next) => {
	await dbConnect()
	try {
		var token = req.headers.auth_token
		var verifyOptions = {
			issuer: process.env.JWT_Issuer,
			subject: process.env.JWT_Subject,
			audience: process.env.JWT_Audience,
			algorithm: ['RS256'],
		}
		var legit = jwt.verify(token, publicKEYs, verifyOptions)
		req.user = legit._id
		var dat = await usermodel.findById(legit._id).select('Isbanned')
		if (dat.Isbanned) throw error
		else next()
	} catch {
		next()
		// res.send({ accepted: false, msg: 'Please Verify Authorization Token' })
	}
}

module.exports = verifyauth
