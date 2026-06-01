const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt"); //Hashning
const jwt = require("jsonwebtoken"); //JWT

// @desc Register new user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  //hämtar username, email och password från req body
  const { username, email, password } = req.body;
  //kontrollerar att alla fält är ifyllda
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Alla fält måste fyllas i");
  }
  //kontrollerar att e-post inte redan är registrerad
  const userAvailable = await User.findOne({ email });
  //om eposten redan finns i db skickas error tillbaka
  if (userAvailable) {
    res.status(400);
    throw new Error("E-post är redan registrerad");
  }
  //Hashning
  //hashar lösenordet med bcrypt och salt rounds 10
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashedPassword);
  //skapar en ny användare i db med den info som skickats in
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (!user) {
    res.status(400);
    throw new Error("Ogiltig användardata");
  }
  //skickar tillbaka den nya användarens id, username och email som json (inte lösenordet)

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
  //hämtar username och password från req body
  const { username, password } = req.body;
  //kontrollerar att båda fälten är ifyllda
  if (!username || !password) {
    res.status(400);
    throw new Error("Alla fält måste fyllas i");
  }
  //kontrollerar att användaren finns i db med username
  const userAvailable = await User.findOne({ username });
  //kontrollerar att användaren finns och att det hashade lösenordet i db matchar det som skickats in
  if (
    userAvailable &&
    (await bcrypt.compare(password, userAvailable.password))
  ) {
    //skapar en token med användarinfo

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
    //skickar tillbaka token som json
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
