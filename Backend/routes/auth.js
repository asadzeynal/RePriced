const express = require('express');
const passport = require('passport');
const auth = require('../controllers/auth');

const router = express.Router();

/**
 * @swagger
 *
 * /auth:
 *   post:
 *     description: Login to the application
 *     tags:
 *      - auth
 *     produces:
 *       - application/json
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                description: Username to use for login
 *                required: true
 *                type: string
 *              password:
 *                description: User's password
 *                required: true
 *                type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/auth', passport.authenticate('local'), auth.login);

/**
 * @swagger
 *
 * /logout:
 *   post:
 *     description: Logout from the application
 *     tags:
 *      - auth
 *     produces:
 *       - application/json
 *     cookieAuth:
 *      type: apiKey
 *      in: cookie
 *      name: connect.sid
 *     responses:
 *       200:
 *         description: logout
 */
router.post('/logout', auth.logout);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.isTemp) {
      res.redirect(`${process.env.URL}/continuesignup`);
    } else {
      res.redirect(`${process.env.URL}`);
    }
  });

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.isTemp) {
      res.redirect(`${process.env.URL}/continuesignup`);
    } else {
      res.redirect(`${process.env.URL}`);
    }
  });

router.get('/auth/vk', passport.authenticate('vkontakte', { scope: ['email'] }));

router.get('/auth/vk/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.isTemp) {
      res.redirect(`${process.env.URL}/continuesignup`);
    } else {
      res.redirect(`${process.env.URL}`);
    }
  });

module.exports = router;
