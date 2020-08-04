const mongoose = require('mongoose');

// //start랑 end number일수도 있음
const eventSchema = mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    // unique: true
  },
  start: { 
    type: {Date}, 
    required: true 
  },
  end:   { 
    type: {Date}, 
    required: true 
  },
  desc:  { 
    type: String
  },
});
            //아틀라스나 db 들거가는 모델이름 아틀라스 들어가면 
            //복수형이라서 calendars라는 스키마가 새로 생김
const Event = mongoose.model('calendar', eventSchema)

module.exports = { Event }



//참고용 db model
//https://github.com/KJH940526/simple-event-calendar-node-react-mongoDB/blob/master/models/event.js

// const eventSchema = mongoose.Schema({
//     start: 
//     { type: Number, 
//       required: true 
//     },
//     end: { 
//       type: Number, 
//       required: true 
//     },
//     title: { 
//       type: String, 
//       required: true 
//     },
//     desc: { 
//       type: String
//     }
// });

// const Event = mongoose.model('calendar', eventSchema)

// module.exports = { Event }
