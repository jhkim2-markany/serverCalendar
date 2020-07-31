const express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
const app = express();  //express를 실행하여 app object를 초기화 합니다
const port = 5000;  // 사용할 포트 번호를 port 변수에 넣습니다. 

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

// const cookieParser = require("cookie-parser");

//클라이언트에서 가져오는 정보를 분석해서 가져올수 있게 한다.
app.use(bodyParser.urlencoded({ extended: true }));
//클라이언트에서 json 타입으로 된것을 분석해서 가져온다.
app.use(bodyParser.json());


app.use(express.json({ extended: true }));
//express에서 제공되는 모듈 -> app.
// app.use(cookieParser());

const { Event } = require("./models/event");


mongoose.connect('mongodb+srv://JWTEX:TIGER@jwt-rkkz2.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false,
  }).then(() => console.log("DB Connected..."))
    .catch((err) => console.log(err));




app.get('/', (req, res)=>{ // '/' 위치에 'get'요청을 받는 경우,
  res.send('Hello World!'); // "Hello World!"를 보냅니다.
  });
  
//??? 데이터가 없으면 저장하고 있으면 수정한다.
//--------------------------------------------------
/*

app.post('/event',(req,res)=>{
  let {title, end, start, desc, _id} = req.body
  Event.findOne({title: req.body.title},(err,obj)=>{
    console.log(obj)        //db에 똑같은거 2번 넣어서 null 아니게 해보셈
    if(obj === null){
    const event = new Event(req.body)
    event.save((err, calendarInfo)=>{
      if(err) return res.json({ success: false, err})
      return res.status(200).json({success: true})
    }) //--성공 
    } else {
      Event.findOneAndUpdate(
        {_id : _id }, // 검색조건
        {title: title, start: start, end: end, desc: desc}, 
        { upsert : true }, //
        (err, eventInfo)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).send({
          success:true
        })
      })
    }
  })
})
*/


app.post("/event", (req, res) => { //err,obj 잘 모르겠다
  let { title, end, start, desc, _id } = req.body;
  let query = { title, end, start, desc, _id }; //_id만 있어도 됨 일단 가지고 있자
  console.log(query._id);  //아이디가 없으면 undefined가 뜬다.
  if (query._id === undefined) {
    query._id = new mongoose.Types.ObjectId();  //undefined이면 오브젝트 아이디를 만드러줌
  } // _id가 없으면 만들어준다
  console.log("modified : " + query._id);
  Event.findOneAndUpdate(
    { _id: query._id }, // 검색조건
    { title: title, start: start, end: end, desc: desc}, //바꾸는 값들
    { upsert: true }, // 데이터가 없으면 새로만든다
    (err, eventInfo) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});


app.listen(port, ()=>{  // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
  console.log(`server on! http://localhost:${port}`); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});