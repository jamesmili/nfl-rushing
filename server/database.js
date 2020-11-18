const mongoose = require('mongoose')
const dotenv = require('dotenv')

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

const connect = async () => {
	try{
		await mongoose.connect(dbConnectionURL.LOCALURL, options).catch(err => console.log(err))
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'Mongodb Connection Error:' + dbConnectionURL.LOCALURL))
		db.once('open', () => {
			console.log('Mongodb Connection Successful')
		});
	}catch (err){
		console.log(err)
	}
}

const close = () => {
	return mongoose.disconnect()
}

module.exports = { connect, close }