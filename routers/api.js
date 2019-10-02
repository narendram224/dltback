const router  = require('express').Router();
const axios = require('axios');
const urlData = require('../model/urlData');
const dbConntion = require('../dbConnetion/dbconntion');
const apiController = require('../controllers/api.contoller');
const ShortModel = require('../model/shortUrl');
router.get('/',(req,res)=>{
        // res.send("from api routes");
        axios.get('http://api.ipstack.com/check?access_key=f60d46789f4402236f999a4aec0999bd')
    .then(response => {
        // console.log(response);
        // console.log(response.data);
        res.send(response.data);
    })
    .catch(error => {
        console.log(error);
    });
});



router.post('/new',apiController.inserShotCode);

router.get('/byDate',apiController.getVisitorByDate);
router.get('/byCountry',apiController.getVisotorByCountry);
router.get('/byBrowser',apiController.getVisotorByBrowser);
router.get('/byOs',apiController.getVisotorByOs);

 router.get('/:ShortCode',apiController.storData);

 


// exporting module
module.exports = router;