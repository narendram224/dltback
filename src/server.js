const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const port  = process.env.PORT ||3000;
const api = require('./routers/api');

// middleware
const useragent = require('express-useragent');

app.use(useragent.express());
app.use ( bodyParser.json());
app.use(cors());

// routers and path
// var UserAgent = new useragent().parse(navigator.useragent);
    // console.log(UserAgent);
    
 app.use('/',api);
// app.get('/:id', function (req, res) {
//     // res.send('ab(cd)?e')
//     const str = req.params.id;
//     const newconst = str.slice(-1);
//     res.send(newconst);
//   })
app.listen(port,()=>{
    console.log("server is running on port->",port);
});