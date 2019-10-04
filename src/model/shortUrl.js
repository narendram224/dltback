const mongoose = require('mongoose');
const shortUrlSchema  = mongoose.Schema({
    shortCode:String,
    originalUrl:String
});
// exporiting module
module.exports = mongoose.model('shortUrl',shortUrlSchema);