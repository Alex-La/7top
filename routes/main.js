const router = require("express").Router();
const User = require("../models/User");
const { paginateResults, getAvatarPath } = require("../utils");

router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find();
    const allUsers = paginateResults({
      results: users,
      pageSize: 10,
      after: req.query.after,
    });

    res.json({
      allUsersLength: users.length,
      cursor: allUsers.length ? allUsers[allUsers.length - 1]._id : null,
      hasMore: allUsers.length
        ? allUsers[allUsers.length - 1]._id !== users[users.length - 1]._id
        : false,
      allUsers: allUsers.map(({ _doc }) => ({
        ..._doc,
        avatar: getAvatarPath({ id: _doc._id }),
      })),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
