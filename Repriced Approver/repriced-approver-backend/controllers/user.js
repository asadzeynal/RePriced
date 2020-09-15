const userService = require('../services/user');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (e){
    res.status(500).send();
  }
};

module.exports = {
  getUsers
};
