const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt"); //Hashning
const jwt = require("jsonwebtoken"); //JWT

// @desc Register new user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Alla fält måste fyllas i");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("E-post är redan registrerad");
  }
  //Hashning
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (!user) {
    res.status(400);
    throw new Error("Ogiltig användardata");
  }

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

// @desc Login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Alla fält måste fyllas i");
  }
  const userAvailable = await User.findOne({ username });

  if (
    userAvailable &&
    (await bcrypt.compare(password, userAvailable.password))
  ) {
    const accessToken = jwt.sign(
      {
        user: {
          username: userAvailable.username,
          email: userAvailable.email,
          id: userAvailable._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" },
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Ogiltiga inloggningsuppgifter");
  }
});
// @desc Get current user
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
