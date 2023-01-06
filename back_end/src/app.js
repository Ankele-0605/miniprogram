const express = require('express');
const mongoose = require('mongoose');
const router = require('./route/index');
const app = express();


async function main() {
  await mongoose.connect("mongodb://localhost:27017/miniprograme");//连接本地数据库
}
main();

app.use("/api", router);

//错误处理中间件
app.use(function (err, req, res, next) {
    res.status(500).send(err.message)
})

app.listen(8888, () => {
    console.log('listening 8888 ...');
})