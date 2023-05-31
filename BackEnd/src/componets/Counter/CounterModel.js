const mongoose = require('mongoose')
const CounterSchema = mongoose.Schema({
    id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
module.exports.counter = mongoose.model('counter', CounterSchema);