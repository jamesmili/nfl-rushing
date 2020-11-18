const seeder = require('mongoose-seed')
const dotenv = require('dotenv')
const data = require('./data/rushing.json')

dotenv.config();

const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT
} = process.env;

const dbConnectionURL = {
    'LOCALURL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
};

seeder.connect(dbConnectionURL.LOCALURL, function(){
    var dataToPush = [{
        'model': 'Player',
        'documents': data
    }]

seeder.loadModels(['./models/player.model.js']);

    seeder.clearModels(['Player'], function() {
        seeder.populateModels(dataToPush, function(err, done) {
            if (err){
                console.log(err)
            }
            if (done){
                console.log(done)
            }
        seeder.disconnect();
        });

    });
});