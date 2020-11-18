const express = require('express');
const app = express();
const PORT = 6000;
const bodyParser = require('body-parser');
const playerRouter = require('../routes/routes');
const cors = require('cors')

const db = require('../database');

// server only for testing
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