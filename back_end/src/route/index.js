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
// 分类页面通过每个年级对应id获取商品列表
router.get('/getrecom/:id',async (req,res)=>{
  let id = req.params.id;
  // console.log(id);
  let result = await Goods.find( {"parent_id":id });
  // console.log(result);
 
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});
// 购物车
router.get('/cart',async (req,res)=>{
  let result = await Goods.find({"cart":true });
  // console.log(result);
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});
// 收藏
router.get('/like',async (req,res)=>{
  let result = await Goods.find({"like":true });
  // console.log(result);
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});





module.exports = router;
