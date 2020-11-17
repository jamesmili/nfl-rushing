const express = require('express');
const app = express();
const PORT = 8000;
const bodyParser = require('body-parser');
const playerRouter = require('./routes/routes');
const cors = require('cors')

const db = require('./database');

db()

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