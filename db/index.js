require('dotenv').config();
const mongoose = require("mongoose");
const Logger = require('../utils/logger');
const logger = new Logger();
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology: true, dbName:"task_manager" });
        logger.log('Connected successfully');
    }
    catch (err) {
        logger.error(err);
    }
}

module.exports = { connect };