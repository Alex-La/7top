const router = require("express").Router();
const User = require("../models/User");
const { paginateResults } = require("../utils");

router.get("/allusers", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json({
      allUsersLength: allUsers.length,
      allUsers: paginateResults({
        results: allUsers,
        pageSize: 5,
        after: req.query.after,
      }),
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
