// Require models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");

module.exports = function (app) {
    app.post("/api/login", async (req, res, next) => {
        // res.json({
        //     email: req.user.email,
        //     id: req.user.id
        // });
        // res.json(req.user);

        passport.authenticate(
            "jwt",
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        console.log(err);
                    }
                    console.log(user, info);
                    req.login(
                        user, { session: false }, async (err) => {
                            if (err) {
                                return err;
                            };

                            const payload = {
                                email: user.email,
                                password: user.password,
                            }
                            const options = {
                                subject: `${user.id}`,
                                expiresIn: 3600
                            }
                            const token = jwt.sign({ user: payload }, "SECRET8080", options);

                            return res.json({ token });
                        }
                    );
                } catch (err) {
                    return err;
                }
            }
        )(req, res, next);
    });

    // If the user is created successfully, proceed to log the user in
    // Otherwise send back an error
    app.post("/api/signup", function (req, res) {
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
            .then(() => {
                res.redirect(307, "/api/login");
            })
            .catch(err => {
                res.status(401).json(err);
            });
    });

    // Route for logging the user out
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", passport.authenticate('jwt', { session: false }), (req, res) => {
        if (!req.user) {
            // If the user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's first name and id
            // NOT sending back a password or even a hashed password
            res.json({
                firstName: req.user.firstName,
                id: req.user.id
            });
        };
    });
};