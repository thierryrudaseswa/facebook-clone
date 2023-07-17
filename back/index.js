const express = require("express");
const multer = require("multer");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const ConversationRoute = require("./routes/conversation");
const { router, eventEmitter } = require("./routes/message");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addUser = (userId) => {
  // const user = {userId,socketId};
  // const user = {userId,socketId};
  // const isOnline = onlineUsers.some((user)=>user.userId===userId);
  const isOnline = onlineUsers.includes(userId);
  if (!isOnline) {
    onlineUsers.push(userId);
  }
};

const removeUser = (userId) => {
  onlineUsers = onlineUsers.filter((user) => user !== userId);
  // const index = onlineUsers.findIndex((user)=>user.socketId===socketId);
  // if(index !== -1){
  //   onlineUsers.splice(index,1)
  // }
};
const clear = setInterval(() => {
  eventEmitter.emit("clear");
}, 1000);

process.on("SIGTERM", () => {
  clearInterval(clear);
});


io.on("connection", (socket) => {
  // console.log("a user connected successfully");
  // addUser(socket.id);

  socket.on("ping", (data) => {
    addUser(data);
    io.emit("onlineusers", onlineUsers);
  });

  eventEmitter.on("message", (data) => {
    socket.emit("message", data);
  });
  eventEmitter.on("clear", () => {
    onlineUsers = [];
    console.log("clear....");
  });
  socket.on("disconnect", () => {
    console.log(" a user diconnected");
    removeUser(socket.id);
    io.emit("onlineUsers", onlineUsers);
  });
});

const cors = require("cors");
dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/social")
  .then(() => {
    app.listen(5500, () => {
      console.log("the app is running at port 5500");
    });
  })
  .catch((err) => {
    console.log("error in correction");
  });

app.use("/images", express.static(path.join(__dirname, "public/images")));
// middleware
app.use(
  cors({
    origin: "*",
  })
);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded successfully");
  } catch (err) {
    console.log(err);
  }
});

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/user", userRoute);
app.use("/api/conversation", ConversationRoute);
app.use("/api/message", router);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
server.listen(5000, function () {
  console.log(`socket Listening on port 5500`);
});
