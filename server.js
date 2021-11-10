const express = require("express");
const { ExpressPeerServer } = require("peer");
const cors = require("cors");
const app = express();
const path = require("path");

app.enable("trust proxy");

const corsOptions = {
    origin: "https://quickstream.web.app/",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log("Press Ctrl+C to quit.");
});

const peerServer = ExpressPeerServer(server, {
    path: "/",
});

app.use(express.static("templates"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "templates", "index.html"));
});

app.get("/stream", (req, res) => {
    res.sendFile(path.resolve(__dirname, "templates", "stream.html"));
});

app.get("/watch", (req, res) => {
    res.sendFile(path.resolve(__dirname, "templates", "watch.html"));
});

app.use("/peerjs", peerServer);

module.exports = app;
