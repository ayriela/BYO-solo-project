const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/*
*PUT TO UPDATE THE USER'S PROFILE
*/
router.put('/:id', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();
    try {
        //console.log('in profile router /:id', req.body, req.params.id);
        const restrictions = req.body.restriction;
        //console.log(restrictions);
        await client.query('BEGIN')
        const queryText1 = `UPDATE  "user" SET "username"=$1,"email"=$2 WHERE "id"=$3`
        const queryValues1 = [req.body.username, req.body.email, req.params.id]
        await client.query(queryText1, queryValues1);
        await Promise.all(restrictions.map(res => {
            //console.log('active', res.active, 'id', res.id, 'res', res);
            const updateRestrictionItem = `UPDATE "user_restriction" SET "active" = $1 WHERE "user_id" = $2 AND  "restriction_id" = $3`;
            const updateRestrictionValues = [res.active, req.params.id, res.id];
            return client.query(updateRestrictionItem, updateRestrictionValues);
        }));
        const newresults=await client.query(`SELECT * FROM "user_restriction" WHERE "user_id"=${req.params.id}`);
        //console.log('here are the new results', newresults.rows);

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /profile/user id', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
})


module.exports = router;