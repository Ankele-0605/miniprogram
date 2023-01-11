var jwt = require("jsonwebtoken");
var jwtScrect = "hello_token"; //签名

function setToken(obj) {
  return new Promise((resolve, reject) => {
    try {
      var token = jwt.sign(obj, jwtScrect, { expiresIn: "24h" });
      resolve(token);
    } catch (e) {
      reject(e);
    }
  });
}

function getToken(token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject({
        error: "token 是空的",
      });
    } else {
      var info = jwt.verify(token.split(" ")[1], jwtScrect);
      resolve(info);
    }
  });
}

module.exports = {
    setToken,
    getToken
}
