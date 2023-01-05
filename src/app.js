const express = require('express');
const mongoose = require('mongoose');
const router = require('./route/index');
const app = express();



async function main() {
  await mongoose.connect("mongodb://localhost:27017/miniprograme");//连接本地数据库
}
main();

app.use(router);

app.listen(8888, () => {
    console.log('listening 8888 ...');
})