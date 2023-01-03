var jwt = require('jsonwebtoken');
var generateToken = function (id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
module.exports = { generateToken: generateToken };
