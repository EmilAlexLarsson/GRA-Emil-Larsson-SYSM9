const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.json({ message: "Hämta alla produkter" });
});
router.route("/:id").get((req, res) => {
  res.json({ message: `Hämta produkt med ID ` });
});

module.exports = router;
