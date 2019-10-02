const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const urlDataSchema = new Schema({
    shortCodeId:{type:mongoose.Schema.Types.ObjectId,ref:'shortUrl'},
    timestamp:{type:Date},
    browser:String,
    ip:String,
    country:String,
    os:String
});
// exporting module
module.exports = mongoose.model('shotCodeData',urlDataSchema);