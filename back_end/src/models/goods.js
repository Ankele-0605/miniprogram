const mongoose = require("mongoose");

const GoodsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  parent_id: Number,
  price: String,
  sold_num: Number,
  cover_pic: String,
  detail_pic: Array,
  hot: Number,
  cart:Boolean,
  like:Boolean

});

const Goods = mongoose.model("Goods", GoodsSchema, "goods");


module.exports = Goods;
