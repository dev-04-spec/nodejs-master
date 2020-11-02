const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'My Express App',
        message: 'Hello Manoj'
    })
})

module.exports = router;