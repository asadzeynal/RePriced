const express = require('express');
const auth = require('../middleware/auth');
const user = require('../controllers/user');

const router = express.Router();

// TODO Add to swagger
router.put('/users/update', user.updateProfile);

router.get('/users/me', auth, user.getMe);
/**
 * @swagger
 *
 * /users:
 *   get:
 *     description: Get all users
 *     tags:
 *      - user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: users
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.get('/users', user.getUsers);

/**
 * @swagger
 *
 * /users/products:
 *   get:
 *     description: Get authorized user\'s products
 *     tags:
 *      - user
 *     produces:
 *       - application/json
 *     cookieAuth:
 *      type: apiKey
 *      in: cookie
 *      name: connect.sid
 *     responses:
 *       200:
 *         description: user giveaways
 */
router.get('/users/products/', auth, user.getUserProducts);

// TODO: Add to swagger
router.get('/users/products/winner', auth, user.getGiveawaysWonByUser);
router.get('/users/products/participant', auth, user.getParticipatingGiveaways);
/**
 * @swagger
 *
 * /users/{id}:
 *   get:
 *     description: Get all users
 *     tags:
 *      - user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: users
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.get('/users/:id', user.getUser);

/**
 * @swagger
 *
 * /users:
 *   post:
 *     description: Create new user
 *     tags:
 *      - user
 *     produces:
 *       - application/json
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User Created
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.post('/users', user.createUser);

/**
 * @swagger
 *
 * /users/me:
 *   delete:
 *     description: Delete Authenticated User
 *     tags:
 *      - user
 *     produces:
 *       - application/json
 *     cookieAuth:
 *      type: apiKey
 *      in: cookie
 *      name: connect.sid
 *     responses:
 *       200:
 *         description: User Deleted
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.delete('/users/me', auth, user.deleteUser);

router.post('/users/confirmation/', user.confirmEmail);


module.exports = router;
