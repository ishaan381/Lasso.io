'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports = function (app, db) {

    var User = db.model('user');
    var Company = db.model('company');
    var Code = db.model('code');

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (email, password, done) {
        User.findOne({
                where: {
                    email: email
                }
            })
            .then(function (user) {
                // user.correctPassword is a method from the User schema.
                if (!user || !user.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, user);
                }
            })
            .catch(done);
    };

    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, strategyFn));

    // A POST /login route is created to handle login.
    app.post('/login', function (req, res, next) {



        var authCb = function (err, user) {

            if (err) return next(err);

            if (!user) {
                var error = new Error('Invalid login credentials.');
                error.status = 401;
                return next(error);
            }

            // req.logIn will establish our session.
            req.logIn(user, function (loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.
                res.status(200).send({
                    user: user.sanitize()
                });
            });

        };

        passport.authenticate('local', authCb)(req, res, next);

    });

    app.post('/create', function(req, res, next) {
        Company.findOne({where: {
            name: req.body.name
        }})
        .then(function(company) {
            if (!company) return Company.create(req.body);
            else {
                var error = new Error('Company account already exists');
                error.status = 401;
                throw error;
            }
        })
        .then(function(createdCompany) {
            res.send(createdCompany);
        })
        .catch(function(error) {
            return next (error)
        })
    })

    app.post('/checkcode', function(req, res, next) {
        var _companyId, _isCompanyAdmin;
        Code.findOne({where: {
            code: req.body.code
        }})
        .then(function(code) {
            if (code) {
                _companyId = code.companyId;
                _isCompanyAdmin = code.isCompanyAdmin;
                return code.destroy()
            }
            else {
                var error = new Error('Invalid or expired verification code');
                error.status = 401;
                throw error;
            }
        })
        .then(function() {
            res.send({companyId: _companyId, isCompanyAdmin: _isCompanyAdmin});
        })
        .catch(function(error) {
            return next (error);
        })
    })

    app.post('/signup', function(req, res, next) {
        User.findOne({where: {
            email: req.body.email
        }})
        .then(function(user){
            if (!user) return User.create(req.body);
            else {
                var error = new Error('User already exists');
                error.status = 401;
                throw error;
            }
        })
        .then(function(createdUser) {
            res.sendStatus(200)
        })
        .catch(function(error) {
            return next (error)
        })
    })

};
