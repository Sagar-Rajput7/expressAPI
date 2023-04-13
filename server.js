const express = require("express");
var cors = require("cors");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(
  express.json({
    extended: false,
  })
);

app.get("/", (req, res) => res.send("API Running"));
//deploy app
app.get("/deploy", (req, res) => {
  const dockerDeploy = spawn("docker", [
    "run",
    "--platform",
    "linux/amd64",
    "-p",
    "8081:5000",
    "-d",
    "flask",
  ]);

  dockerDeploy.stdout.on("data", (data) => {
    console.log(data.toString());
    res.write(data.toString());
  });

  dockerDeploy.stderr.on("data", (data) => {
    console.error(data.toString());
    res.write(data.toString());
  });

  dockerDeploy.on("close", (code) => {
    if (code === 0) {
      res.end("Docker container deployed successfully!");
    } else {
      res
        .status(500)
        .end(`Docker container deployment failed with code ${code}`);
    }
  });
});

// Define Routes
app.use("/api/dataset", require("./routes/api/dataset"));
app.use("/api/models", require("./routes/api/models"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
