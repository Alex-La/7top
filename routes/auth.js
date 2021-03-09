const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const config = require("config");
const sendMail = require("../middleware/sendMail");
const auth = require("../middleware/auth");
const { getAvatarPath } = require("../utils");

router.post(
  "/restore-password",
  [check("email", "Incorrect email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { email } = req.body;
      try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          const user = await User.findOne({ email });
          if (user !== null) {
            const userName = user.name;
            const token = jwt.sign({ email }, config.get("jwtSecret"), {
              expiresIn: "1h",
            });
            const url = `http://7top.org/new-password/${token}`;
            const isSent = await sendMail(
              email,
              req.app.get("transporter"),
              url,
              userName
            );
            if (isSent) {
              return res.json({ ok: true });
            }
            return res
              .status(400)
              .json({ message: "We can't send you an email right now" });
          } else {
            return res
              .status(400)
              .json({ message: "User with this email doesn't exist" });
          }
        }
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Something went wrong, try again" });
      }
    } else {
      return res.status(400).json({ message: "Email is not valid" });
    }
  }
);

router.post("/verify-restore-token", async (req, res) => {
  const { token } = req.body;
  if (token) {
    try {
      const { email } = jwt.verify(token, config.get("jwtSecret"));
      return res.status(200).json({ ok: true, email });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
});

router.post(
  "/confirm-password",
  [
    check("password", "Min length of password is 6 symbols").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { email, password } = req.body;
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.findOneAndUpdate(
          { email },
          { password: hashedPassword }
        );
        return res.status(200).json({ ok: true });
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Something went wrong, try again" });
      }
    } else {
      return res.status(400).json({
        errors: errors.array(),
        message: errors.array()[0].msg,
      });
    }
  }
);

router.post(
  "/login",
  [check("password", "Insert password").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Incorrect data on login" });
      }

      const { name, password } = req.body;
      const user = await User.findOne({ name });
      if (!user) return res.status(400).json({ message: "User is not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ message: "Incorrect password, try again" });

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
      console.log(e);
    }
  }
);

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    res.json({
      _id: user._id,
      name: user.name,
      wallet: user.wallet,
      avatar: getAvatarPath({ id: user._id }),
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
    console.log(e);
  }
});

module.exports = router;
