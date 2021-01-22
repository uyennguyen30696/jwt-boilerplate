// Require custom middeware to check if the user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
// Add jwt
// const jwt = require("jsonwebtoken");

module.exports = function(app) {
    app.get("/", (req, res) => {
        // If the user already has an account, send them to the members page
        if (req.user) {
            res.redirect("/members");
        };
        res.render("welcome");
    });

    app.get("/login", (req, res) => {
        // If the user already has an account, send them to the members page
        if (req.user) {
            res.redirect("/members");
        };
        res.render("login");
    });

    app.get("/signup", (req, res) => {
        // If the user already has an account, send them to the members page
        if (req.user) {
            res.redirect("/members");
        };
        res.render("signup");
    });

    app.get("/logout", (req, res) => {
        // If the user already has an account, send them to the members page
        if (req.user) {
            res.redirect("/members");
        };
        res.render("welcome");
    });

    // Add isAuthenticated middleware is added to this route
    // If a user who is not logged in tries to access this route, they will be redirected to the signup page
    app.get("/members", isAuthenticated, (req, res) => {
        // if (!req.user) {
        //     res.redirect("/");
        // };

        res.render("members");
    });
};