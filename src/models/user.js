const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateEmail = require('email-validator');

const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: 0,
      validate(val) {
        if (val < 0) {
          throw new Error('Age must be a positive number');
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(val) {
        if (!validateEmail.validate(val)) {
          throw new Error('Invalid E-mail provided');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(val) {
        if (
          val.toLowerCase().includes('12345678') ||
          val.toLowerCase().includes('password')
        ) {
          throw new Error('Weak password provided');
        }
      },
    },
    authTokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.getUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Login Failed...');
  }

  const passwordMatch = await bcryptjs.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Login Failed');
  }

  return user;
};

// Attaching generateAuthToken method on `User` model instances
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET, {
    expiresIn: '14 days',
  });

  user.authTokens = user.authTokens.concat({ token });
  await user.save();
  return token;
};

// Method to sanitize user model data before sending it to users
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.authTokens;
  delete userObj.password;
  return userObj;
};

// Hashing the password before save
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
