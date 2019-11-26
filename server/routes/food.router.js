const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


/**
 * PUT to flip invite to ATTENDING=false 
 **/
// router.put('/reject', (req,res)=>{
//     // //console.log('in event reject invite put');
//     // const queryText=`UPDATE "user_event" SET "attending"=FALSE WHERE "event_id"=$2 AND user_id=$1`;
//     // const queryValues=[req.user.id, req.body.eventId];
//     // pool.query(queryText,queryValues
//     //     ).then(
//     //         res.sendStatus(200)
//     //     ).catch((error)=>{
//     //         console.log('Error PUT /event/reject', error);
//     //         res.sendStatus(500);
//     //     })
// })

// router.delete('/:id', async (req,res)=>{
//     console.log('in event delete');
//     const client = await pool.connect();
//     //should first check the user is the host of this event 

//     try{ 
//         await client.query('BEGIN');
//         //set up delete of all rows in user_event
//         const queryUserEventText=`DELETE FROM "user_event" where event_id=$1`
//         const queryValues=[req.params.id];
//         await client.query(queryUserEventText,queryValues);
//         //will also need to delete food records when foods are added
//         //now delete the event record 
//         const queryEventText=`DELETE FROM "event" where id=$1`;
//         await client.query(queryEventText,queryValues);
//         //commit the changes
//         await client.query('COMMIT')
//         res.sendStatus(201);
//     } catch (error) {
//         await client.query('ROLLBACK')
//         console.log('Error delete /event', error);
//         res.sendStatus(500);
//     } finally {
//         client.release();
//     }
// })



// router.get('/:eventId', (req,res)=>{
//     //select all upcoming events the user is flagged as the host for
//     // const queryText=`select * from "event" 
//     // WHERE host_id=$1 AND end_time>=CURRENT_DATE`;
//     // const queryValues=[req.user.id];
//     // pool.query(queryText,queryValues
//     //     ).then(results=>{
//     //         res.send(results.rows);
//     //     }).catch((error)=>{
//     //         console.log('Error GET /event/hosting', error);
//     //         res.sendStatus(500);
//     //     })

// })

/**
 * POST route to add a new food, called on form submit
 */
router.post('/', async (req, res) => {
    console.log('in food post');
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
        console.log(restrictionMet);

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