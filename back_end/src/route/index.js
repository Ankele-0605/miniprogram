const { application } = require("express");
const { setToken, getToken } = require("../utils/token");
const express = require("express");
const request = require("request");
const router = express.Router();
const Goods = require("../models/goods");
const Sort = require("../models/sort");

//登录
router.post("/login", (req, res) => {
  const { code } = req.body;
  //获取code登录凭证之后，根据code appid  secret向微信服务器发送请求索要openid和session_key
  let options = {
    method: "POST",
    url: "https://api.weixin.qq.com/sns/jscode2session?",
    formData: {
      appid: "wx9128aa96381acedf",
      secret: "9eb6d61cebe33a4033af1ec57633d4a0",
      js_code: code,
      grant_type: "authorization_code",
    },
  };
  request(options, async (error, response, body) => {
    if (error) {
      res.json({
        message: error.message,
        code: -1,
        data: null,
      });
    } else {
      let _data = JSON.parse(body);
      if (_data.errcode) {
        res.json({
          code: -1,
          message: _data.errmsg,
          data: null,
        });
        return;
      }
      //openid就是用户的唯一标识
      var openid = _data.openid;
      //session_key会话密钥
      var session_key = _data.session_key;

      //根据openid看当前对应的用户是否存在，如果不存在，则创建一个用户；

      //登录成功 ：自定义登录状态 (token)  并且把自定义的token返回给浏览器
      let token = await setToken({
        openid,
        session_key,
      });
      res.json({
        code: 200,
        message: "登录成功",
        data: {
          token: token,
        },
      });
    }
  });
});

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
router.get("/getGoodsByHot/:hot", async (req, res) => {
  let id = req.params.id;
  let result = await Goods.find({ hot: { $ne: 20 } });
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});

// 分类页面通过每个年级对应id获取商品列表
router.get("/getrecom/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Goods.find({ parent_id: id });
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});
// 购物车
router.get("/cart", async (req, res) => {
  let result = await Goods.find({ cart: true });
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});
// 收藏
router.get("/like", async (req, res) => {
  let result = await Goods.find({ like: true });
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});

// 删除购物车
router.post("/delcart", async (req, res) => {
  const idarr = req.body.ideld;
  for (var i = 0; i < idarr.length; i++) {
    await Goods.updateOne({ id: idarr[i] }, { $set: { cart: false } });
  }
  res.json({
    code: 200,
    message: "已删除",
  });
});

// 加入购物车
router.get("/addcart/:id", async (req, res) => {
  let id = req.params.id;
  await Goods.updateOne({ id: id }, { $set: { cart: true } });
  let result = await Goods.find({ id: id });
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});

// 加入收藏
router.get("/addCollection/:id", async (req, res) => {
  let id = req.params.id;
  await Goods.updateOne({ id: id }, { $set: { like: true } });
  let result = await Goods.find({ id: id });
  res.json({
    code: 200,
    message: "success",
    data: result,
  });
});

// 取消收藏
router.post("/delCollection", async (req, res) => {
  const idarr = req.body.delId;
  for (var i = 0; i < idarr.length; i++) {
    await Goods.updateOne({ id: idarr[i] }, { $set: { like: false } });
  }
  res.json({
    code: 200,
    message: "已删除",
  });
});

module.exports = router;
