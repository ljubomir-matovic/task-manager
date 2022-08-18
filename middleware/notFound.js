const HttpStatus = require("../utils/httpStatusCodes");
module.exports = (req, res, next) => {
    res.status(HttpStatus.NOT_FOUND).send('Route not exists');
}