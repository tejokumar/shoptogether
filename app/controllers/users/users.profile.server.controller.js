'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
    FB = require('fb');

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};

exports.friends = function(req, res){
    if(req.user && 'facebook' === req.user.provider){
        FB.setAccessToken(req.user.providerData.accessToken);
        console.log(req.user.accessToken);
        FB.api('me/friends','get',function(response){
            if(response.data && response.data.length > 0){
                var friendsCount = response.data.length;
                _.forEach(response.data,function(friend){
                    User.findOne({'providerData.id':friend.id},function(err,savedUser){
                        friend.username = savedUser.username;
                        friend.profilePicture = savedUser.profilePicture;
                        friend.displayName = savedUser.displayName;
                        friend.email = savedUser.providerData.email;
                        friendsCount--;
                        if(friendsCount === 0){
                            res.json(response.data);
                        }
                    });
                });
            }else {
                res.json(response);
            }
        });
    }
};