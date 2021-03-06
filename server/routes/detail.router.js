const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//get list of users attending the event  
router.get('/attendees/:id', rejectUnauthenticated, (req,res)=>{
   const queryText=`SELECT u.id  FROM "user_event" ue JOIN "user" u ON u."id"=ue."user_id" 
   WHERE event_id=$1 AND ue.attending=true 
   UNION ALL
   SELECT u.id FROM "user" u JOIN "event" e ON u.id=e.host_id 
   WHERE e.id=$1`;
   const queryValues=[req.params.id];
   pool.query(queryText,queryValues
       ).then(results=>{
           res.send(results.rows);
       }).catch((error)=>{
           console.log('Error GET /details/attendees', error);
           res.sendStatus(500);
       })

})

//get the  count of the attendees and host
router.get('/attendee/count/:id', rejectUnauthenticated, (req,res)=>{
    const queryText=`SELECT COUNT(u.id) from "user" u WHERE u.id IN 
    ( SELECT u.id  FROM "user_event" ue JOIN "user" u ON u."id"=ue."user_id" 
    WHERE event_id=$1 AND ue.attending=true 
    UNION ALL
    SELECT u.id FROM "user" u JOIN "event" e ON u.id=e.host_id 
    WHERE e.id=$1 )`;
    const queryValues=[req.params.id];
    pool.query(queryText,queryValues
        ).then(results=>{
            res.send(results.rows[0]);
        }).catch((error)=>{
            console.log('Error GET /details/attendee/count', error);
            res.sendStatus(500);
        })
})

//get the full list of restrictions for the attendees and host
router.get('/attendee/restrictions/:id', rejectUnauthenticated, (req,res)=>{
    //console.log(req.params.id);
    const queryText=`SELECT r."id",r."category", COUNT(r."id") as total_with_allergy 
    FROM "restriction" r
    JOIN "user_restriction" ur ON ur."restriction_id"=r."id"
    WHERE ur."active"=TRUE AND ur."user_id" IN (SELECT u.id  FROM "user_event" ue JOIN "user" u ON u."id"=ue."user_id" 
    WHERE event_id=$1 AND ue.attending=true 
    UNION ALL
    SELECT u.id FROM "user" u JOIN "event" e ON u.id=e.host_id 
    WHERE e.id=$1)  
    GROUP BY r."id"`;
    queryValues=[req.params.id];
    pool.query(queryText,queryValues
        ).then(results=>{
            res.send(results.rows);
        }).catch((error)=>{
            console.log('Error GET /details/attendee/restrictions', error);
            res.sendStatus(500);
        })

})


module.exports = router;