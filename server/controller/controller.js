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

PlayerController.all = async (req,res) => {
    Player.find({}).lean().exec(function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
            return
        }
        res.status(200).send({
            'success': true,
            'data': result
        });
    });
}

PlayerController.query = async (req,res) => {
    var sortingQuery
    var ascDesc

    //page number validation
    if (parseInt(req.query.page) < 1){
        res.status(400).send({
            'success': false,
            'message': "Page number must be greater than 0"
        })
        return
    }

    // sort validation
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

    const page = req.query.page ? req.query.page : 1 // default page is 1
    const pageSize = 20

    // search query for .find()
    const query = req.query.search ? {
        Player: {$regex: req.query.search, $options:'i'},
    } : {}

    try{
        await Player.find(query).lean().exec(function(err, result){
            if(err){
                res.status(400).send({
                    'success': false,
                    'error': err.message
                });
                return
            }
            // page number doesn't exist
            if (page*pageSize > result.length && result.slice((page-1) * pageSize, page * pageSize).length === 0){
                res.status(404).send({
                    'success': false,
                    'error': "Page doesn't exist"
                })
                return
            }

            // Manually sort because Yds and Lng fields are strings
            if (sortingQuery){
                if (sortingQuery !== 'TD'){
                    var parseA, parseB
                    result = result.sort(function (a, b) {
                        // removes comma characters
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
            // paginate
            const next = page * pageSize < result.length ? true : false
            const prev = (page-1) * pageSize !== 0 ? true : false
            // slice array to create pagination
            res.status(200).send({
                success: true,
                data: result.slice((page-1) * pageSize, page * pageSize),
                next_page: next,
                prev_page: prev,
            });
        })
    }catch (err){
        console.log(err)
    }
}

module.exports = PlayerController;