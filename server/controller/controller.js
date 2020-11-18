const Player = require('../models/player.model');
const downloadResource = require('../utils/utils');

const PlayerController = {};

const headers = [ "Player", "Team", "Pos", "Att", "Att/G", "Yds",
        "Avg", "Yds/G", "TD", "Lng", "1st", "1st%", "20+",
        "40+", "FUM"
    ]

PlayerController.download = async (req, res) => {
    const fields = headers.map(h => (
        {
            label: h,
            value: h
        })
    );

    var sortingQuery
    var ascDesc
    if (req.query.sort){
        // case insensitive for sorting
        sortingQuery = req.query.sort.toLowerCase()
        const sorting = { 'yds': 'Yds', 'td': 'TD', 'lng': 'Lng'}
        const length = sortingQuery.length
        if (sortingQuery.charAt(0) === '-'){
            sortingQuery = sorting[sortingQuery.substring(1,length)]
            ascDesc = '-'
        }else{
            sortingQuery = sorting[sortingQuery]
        }
    }

    // search query optional
    const query = req.query.search ? {
        Player: {$regex: req.query.search, $options:'i'},
    } : {}
    try{
        // filter data
        await Player.find(query , ['-_id', '-__v']).lean().exec(function(err, result){
            if(err){
                res.status(400).send({
                    'success': false,
                    'error': err.message
                });
            }

            if (sortingQuery){
                if (sortingQuery !== 'TD'){
                    var parseA, parseB
                    result = result.sort(function (a, b) {
                        // removes characters that are not digits
                        parseA = parseInt(a[sortingQuery].replace(/\,/g, "").match(/-?\d+/)[0])
                        parseB = parseInt(b[sortingQuery].replace(/\,/g, "").match(/-?\d+/)[0])
                        return ascDesc ? parseA - parseB : parseB - parseA
                    })
                }else{
                    result = result.sort(function (a, b) {
                        parseA = a[sortingQuery]
                        parseB = b[sortingQuery]
                        return ascDesc ? parseA - parseB : parseB - parseA
                    })
                }
            }
            return downloadResource(res, 'players.csv', fields, result);
        })
    }catch (err){
        console.log(err)
    }
}

module.exports = PlayerController;