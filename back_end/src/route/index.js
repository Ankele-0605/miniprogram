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


// 根据商品id获取商品
router.get("/getGoodsById/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Goods.find({ id: id });

  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});

// 根据商品hot字段获取热搜榜商品
router.get('/getGoodsByHot/:hot', async (req, res) => {
  let id = req.params.id;
  let result = await Goods.find({ "hot": { $ne: 20 } });
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});

// 分类页面通过每个年级对应id获取商品列表
router.get('/getrecom/:id', async (req, res) => {
  let id = req.params.id;
  let result = await Goods.find({ "parent_id": id });
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});
// 购物车
router.get('/cart', async (req, res) => {
  let result = await Goods.find({ "cart": true });
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});
// 收藏
router.get('/like', async (req, res) => {
  let result = await Goods.find({ "like": true });
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});


// 删除购物车
router.post('/delcart', async (req, res) => {
  const idarr = req.body.ideld;
  for (var i = 0; i < idarr.length; i++) {
    await Goods.updateOne(
      { id: idarr[i] },
      { $set: { cart: false } }
    );
  }  
  let result = await Goods.find({ id: id });
  res.json({
    code: 200,
    message: "已删除",
    data: result
  })
});

// 加入购物车
router.get('/addcart/:id', async (req, res) => {
  let id = req.params.id;
  await Goods.updateOne(
    { id: id },
    { $set: { cart: true } });
  let result = await Goods.find({ id: id });
  res.json({
    code: 200,
    message: "success",
    data: result
  });
});

// 加入收藏
router.get('/addCollection/:id', async (req, res) => {
  let id = req.params.id;
  await Goods.updateOne(
    { id: id },
    { $set: { like: true } });
  let result = await Goods.find({ id: id });
  res.json({
    code: 200,
    message: "success",
    data: result
  });
});

// 取消收藏
router.post('/delCollection', async (req, res) => {
  const idarr = req.body.delId;
  for (var i = 0; i < idarr.length; i++) {
    await Goods.updateOne(
      { id: idarr[i] },
      { $set: { like: false } }
    );
  }
  let result = await Goods.find({ id: 27 });
  res.json({
    code: 200,
    message: "已删除",
    data: result
  })
});




module.exports = router;
