const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//GET all restrictions and details for the restriction table
router.get('/all', rejectUnauthenticated, (req, res) => {
    const queryText=`select "id", "category", "details", "question_word" from "restriction"`;
    pool.query(queryText)
    .then(result=>{
        res.send(result.rows)})
    .catch(error =>{
        console.log('Error on select all restriction detail', error);
        res.sendStatus(500);
    })
});


//get restriction details for the particular user
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText=`select r.id, r.category, ur.active from "user_restriction" ur
                    JOIN "restriction" r ON (ur.restriction_id=r.id)
                    where "user_id"=$1`;
    const queryValues=[req.params.id];
    pool.query(queryText,queryValues)
    .then(result=>{
        res.send(result.rows)})
    .catch(error =>{
        console.log('Error on select user restriction', error);
        res.sendStatus(500);
    })
});


module.exports = router;