const express = require("express");
const app = express();
const port = 5000;

const config = require("./config/key");
const { User } = require("./models/User"); //유저 모델을 가져온다.

const bodyParser = require("body-parser"); //req.body
app.use(bodyParser.urlencoded({ extended: true })); //application/x-www-form-urlencode을 분석해서 가져오도록 한다.
app.use(bodyParser.json()); //application/json 타입을 분석해서 가져오도록한다.

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connceted..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! hi~");
});

app.post("/register", (req, res) => {
  //회원 가입할 때 필요한 정보들을 clinet에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  }); // mongoDB Method
});

app.post("/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        login: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
  });
  //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 지 확인한다.
  userInfo.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch)
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
  });
  //비밀번호까지 맞다면 토큰을 생성한다.
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
