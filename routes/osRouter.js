var express = require('express');
var router = express.Router();
const osController = require('../controllers/osController');
/* GET home page. */
router.get('/', osController.getOsInformation); 
   
module.exports = router;
router.get('/getOsInformation', osController.getOsInformation );

module.exports = router;
