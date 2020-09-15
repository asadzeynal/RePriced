const userService = require('../services/user');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
};

const getUserProducts = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      res.status(404).send();
      return;
    }
    const giveaways = await userService.getUserProducts(user);
    res.send(giveaways);
  } catch (e) {
    res.status(500).send();
  }
};

const getGiveawaysWonByUser = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      res.status(404).send();
      return;
    }
    const giveaways = await userService.getGiveawaysWonByUser(user);
    res.send(giveaways);
  } catch (e) {
    res.status(500).send();
  }
}

const getParticipatingGiveaways = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      res.status(404).send();
      return;
    }
    const giveaways = await userService.getParticipatingGiveaways(user);
    res.send(giveaways);
  } catch (error) {
    res.status(500).send();
  }
}

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser({ id: req.params.id });
    if (!user) {
      res.status(404).send();
      return;
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
};


const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
};


const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.user.id);
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

const confirmEmail = async (req, res) => {
  try {
    await userService.confirmEmail(req.body.tokenHash, req.user);
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

const getMe = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send();
  }
}

const updateProfile = async (req, res) => {
  try {
    await userService.updateProfile(req.body);
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send();
  }
}

module.exports = {
  getUsers,
  getUserProducts,
  getUser,
  createUser,
  deleteUser,
  confirmEmail,
  getMe,
  updateProfile,
  getGiveawaysWonByUser,
  getParticipatingGiveaways,
};
