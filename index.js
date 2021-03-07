const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const Mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: "bot@7top.org",
    pass: "UFK5Y73Okm",
  },
});

const app = express();
const server = require("http").createServer(app);

app.use(express.json({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("transporter", transporter);
app.use("/api/tron", require("./routes/tron"));
app.use("/api/main", require("./routes/main"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const connectToMongo = async () => {
  try {
    await Mongoose.connect(config.get("mongoUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.log("Mongo Error", e.message);
    process.exit(1);
  }
};

connectToMongo();

const PORT = config.get("PORT");
server.listen(PORT, () => {
  console.log("🚀 Server ready at", `https://localhost:${PORT}`);
});
