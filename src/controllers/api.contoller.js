const ShortModel = require('../model/shortUrl');
const UrlData = require('../model/urlData');
const dns   = require('dns');
const nanoid = require('nanoid');
const axios = require('axios');
const useragent = require('express-useragent');
const express = require('express');
const app = express();
app.use(useragent.express());

module.exports.storData = async(req,res)=>{
    const shortId = req.params.ShortCode;
    const shotcodePlus = shortId.slice(-1);
     if (shotcodePlus==='+') {
      console.log("plus is found");
      const newStr = shortId.slice(0,-1); 
                // an get api call which give the data acccounding to the short id
                // await ShortModel.findOne({shortCode:newStr},(err,data)=>{
                //   if (data) {
                //        UrlData.find({shortCodeId:data._id},(err,result)=>{
                //               if (result) {
                                 
                              // res.status(200).send(result);
                               
                               res.redirect('http://localhost:4200/dashboard');
      //                         } else {
      //                             res.status(404).send(err);
      //                         }
      //                  })
      //             } else {
      //                 res.status(404).send("data not found");
      //             }
      // });
    
    }
    else{
      await checkExistorNot(shortId)
      .then(doc => {
        if (doc === null) {return res.send(' We cannot find any Data in this url');}
        // this else if run when + sign enters
        else{
          //   res.send(doc);
          //   apicall for storeing someinfo about devicwe os timestamp etc...
           axios.get('http://api.ipstack.com/check?access_key=f60d46789f4402236f999a4aec0999bd')
          .then(response => {
              // console.log(response.data);
                  let ShortDataobj =  new UrlData({
                      shortCodeId:doc._id,
                           os:req.useragent.os,
                       browser:req.useragent.browser,
                      timestamp:new Date(),
                      bowser:req.useragent.bowser,
                      country:response.data.country_name,
                      ip:response.data.ip
                  });
                ShortDataobj.save((err,successdoc)=>{
                      if (err) {
                          // res.status(403).send(err)
                      }else{
                          // res.status(200).send(successdoc);
                      }
                  });
  
              //   res.send(ShortDataobj);
          })
          .catch(error => {
              res.status(404).json({
                message:"Data not found",
                success:false,
                error
              });
          });
        }
  
        res.redirect(doc.originalUrl)
      })
      .catch(error => {
        res.status(404).json({
          message:"Data not found",
          success:false,
          error
        });
    });
    }
}
module.exports.inserShotCode = async(req,res)=>{
    let originalUrl;
    try {
      originalUrl = new URL(req.body.url);
    } catch (err) {
      return res.status(400).send({ error: 'invalid URL' });
    }
    dns.lookup(originalUrl.hostname, (err) => {
      if (err) {
        return res.status(404).send({ error: 'Address not found' });
      };
    });
    await ShortModel.findOneAndUpdate({ originalUrl: originalUrl.href },
        {
          $setOnInsert: {
              originalUrl: originalUrl.href,
              shortCode: nanoid(5),
          },
        },
        {
          returnOriginal: false,
          upsert: true,
        }
      ).then((response)=>{
          res.status(200).json({
                originalUrl: response.originalUrl,
                shortCode: response.shortCode,
              });   
      }).catch((error)=>{
          res.status(404).send(error);
      }); 
}

module.exports.getVisitorByDate  = async(req,res)=>{
  UrlData.aggregate(
    [
        { $match: {} },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
    ]
).then((mydoc)=>{
  res.status(200).send(mydoc);
  
}).catch((error)=>{
res.status(404).json({
  success:false,
  message:"Data not Found",
  error
});
});

// .then(doc => {
//     /* if you need a date object */
//     doc.forEach(function(value, index) {
//           doc[index]._id = new Date(value._id);
//       }, this);
//     console.log(doc);
    
// }).catch(reject);
}
module.exports.getVisotorByCountry  = async(req,res)=>{
  UrlData.aggregate([
    {"$group" : {_id:"$country", count:{$sum:1}}}
]).then((mydoc)=>{
  res.status(200).send(mydoc);
  
}).catch((error)=>{
res.status(404).json({
  success:false,
  message:"Data not Found",
  error
});
});
}
module.exports.getVisotorByBrowser  = async(req,res)=>{
  UrlData.aggregate([
    {"$group" : {_id:"$browser", count:{$sum:1}}}
]).then((mydoc)=>{
  res.status(200).send(mydoc);
  
}).catch((error)=>{
res.status(404).json({
  success:false,
  message:"Data not Found",
  error
});
});
}
module.exports.getVisotorByOs  = (req,res)=>{
  UrlData.aggregate([
    {"$group" : {_id:"$os", count:{$sum:1}}}
]).then((mydoc)=>{
    res.status(200).send(mydoc);
    
}).catch((error)=>{
  res.status(404).json({
    success:false,
    message:"Data not Found",
    error
  });
});
}

module.exports.totalCount=(req,res)=>{
    UrlData.count().then((count)=>{res.status(200).send({count})})
    .catch((erorr)=>{
      res.status(404).json({
        message:"Data not found",
        success:false,
        erorr
      })
    })
}
// functions
  const checkExistorNot = (code) => ShortModel
  .findOne({ shortCode: code });