const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.delete('/:id', async (req,res)=>{
    //console.log('in food delete');
    const client = await pool.connect();
    //should first check the user is the owner of the food event 

    try{ 
        await client.query('BEGIN');
        //set up delete of all rows in food_restriction
        const queryUserEventText=`DELETE FROM "food_restriction" where food_id=$1`
        const queryValues=[req.params.id];
        await client.query(queryUserEventText,queryValues);
        
        //now delete the food record 
        const queryEventText=`DELETE FROM "food" where id=$1`;
        await client.query(queryEventText,queryValues);
        //commit the changes
        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error delete /food', error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
})



router.get('/:eventId', (req,res)=>{
    //select all foods being brought to the event and its restrictions 
    const queryText=`	select f.id, f.name, f.ingredients, f.user_id, array_agg(r.category) AS restriction from "food" f 
        FULL JOIN  "food_restriction" fr ON f.id=fr.food_id 
        FULL JOIN  "restriction" r ON fr.restriction_id=r.id
        WHERE f.event_id=$1
        GROUP BY f.id, f."name", f.ingredients, f.user_id`;
    const queryValues=[req.params.eventId];
    pool.query(queryText,queryValues
        ).then(results=>{
            res.send(results.rows);
        }).catch((error)=>{
            console.log('Error GET /food/:eventId', error);
            res.sendStatus(500);
        })

})


/**
 * POST route to add a new food, called on form submit
 */
router.post('/', async (req, res) => {
    //console.log('in food post');
    const client = await pool.connect();
    try {
        const {
         name,
         ingredients,
         restriction,
         eventId
        } = req.body;

        //filter the restriction array down to values only for bool=TRUE
        const restrictionMet=restriction.filter(res=>res.bool===true);
        //console.log(restrictionMet);

        //add check that the user is actually who is logged in 

        await client.query('BEGIN');
        //add the food to the food table  and grab the assigned id
        const addQuery=`INSERT INTO "food" ( "name" , "ingredients", "user_id", "event_id" ) 
        VALUES ($1, $2, $3, $4) RETURNING id;`
        const addValues=[name, ingredients, req.user.id, eventId];
        const foodAdded=await client.query(addQuery,addValues);
        const foodId = foodAdded.rows[0].id;

       //loop through and add the user_added restricitons to food_restrictions 

        //add the restrictions that are flagged as false to the food_restrictions table 
        await Promise.all(restrictionMet.map(res => {
            const foodRestrictionAdd=`INSERT INTO "food_restriction" ( "food_id", "restriction_id" ) VALUES ($1, $2)`;
            const foodRestrictionValues=[foodId,res.id];
            return client.query(foodRestrictionAdd,foodRestrictionValues);
        }));
     

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /event', error);
        res.sendStatus(500);
    } finally {
        client.release();
    }

});

module.exports = router;