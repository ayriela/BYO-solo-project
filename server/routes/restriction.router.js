const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText='SELECT * FROM restriction'
    pool.query(queryText)
    .then(result=>{
        res.send(result.rows)})
    .catch(error =>{
        console.log('Error on select restriction', error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;