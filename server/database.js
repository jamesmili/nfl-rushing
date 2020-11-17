const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedPlayer = require('./seed')

dotenv.config();

// mongoose options
const options = {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true,
	autoIndex: false,
	poolSize: 10,
	bufferMaxEntries: 0
};

const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT
} = process.env;

const dbConnectionURL = {
    'LOCALURL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
};

const databaseConnect = async () => {
	try{
		await mongoose.connect(dbConnectionURL.LOCALURL, options);
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'Mongodb Connection Error:' + dbConnectionURL.LOCALURL));
		// run seed to populate data
		seedPlayer()
		db.once('open', () => {
			console.log('Mongodb Connection Successful');
		});
	}catch (err){
		console.log(err)
	}
}

module.exports = databaseConnect;