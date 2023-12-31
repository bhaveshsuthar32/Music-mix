require("express-async-errors");
const express = require("express");
const cors = require("cors");
const DBconnection = require("./config/db");
const userRoutes = require("./routes/userRoute");
const songRoutes = require("./routes/songRoute");
const playlistRoutes = require("./routes/playlist.route");
const searchRoutes = require("./routes/search.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/spotify/users", userRoutes);
app.use("/spotify/songs", songRoutes);
app.use("/spotify/playlists", playlistRoutes);
app.use("/spotify", searchRoutes);

app.get("/", async (req, res) => {
  res.json({
    msg: "welcome Spotify backend",
    Routes: `${"/spotify/users/" + "\n"} ${"/spotify/login/" + "\n"} ${
      "/spotify/songs/" + "\n"
    }  ${"/spotify/playlists/" + "\n"}  ${("/spotify/", "for search" + "\n")}`,
  });
});

app.listen(8080, async () => {
  await DBconnection;
  console.log("DB connected");
  console.log("Server is running on port 8080");
});
