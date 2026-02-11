const express = require("express");
const app = express();
const path = require("path");

const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/HostRouter");

app.set("view engine", "ejs");
app.set("views", "views");

// body parser
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static(path.join(__dirname, "public")));

// 🔥 IMPORTANT: store routes use /store
app.use(storeRouter)
app.use("/store", storeRouter);
app.use("/host", hostRouter);


// optional: make localhost:3002 work
app.get("/", (req, res) => {
  res.redirect("/store/homes");
});

// 404 handler (ALWAYS LAST)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
