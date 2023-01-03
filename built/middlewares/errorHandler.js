// Not Found
var notFound = function (req, res, next) {
    var error = new Error("Not Found: ".concat(req.originalUrl));
    res.status(404);
    next(error);
};
// Error Handler
var errorHandler = function (req, res, next) {
    var statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode);
    res.join({
        message: err === null || err === void 0 ? void 0 : err.message,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
};
module.exports = { errorHandler: errorHandler, notFound: notFound };
