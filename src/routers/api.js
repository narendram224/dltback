const router  = require('express').Router();
const urlData = require('../model/urlData');
const dbConntion = require('../dbConnetion/dbconntion');
const apiController = require('../controllers/api.contoller');
const ShortModel = require('../model/shortUrl');
router.get('/',(req,res)=>{
         res.send("Server is running");
});
router.post('/new',apiController.inserShotCode);
router.get('/:ShortCode',apiController.storData);
router.get('/total',apiController.totalCount);
router.get('/byDate',apiController.getVisitorByDate);
router.get('/byCountry',apiController.getVisotorByCountry);
router.get('/byBrowser',apiController.getVisotorByBrowser);
router.get('/byOs',apiController.getVisotorByOs);
// exporting module
module.exports = router;