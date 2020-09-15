const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const giveaway = require('../controllers/giveaway');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

/**
 * @swagger
 *
 * /giveaways:
 *   get:
 *     description: Get giveaways
 *     tags:
 *      - giveaway
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Request status - inited, approved, winnerSelected, productShipped,
 *           productDelivered
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Giveaways
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/Giveaway'
 */
router.get('/giveaways', giveaway.getGiveaways);

/**
 * @swagger
 *
 * /giveaways/{id}:
 *   get:
 *     description: Get giveaway
 *     tags:
 *      - giveaway
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Giveaway ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Giveaway
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Giveaway'
 */
router.get('/giveaways/:id', giveaway.getGiveaway);


/**
 * @swagger
 *
 * /giveaways:
 *   post:
 *     description: Create giveaway
 *     tags:
 *      - giveaway
 *     produces:
 *       - application/json
 *     cookieAuth:
 *      type: apiKey
 *      in: cookie
 *      name: connect.sid
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Giveaway'
 *     responses:
 *       200:
 *         description: Created Giveaway
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Giveaway'
 */
router.post('/giveaways', auth, giveaway.createGiveaway);

/**
 * @swagger
 *
 * /giveaways/{id}/users:
 *   post:
 *     description: Add new participant to giveaway
 *     tags:
 *      - giveaway
 *     produces:
 *       - application/json
 *     cookieAuth:
 *      type: apiKey
 *      in: cookie
 *      name: connect.sid
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Giveaway ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Giveaway
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Giveaway'
 */

router.post('/giveaways/:id/users', auth, giveaway.addGiveawayParticipant);

/**
 * @swagger
 *
 * /giveaways/{id}:
 *   delete:
 *     description: Delete Giveaway
 *     tags:
 *      - giveaway
 *     produces:
 *       - application/json
 *     cookieAuth:
 *      type: apiKey
 *      in: cookie
 *      name: connect.sid
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Giveaway ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Giveaway Deleted
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Giveaway'
 */
router.delete('/giveaways/:id', auth, giveaway.deleteGiveaway);

/**
 * @swagger
 *
 * /giveaways/{id}:
 *   delete:
 *     description: Perform an action with giveaway. Depends on Status that is sent in body
 *     tags:
 *      - giveaway
 *     produces:
 *       - application/json
 *     cookieAuth:
 *      type: apiKey
 *      in: cookie
 *      name: connect.sid
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name: status
 *              type: string
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Giveaway ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *            type: object
 *            properties:
 *              name: winnerId
 *              type: integer
 */

router.patch('/giveaways/:id', auth, giveaway.modifyGiveaway);

router.post('/giveaways/photos', auth, upload.single('photo'), giveaway.uploadPhoto);

module.exports = router;
