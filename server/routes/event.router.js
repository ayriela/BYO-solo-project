const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/* 
router.post('/', async (req, res) => {
    const client = await pool.connect();

    try {
        const {
            customer_name,
            street_address,
            city,
            zip,
            type,
            total,
            pizzas
        } = req.body;
        await client.query('BEGIN')
        const orderInsertResults = await client.query(`INSERT INTO "orders" ("customer_name", "street_address", "city", "zip", "type", "total")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;`, [customer_name, street_address, city, zip, type, total]);
        const orderId = orderInsertResults.rows[0].id;

        await Promise.all(pizzas.map(pizza => {
            const insertLineItemText = `INSERT INTO "line_item" ("order_id", "pizza_id", "quantity") VALUES ($1, $2, $3)`;
            const insertLineItemValues = [orderId, pizza.id, pizza.quantity];
            return client.query(insertLineItemText, insertLineItemValues);
        }));

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/order', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
}); */
/* state={
    title: '',
    description: '',
    date: '',
    startTime:'',
    endTime:'',
    location: '',
    alerts:'',
    invitedEmail:'',
    user: this.props.user.id,
} */
//get restriction details for the particular user


/**
 * POST route template
 */
router.post('/', async (req, res) => {
    console.log('in event post');
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
        const addQuery=`INSERT INTO "event" ( "title" , "description" , "location" , "start_time" , "end_time" , "host_messages" , "host_id") 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`
        const addValues=[title, description, location, startDateTime,endDateTime, alerts, user];
        const eventAdded=await client.query(addQuery,addValues);
        const eventId = eventAdded.rows[0].id;

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