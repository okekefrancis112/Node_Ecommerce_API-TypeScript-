var mongoose = require('mongoose').default;
mongoose.set("strictQuery", false);
var dbConnect = function () {
    try {
        var conn = mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connection established');
    }
    catch (err) {
        console.log("Database connection error");
    }
};
module.exports = dbConnect;
