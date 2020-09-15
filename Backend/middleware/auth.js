const auth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send();
  }
  if (!req.user.isTemp && !req.user.isApproved) {
    return res.status(401).send();
  }
  next();
};

module.exports = auth;
