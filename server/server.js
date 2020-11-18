const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const playerRouter = require('./routes/routes');
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config();

const PORT = process.env.SERVER_PORT

const db = require('./database');

db.connect()

app.use(cors())

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());

app.use('/api/', playerRouter);

app.listen(PORT, function () {
    console.log(`Server Listening on ${PORT}`);
});

module.exports = app;