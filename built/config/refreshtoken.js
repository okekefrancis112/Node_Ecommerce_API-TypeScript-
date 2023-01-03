var jwt = require('jsonwebtoken');
var generateRefreshToken = function (id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};
module.exports = { generateRefreshToken: generateRefreshToken };
