const { Schema, model, Types } = require('mongoose');

const eventSchema = new Schema({
  title: { type: String, required: true },
  start: { type: String, required: true },
  end:   { type: String, required: true },
  desc:  { type: String},
});

module.exports = model('Event', eventSchema);