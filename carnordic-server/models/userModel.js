const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Lägg till ett namn"],
    },
    email: {
      type: String,
      required: [true, "Lägg till en e-post"],
      unique: [true, "E-post måste vara unik"],
    },
    password: {
      type: String,
      required: [true, "Lägg till ett lösenord"],
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
