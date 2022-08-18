require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { connect } = require('./db');
const Logger = require('./utils/logger');
connect();

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(require('./middleware/notFound'))
//Routes

app.use('/api/v1/tasks', require('./routes/tasks.router'));
let logger = new Logger();
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => logger.log(`Server listening on port ${port}...`));
console.log();
