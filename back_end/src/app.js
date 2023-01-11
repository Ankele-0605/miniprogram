const express = require("express");
const bodyParser = require("body-parser");
var { expressjwt } = require("express-jwt");
const mongoose = require("mongoose");
const router = require("./route/index");
const app = express();
// 静态资源使用（例）：http://localhost:8888/public/images/lunbo1.png
app.use("/public", express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//配置expressjwt中间件
// app.use(
//   expressjwt({
//     secret: "hello_token",
//     algorithms: ["HS256"],
//   }).unless({
//     //用户第一次登录的时候不需要验证token
//     path: ["/api/login", "/api/list"],
//   })
// );

// app.use(async (req, res, next) => {
//   var token = req.headers["authorization"];
//   if (!token) {
//     return next();
//   } else {
//     try {
//       var data = await getToken(token);
//       req.data = data;
//       return next();
//     } catch (e) {
//       return next();
//     }
//   }
// });

async function main() {
  await mongoose.connect("mongodb://localhost:27017/miniprograme"); //连接本地数据库
}
main();

app.use("/api", router);

//错误处理中间件
app.use(function (err, req, res, next) {
  res.status(500).send(err.message);
});

app.listen(8888, () => {
  console.log("listening 8888 ...");
});
