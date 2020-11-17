const Player = require('./models/player.model')
const data = require('./data/rushing')

// import rushing.json data to db
const seedPlayers = async () => {
    try{
        const playersCollection = await Player.find()
        // only imports if there's no data in db
        if (playersCollection.length > 1){
            return
        }
        players = []
        for (let i = 0; i < data.length; i++){
            players.push(
                new Player(data[i])
            )
        }
        await Player.remove()
        players.forEach(player => {
            Player.create(player)
        })
        
    }catch (error) {
        console.log(error)
    }
}

module.exports = seedPlayers;
