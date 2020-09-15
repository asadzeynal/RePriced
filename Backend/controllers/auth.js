const redirectUrl = require('../config/auth');

const login = async (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(500);
    res.send({ message: 'Not Found' });
  }
};

const authCallback = async (req, res) => {
  res.redirect(`${redirectUrl}`);
};

const logout = (req, res) => {
  try {
    req.session.destroy();
    res.send();
  } catch (error) {
    res.status(400).send();
  }
};

module.exports = {
  login,
  logout,
  authCallback,
};
