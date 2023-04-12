const express = require("express");
const fsExtra = require("fs-extra");

const router = express.Router();

// @route  GET api/models
router.get("/:projId/:modelsId", (req, res) => {
  const fileId = req.params.modelsId;
  const projId = req.params.projId;

  const resFile = fsExtra.readJSONSync(
    `routes/${projId}/Models_${fileId}.json`
  );
  res.json(resFile);
  res.send(req.body);
});

// @route  POST api/models
router.post("/:projId/:modelsId", (req, res) => {
  const fileId = req.params.modelsId;
  const projId = req.params.projId;

  fsExtra.outputJsonSync(
    `routes/${projId}/Models_${fileId}.json`,
    req.body,
    (err) => {
      console.log(err);
    }
  );

  res.sendStatus(res.statusCode);
});

module.exports = router;
