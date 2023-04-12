const express = require("express");
const fsExtra = require("fs-extra");

const router = express.Router();

// @route  GET api/dataset
router.get("/:projId/:datasetId", (req, res) => {
  const fileId = req.params.datasetId;
  const projId = req.params.projId;

  const resFile = fsExtra.readJSONSync(`routes/${projId}/${fileId}.json`);
  res.json(resFile);
  res.send(req.body);
});

// @route  POST api/dataset
router.post("/:projId/:datasetId", (req, res) => {
  const fileId = req.params.datasetId;
  const projId = req.params.projId;

  fsExtra.outputJsonSync(`routes/${projId}/${fileId}.json`, req.body, (err) => {
    console.log(err);
  });

  res.sendStatus(res.statusCode);
});

module.exports = router;
