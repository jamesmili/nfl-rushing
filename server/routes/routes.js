const express = require('express');
const Player = require('../models/player.model');
const PlayerController = require('../controller/controller');

const playerRouter = express.Router();

// Download csv
playerRouter.get('/download', PlayerController.download);

// GET all players
playerRouter.get('/players/all', PlayerController.all);

// GET players with querystring for page number, search player and sort by
playerRouter.get('/players', PlayerController.query);

module.exports = playerRouter;