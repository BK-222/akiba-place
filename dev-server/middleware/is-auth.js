const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	try {
		const authHeader = req.get('Authorization');
		const token2 = req.headers.authorization;
		const token = authHeader.split(" ")[1];
		// const token = authHeader;
		// console.log(token);
		// console.log(token2);
		const decoded = jwt.verify(token, 'kuwadorian');
		console.log(decoded);
		console.log(decoded.userId);
		req.userId = decoded.userId;
		console.log(req.userId);
		next();
	} catch (error) {
		return res.status(401).json({
			Friendly_Store_Employee: 'Authorization failed'
		});
	}
}

module.exports = auth;

// module.exports = (req, res, next) => {
//   const authHeader = req.get('Authorization');
//   if (!authHeader) {
//     const error = new Error('Not authenticated.');
//     error.statusCode = 401;
//     throw error;
//   }
//   const token = authHeader.split(' ')[1];
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, 'somesupersecretsecret');
//   } catch (err) {
//     err.statusCode = 500;
//     throw err;
//   }
//   if (!decodedToken) {
//     const error = new Error('Not authenticated.');
//     error.statusCode = 401;
//     throw error;
//   }
//   req.userId = decodedToken.userId;
//   next();
// };
