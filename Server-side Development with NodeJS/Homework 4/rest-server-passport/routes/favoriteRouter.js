var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Verify = require('./verify');

var Dishes = require('../models/dishes');
var Favorites = require('../models/favorites');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());
favoriteRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        var userId = req.decoded._doc._id;
        Favorites.findOne({
                'postedBy': userId
            })
            .populate('postedBy')
            .populate('dishes')
            .exec(
                function (err, favorite) {
                    if (err) throw err;
                    res.json(favorite);
                });
    })
    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        var userId = req.decoded._doc._id;
        favorites.findOne({
            'postedBy': userId
        }, function (err, favorite) {
            if (err) throw err;
            if (favorite == null) {
                var favoriteDish = {};
                favoriteDish.postedBy = req.decoded._doc._id;
                favoriteDish.dishes = [];
                favoriteDish.dishes.push(req.body._id);

                console.log(JSON.stringify(favoriteDish));
                favorites.create(favoriteDish, function (err, favorite) {
                    if (err) throw err;
                    console.log(JSON.stringify(favorite));
                    res.json(favorite)
                });
            } else {
                var flag = true;
                for (var i = (favorite.dishes.length - 1); i >= 0; i--) {
                    if (favorite.dishes[i] == req.body._id) {
                        res.json(favorite);
                        flag = false;
                    }
                }
                if (flag) {
                    favorite.dishes.push(req.body._id);
                    favorite.save(function (err, favorite) {
                        if (err) throw err;
                        console.log('Favorite Updated!');
                        res.json(favorite);
                    });
                }
            }
        });
    })

    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        var userId = req.decoded._doc._id;
        favorites.findOneAndRemove({
            'postedBy': userId
        }, function (err, favorite) {
            res.json(favorite);
        });
    });

favoriteRouter.route('/:favoriteId')
    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        var userId = req.decoded._doc._id;
        favorites.findOne({
            'postedBy': userId
        }, function (err, favorite) {
            if (err) throw err;
            if (favorite) {
                for (var i = (favorite.dishes.length - 1); i >= 0; i--) {
                    if (favorite.dishes[i] == req.params.favoriteId) {
                        favorite.dishes.remove(req.params.favoriteId);
                    }
                }
                
                favorite.save(function (err, favorite) {
                    if (err) throw err;
                    console.log('Favorite Updated!');
                    res.json(favorite);
                });
            } else {
                res.json(favorite);
            }

        });
    });


module.exports = favoriteRouter;