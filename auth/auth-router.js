const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');


router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.user_password, 10);
    user.user_password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let {user_name, user_password} = req.body;

    Users.findBy(user_name)
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(user_password, user.user_password)) {
                req.session.logged_in = true;
                req.session.user_id = user.id;
                res.status(200).json({
                    message: `Welcome ${user.user_name}!`,
                    sessionStuff: req.session
                });
            } else {
                res.status(401).json({message: 'Invalid Credentials'});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/logout', (req, res) => {
    if (req.session && req.session.logged_in) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({message: 'You can checkout but you can never leave.'});
            } else {
                res.status(200).json({message: 'Thanks for your time.'});
            }
        });
    } else {
        res.json({message: 'You are not logged in.'});
    }

});

module.exports = router;
