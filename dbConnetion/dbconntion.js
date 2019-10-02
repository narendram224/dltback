const db = 'mongodb://root:root224@ds039467.mlab.com:39467/dltbackend';
const mongoose = require('mongoose');
mongoose.connect(db,{ useNewUrlParser: true },(err)=>{
    if (err) {
        console.log("not connted db");
        
    }else{
        console.log("database connted sucessfully");
        
    }
});
module.exports = mongoose;