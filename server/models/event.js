const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

//start랑 end number일수도 있음
const eventSchema = mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  start: { 
    type: String, 
    required: true 
  },
  end:   { 
    type: String, 
    required: true 
  },
  desc:  { 
    type: String
  },
  role: { //관리자를 만들기 위해서 default를 0이면 일반임
    type: Number,
    default : 0
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }

});

const event = mongoose.model('event', eventSchema)

module.exports = { event }


/*
//참고용 db model
//https://github.com/KJH940526/simple-event-calendar-node-react-mongoDB/blob/master/models/event.js
const { Schema, model, Types } = require('mongoose');

const eventSchema = new Schema({
    start: { type: Number, required: true },
    duration: { type: Number, required: true },
    title: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'User' }
});

module.exports = model('Event', eventSchema);
*/