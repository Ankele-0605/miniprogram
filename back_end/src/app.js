const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var { expressjwt } = require("express-jwt");
const { setToken, getToken } = require("./utils/token");
const router = require("./route/index");
const app = express();
// 静态资源使用（例）：http://localhost:8888/public/images/lunbo1.png
app.use("/public", express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function main() {
  await mongoose.connect("mongodb://localhost:27017/miniprograme"); //连接本地数据库
}
main().catch((err) => console.log(err));

//配置expressjwt中间件
app.use(
  expressjwt({
    secret: "hello_token",
    algorithms: ["HS256"],
  }).unless({
    //用户第一次登录的时候不需要验证token
    path: ["/api/user/login", "/^/api/*/"],
  })
);

app.use(async (req, res, next) => {
  var token = req.headers["authorization"];
  if (!token) {
    return next();
  } else {
    try {
      var data = await getToken(token);
      req.data = data;
      return next();
    } catch (e) {
      return next();
    }
  }
});

app.use("/api", router);

//错误处理中间件
app.use(function (err, req, res, next) {
  if (err.status == 401) {
    //可以设置返回json 形式
    res.json({ status: 401, code: -1, message: "token失效" });
  } else {
    res.status(500).send(err.message);
  }
});

app.listen(8888, () => {
  console.log("listening 8888 ...");
});
