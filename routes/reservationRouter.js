var express = require('express');
var router = express.Router();
const reservationController = require('../Controller/reservationController');
/* GET home page. */
router.get('/getAllReservation', reservationController.getAllReservation );
router.get('/getReservationById/:id', reservationController.getReservationById );
router.post('/addReservation', reservationController.addReservation );
router.put('/updateVoyage/:id', reservationController.updateReservation );
router.put('/affect', reservationController.affect );
router.put('/desaffect', reservationController.desaffect );
router.delete('/deleteReservationById/:id', reservationController.deleteReservationById );

module.exports = router;