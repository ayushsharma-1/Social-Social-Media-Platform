require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const app = express();

// middleware
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

//api
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB Kilo"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));


app.get("/", (req, res) => {
    res.send(`
        <html>
            <body>
                <button><a href="http://localhost:${process.env.PORT}/portfolio">Go to Portfolio</a></button>
            </body>
        </html>
    `);
});

app.get("/portfolio", (req, res) => {
    res.redirect("https://ayushsharma.site");
});


// server connection
app.listen(process.env.PORT, () => {
  console.log(`Backend is running on http://localhost:${process.env.PORT}`);
});
