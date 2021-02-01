const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser"); //req.body

const { User } = require("./models/User"); //유저 모델을 가져온다.

app.use(bodyParser.urlencoded({ extended: true })); //application/x-www-form-urlencode을 분석해서 가져오도록 한다.
app.use(bodyParser.json()); //application/json 타입을 분석해서 가져오도록한다.

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://wyjeon:<password>@cluster0.ofgqd.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connceted..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
