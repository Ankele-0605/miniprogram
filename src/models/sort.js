const mongoose = require("mongoose");

const SortSchema = new mongoose.Schema({
  id: Number,
  name: String,
  child: Array,
});

const Sort = mongoose.model("Sort", SortSchema, "sort");

module.exports = Sort;
