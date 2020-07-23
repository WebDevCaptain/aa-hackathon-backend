const express = require('express');
const validateEmail = require('email-validator');

const authMiddleware = require('../middleware/authentication');

const router = new express.Router();

// User Model
const User = require('../models/user');
const {
  accountCreationMail,
  accountDeletionMail,
} = require('../utils/emails/account');

// User Account SignUp, LogIn, Logout and Revoke Sessions routes
router.post('/users/login', async (req, res) => {
  try {
    const email = req.body.email;
    const isValidEmail = validateEmail.validate(email);

    if (!isValidEmail) {
      return res.status(400).send({
        message: 'Invalid Email Provided',
      });
    }

    const user = await User.getUser(email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({
      user,
      token,
    });
  } catch {
    res.status(400).send({
      message: 'Bad Credentials',
    });
  }
});

router.post('/users/signup', async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();
    accountCreationMail(user.email, user.name);
    res.status(201).send({
      user,
      token,
    });
  } catch {
    res.status(400).send({
      message: 'Invalid data provided',
    });
  }
});

router.post('/users/logout', authMiddleware, async (req, res) => {
  try {
    req.user.authTokens = req.user.authTokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send({
      message: 'Logged out successfully',
    });
  } catch {
    res.status(500).send({
      message: 'Cannot be processed',
    });
  }
});

router.post('/users/revokeAll', authMiddleware, async (req, res) => {
  try {
    req.user.authTokens = [];
    await req.user.save();
    res.send({
      message: 'Revoked all sessions successfully',
    });
  } catch {
    res.status(500).send({
      message: 'Cannot be processed',
    });
  }
});

// User Profile routes
router.get('/users/me', authMiddleware, async (req, res) => {
  res.send(req.user);
});

router.patch('/users/me', authMiddleware, async (req, res) => {
  const body = req.body;
  const updates = Object.keys(body);

  if (updates.length === 0) {
    return res.status(400).send({
      message: 'Invalid updates..',
    });
  }

  const allowedUpdates = ['name', 'age', 'email', 'password'];
  const isValidUpdate = updates.every((item) => allowedUpdates.includes(item));

  if (!isValidUpdate) {
    return res.status(400).send({
      message: 'Invalid updates..',
    });
  }

  try {
    const user = req.user;
    updates.forEach((item) => {
      user[item] = body[item];
    });

    await user.save();
    res.send(user);
  } catch {
    res.status(500).send({
      message: 'Cannot process the request',
    });
  }
});

router.delete('/users/me', authMiddleware, async (req, res) => {
  try {
    await req.user.remove();
    accountDeletionMail(req.user.email, req.user.name);
    res.send(req.user);
  } catch {
    res.status(500).send({
      message: 'Cannot process the request',
    });
  }
});

module.exports = router;
