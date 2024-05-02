const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const path = require("path");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const bcrypt = require("bcrypt");
const os = require("os");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("SERVICE SERVER 3001");
});

let origin_addr = 'http://52.62.249.221:3000';
if (os.version().includes('Windows')) {
    origin_addr = 'http://localhost:3000';
}

app.use(cors({
    origin: origin_addr,
    credentials: true,
}));

// routes
const userRouter = require("./routes/userRouter");
const marketRouter = require("./routes/marketRouter");

app.use("/user", userRouter);
app.use("/market", marketRouter);

app.listen(3001);
