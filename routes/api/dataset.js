const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

const router = express.Router();

// @route  GET api/page

router.get("/:datasetId", (req, res) => {
  res.json({
    dataset: {
      datasetId: req.params.datasetId,
    },
  });
});

module.exports = router;
