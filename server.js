const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(
  express.json({
    extended: false,
  })
);

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/dataset", require("./routes/api/dataset"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
