const express = require('express');
const Player = require('../models/player.model');
const PlayerController = require('../controller/controller');

const playerRouter = express.Router();

// Download csv
playerRouter.get('/download', PlayerController.download);

/* Get all Players */
playerRouter.get('/players/all', (req, res, next) => {
    Player.find({}).lean().exec(function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
        }
        res.status(200).send({
            'success': true,
            'data': result
        });
    });
    
});

playerRouter.get('/players', async (req, res, next) => {
    
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

    const page = req.query.page ? req.query.page : 1 // default page is 1
    const pageSize = 20

    // search query optional
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
            }

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
});

module.exports = playerRouter;