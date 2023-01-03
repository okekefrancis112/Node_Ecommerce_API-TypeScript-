var mongoose = require('mongoose');
var validateMongoDbId = function (id) {
    var isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid)
        throw new Error("This is not valid or not Found.");
};
module.exports = validateMongoDbId;
