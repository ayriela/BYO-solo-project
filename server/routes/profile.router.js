const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {


});


/** *
 * PUT route for user profile update
*/
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
router.put('/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        const restrictions = req.body.restriction;
        //console.log(restrictions);
        await client.query('BEGIN')
        const queryText1 = `UPDATE  "user" SET "username"=$1,"email"=$2 WHERE "id"=$3`
        const queryValues1 = [req.body.username, req.body.email, req.params.id]
        await client.query(queryText1, queryValues1);
        await Promise.all(restrictions.map(res => {
            //console.log('active', res.active, 'id', res.id, 'res', res);
            const updateRestrictionItem = `UPDATE "user_restriction" SET "active" = $1 WHERE "user_id" = $2 AND  "id" = $3`;
            const updateRestrictionValues = [res.active, req.params.id, res.id];
            return client.query(updateRestrictionItem, updateRestrictionValues);
        }));
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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;