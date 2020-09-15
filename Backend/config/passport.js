/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const models = require('../models');
const userService = require('../services/user');

passport.serializeUser((user, done) => {
  done(null, { _id: user.id, isTemp: user.isTemp });
});
passport.deserializeUser(async (sessionData, done) => {
  let user;
  if (sessionData.isTemp === false) {
    user = await userService.getUser({ id: sessionData._id });
    if (!user) {
      done(null, false);
    }
    user.isTemp = false;
  } else {
    user = await models.TempUserModel.findOne({ where: { id: sessionData._id } });
    if (!user) {
      done(null, false);
    }
    user.isTemp = true;
  }
  done(null, user);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (username, password, done) => {
  try {
    const user = await models.UserModel.findByCredentials(username, password);
    user.isTemp = false;
    return done(null, user);
  } catch (e) {
    return done(null, false);
  }
}));

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    const userData = {
      email: profile.emails[0].value,
      name: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      isApproved: profile.emails[0].verified,
      accessToken,
      refreshToken,
    };
    let user = await userService.getUser({ email: userData.email });
    let isTemp = false;
    if (!user) {
      user = await models.TempUserModel.findOne({ where: { email: userData.email } });
      isTemp = true;
    }
    if (!user) {
      user = await models.TempUserModel.create(userData);
    }
    user.isTemp = isTemp;
    done(null, user);
  },
));

passport.use(new FacebookStrategy({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: process.env.FB_CALLBACK_URL,
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
}, async (accessToken, refreshToken, profile, done) => {
  const userData = {
    email: profile.emails[0].value,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    isApproved: profile.emails[0].verified,
    accessToken,
    refreshToken,
  };
  let user = await userService.getUser({ email: userData.email });
  let isTemp = false;
  if (!user) {
    user = await models.TempUserModel.findOne({ where: { email: userData.email } });
    isTemp = true;
  }
  if (!user) {
    user = await models.TempUserModel.create(userData);
  }
  user.isTemp = isTemp;
  done(null, user);
}));

passport.use(new VKontakteStrategy({
  clientID: process.env.VK_CLIENT_ID,
  clientSecret: process.env.VK_CLIENT_SECRET,
  callbackURL: process.env.VK_CALLBACK_URL,
  profileFields: ['email', 'bdate', 'verified'],
}, async (accessToken, refreshToken, params, profile, done) => {
  let gender = '';
  if (profile.gender === 'male') {
    gender = 'm';
  } else if (profile.gender === 'female') {
    gender = 'f';
  }
  const userData = {
    email: params.email,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    username: profile.username,
    isApproved: profile.verified,
    vkontakteId: profile.id,
    gender,
    accessToken,
    refreshToken,
  };
  let user = await userService.getUser({ vkontakteId: userData.vkontakteId });
  let isTemp = false;
  if (!user) {
    user = await models.TempUserModel.findOne({ where: { vkontakteId: userData.vkontakteId } });
    isTemp = true;
  }
  if (!user) {
    user = await models.TempUserModel.create(userData);
  }
  user.isTemp = isTemp;
  done(null, user);
}));
