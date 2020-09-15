const tempUserService = require('../services/tempUser');

const getTempUser = async (req, res) => {
  try {
    if (req.user.isTemp === false) {
      res.status(400).send();
    }
    // const user = await tempUserService.getTempUser({ id: req.user.id });
    // if (!user) {
    //   res.status(404).send();
    //   return;
    // }
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

const deleteTempUser = async (req, res) => {
  try {
    await tempUserService.deleteTempUser(req.user.id);
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  getTempUser,
  deleteTempUser,
};
