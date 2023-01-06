const express = require("express");
const router = express.Router();
const Goods = require("../models/goods");
const Sort = require("../models/sort");

//商品数据
router.get("/goods", async (req, res) => {
  let result = await Goods.find();
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});
//分类数据
router.get("/sort", async (req, res) => {
  let result = await Sort.find();
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});

module.exports = router;
