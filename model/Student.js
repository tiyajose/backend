const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const student_Details = new Schema({
    name: String,
    age: Number,
    location: String,
})
const Studentdata = mongoose.model('Student', student_Details);
module.exports = Studentdata;
