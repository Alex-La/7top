const router = require("express").Router();
const glob = require("glob");
const path = require("path");
const { verifyToken } = require("../utils");
const fs = require("fs");

router.post("/upload", verifyToken, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let uplFile = req.files.file;
  console.log("req.body: ", req.body.userId);
  console.log(uplFile);
  const extension = uplFile.name.split(".").pop();
  const imgPath = path.resolve(
    "avatars",
    "",
    `${req.body.userId}.${extension}`
  );
  const folderPath = path.resolve("avatars", "");
  glob(folderPath + `/${req.body.userId}.*`, {}, (_, files) => {
    console.log(files);
    if (files.length > 0) {
      try {
        for (const file of files) {
          fs.unlinkSync(file);
          console.log("avatar deleted");
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
    }
    uplFile.mv(imgPath, (err) => {
      if (err) return res.status(500).send(err);
      console.log("avatar uploaded");
      res.send("File uploaded!");
    });
  });
});

module.exports = router;
