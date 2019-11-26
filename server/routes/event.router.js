const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


/** 
 * GET USER'S INVITED EVENTS
**/
router.get(`/invites`, async(req,res)=>{
    //console.log('in event invite get');
    const queryText=`SELECT e.id, e.title, e.start_time, e.host_id FROM "event" e 
    JOIN user_event ue ON ue.event_id=e.id
    JOIN "user" u ON ue.invited_email=u.email
    WHERE u.id=$1 AND  ue.attending IS NULL`
    const queryValues=[req.user.id];
    
    pool.query(queryText,queryValues
        ).then(results=>{
            res.send(results.rows);
        }).catch((error)=>{
            console.log('Error GET /event/invites', error);
            res.sendStatus(500);
        })
})

/**
 * PUT to flip invite to ATTENDING=true and add user_id
 **/
router.put('/accept', (req,res)=>{
    console.log('in event accept invite put');
    const queryText=`UPDATE "user_event" SET "user_id"=$1, "attending"=TRUE WHERE "event_id"=$2`;
    const queryValues=[req.user.id, req.body.eventId];
    pool.query(queryText,queryValues
        ).then(
            res.sendStatus(200)
        ).catch((error)=>{
            console.log('Error PUT /event/accept', error);
            res.sendStatus(500);
        })
})

/**
 * PUT to flip invite to ATTENDING=false 
 **/
router.put('/reject', (req,res)=>{
    //console.log('in event reject invite put');
    const queryText=`UPDATE "user_event" SET "attending"=FALSE WHERE "event_id"=$2 AND user_id=$1`;
    const queryValues=[req.user.id, req.body.eventId];
    pool.query(queryText,queryValues
        ).then(
            res.sendStatus(200)
        ).catch((error)=>{
            console.log('Error PUT /event/reject', error);
            res.sendStatus(500);
        })
})

router.delete('/:id', async (req,res)=>{
    console.log('in event delete');
    const client = await pool.connect();
    //should first check the user is the host of this event 

    try{ 
        await client.query('BEGIN');
        //set up delete of all rows in user_event
        const queryUserEventText=`DELETE FROM "user_event" where event_id=$1`
        const queryValues=[req.params.id];
        await client.query(queryUserEventText,queryValues);
        //will also need to delete food records when foods are added
        //now delete the event record 
        const queryEventText=`DELETE FROM "event" where id=$1`;
        await client.query(queryEventText,queryValues);
        //commit the changes
        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error delete /event', error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
})

//get list of events the user is attending 
router.get('/attending', (req,res)=>{
    //get for the current user and only events where attedning is true 
    //also make sure it's only the list of upcoming events but show any for the current day incase of long events 
    const queryText=`select e.* from "event" e 
    JOIN user_event ue ON ue.event_id=e.id
    JOIN "user" u ON ue.user_id=u.id
    WHERE u.id=$1 AND ue.attending=TRUE AND e.end_time>=CURRENT_DATE`;
    const queryValues=[req.user.id];
    pool.query(queryText,queryValues
        ).then(results=>{
            res.send(results.rows);
        }).catch((error)=>{
            console.log('Error GET /event/attending', error);
            res.sendStatus(500);
        })

})

router.get('/hosting', (req,res)=>{
    //select all upcoming events the user is flagged as the host for
    const queryText=`select * from "event" 
    WHERE host_id=$1 AND end_time>=CURRENT_DATE`;
    const queryValues=[req.user.id];
    pool.query(queryText,queryValues
        ).then(results=>{
            res.send(results.rows);
        }).catch((error)=>{
            console.log('Error GET /event/hosting', error);
            res.sendStatus(500);
        })

})

/**
 * POST route to create a new event 
 */
router.post('/', async (req, res) => {
    //console.log('in event post');
    const client = await pool.connect();
    try {
        const {
            title,
            description,
            date,
            startTime,
            endTime,
            location,
            alerts,
            invitedEmail,
            user,
            startDateTime,
            endDateTime,
        } = req.body;
        

        await client.query('BEGIN');
        //add the event to the event table  and grab the assigned id
        const addQuery=`INSERT INTO "event" ( "title" , "description" , "location" , "start_time" , "end_time" , "host_messages" , "host_id") 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`
        const addValues=[title, description, location, startDateTime, endDateTime, alerts, user];
        const eventAdded=await client.query(addQuery,addValues);
        const eventId = eventAdded.rows[0].id;

        //add event host to the user_event table and flag as attending-->NEEDS EMAIL because NOT NULL CONSTRAINT NOT NECESSARY ANYMORE
        // const hostEventAdd=`INSERT INTO "user_event" ( "user_id", "event_id", "attending") VALUES ($1, $2, TRUE)`;
        // const hostEventValues=[req.user.id, eventId];
        // await client.query(hostEventAdd,hostEventValues);

        //add invitation to the user_event table
        const userEventAdd=`INSERT INTO "user_event" ( "invited_email", "event_id" ) VALUES ($1, $2)`;
        const addUserEventValues=[invitedEmail,eventId];
        await client.query(userEventAdd,addUserEventValues);

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