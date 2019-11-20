const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {  

  const client = await pool.connect();

  try{
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;

  //start transaction
  await client.query('BEGIN')

  //grab all restrictions 
  const currentRestriction= await client.query('SELECT "id" FROM "restriction"');
  const allCurrentRestriction=currentRestriction.rows;

  //add our new user
  const queryText = 'INSERT INTO "user" (username, password, email) VALUES ($1, $2, $3) RETURNING id';
  const registerResult=await client.query(queryText, [username, password, email]);
  const myId = registerResult.rows[0].id;

  //create the user_restrction records for the new user
  await Promise.all(allCurrentRestriction.map(res => {
    const insertLineItemText = `INSERT INTO "user_restriction" ("user_id", "restriction_id") VALUES ($1, $2)`;
    const insertLineItemValues = [myId, res.id];
    return client.query(insertLineItemText, insertLineItemValues);
  }));
  //commit the changes
  await client.query('COMMIT')
  res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('Error POST /user/register', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
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
// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
