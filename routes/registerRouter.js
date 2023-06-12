const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const { credentials } = require("./router")

router.use(bodyParser.urlencoded({ extended: true }));

const Emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let errors = [];
router.get("/register", (req, res) => {
    res.render("register");
})
router.post("/register", (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (name == "" || email == "" || password == "" || confirmPassword == "") {
        errors.push("Please fill in all fields");
    }
    if (!Emailregex.test(email)) {
        errors.push("Email is not valid");
    }
    if (password !== confirmPassword) {
        errors.push("Password is not same")
    }
    // res.render("register",{errorMessage:errors})
    if (errors.length === 0) {
        try {
            credentials.nameDB = name;
            credentials.emailDB = email;
            credentials.passwordDB = password;
        } catch (ex) {
            console.log(ex);
        }
        res.render("base", { logout: "Account created successfully" })
    } else {

        console.log(email);
        console.log(errors);
        res.render("register", { errorMessage: errors });
        errors = [];
    }

})


module.exports = router;
