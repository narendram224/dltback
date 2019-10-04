const router  = require('express').Router();
const axios = require('axios');
const dbConntion = require('../dbConnetion/dbconntion');
const apiController = require('../controllers/api.contoller');

router.get('/',(req,res)=>{
        // res.send("from api routes");
    
        res.send("Server is running");
  
});



router.post('/new',apiController.inserShotCode);

router.get('/byDate',apiController.getVisitorByDate);
router.get('/byCountry',apiController.getVisotorByCountry);
router.get('/byBrowser',apiController.getVisotorByBrowser);
router.get('/byOs',apiController.getVisotorByOs);

 router.get('/:ShortCode',apiController.storData);

 


// exporting module
module.exports = router;