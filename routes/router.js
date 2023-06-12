const express = require("express");
const router = express.Router();
const app = express();


const { v4: uuid4 } = require("uuid");
const session = require("express-session");
const cookieParser = require("cookie-parser");




router.use(cookieParser());
let credentials = {
    nameDB: null,
    emailDB: null,
    passwordDB: null,
}

router.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

router.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 }
}));

router.get("/", (req, res) => {
    if (req.session.userid) {
        res.render("dashboard", { title: "Dashboard" })
    } else {
        res.render("base", { title: "Red Bill" });
    }
});

router.post('/login', (req, res) => {

    if (credentials.emailDB == null) {
        res.render("base", { title: "Login Page", invalid: "First Create a account" })
    }
    if (req.body.email == credentials.emailDB && req.body.password == credentials.passwordDB) {
        req.session.userid = req.body.email;
        if (req.session.userid) {

            res.redirect('/router/dashboard')

        } else {
            res.render("base", { title: "Login Page", logout: "Please login again" })
        }

    } else {

        res.render("base", { title: "Login Page", invalid: "Invalid Username & Password" })
    }
});

//route for dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.userid) {

        res.render("dashboard", { title: "Dashboard" })
    } else {
        res.render("base", { title: "Login Page", logout: "Please login again" })
    }


})

//route for logout

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.setHeader('Cache-Control', 'no-store');
    res.render("base", { title: "Logout", logout: "Logout successfully" })

});


module.exports = router;
module.exports.credentials = credentials;