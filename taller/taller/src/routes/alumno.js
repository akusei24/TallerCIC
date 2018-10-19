const express = require('express');
const router = express.Router();

const alumnoController = require('../controllers/alumnoController');
const temasController=require('../controllers/temasController');
const registroController=require('../controllers/registroController');

//Pantalla principal
router.get('/',function (req,res){
	res.render('index');
});

//Pantalla alumnos

router.get('/alumnos', alumnoController.list);
router.post('/add', alumnoController.save);
router.get('/delete/(:id)',alumnoController.delete);
router.get('/update/(:id)',alumnoController.edit);
router.post('/update/(:id_alumno)',alumnoController.update);

//Pantalla temas
router.get('/tema/(:id)',temasController.addTema);
router.get('/temas/(:id)',temasController.listTema);
router.post('/saveTema',temasController.saveTema);
router.get('/deleteTema/(:id)',temasController.deleteTema);
router.get('/updateTema/(:id)/(:idAlumno)',temasController.editTema);
router.post('/updateTema/(:id)',temasController.updateTema);
router.get('/observaciones/(:id)',temasController.listObservaciones);
router.post('/saveObservaciones',temasController.saveObservaciones);
router.get('/updateStatus/(:id)/(:idTema)',temasController.updateStatus);
router.get('/subirArchivo/(:idTema)',temasController.subirArchivo);
router.post('/upload/(:idTema)',temasController.upload);

//Ventana registros

router.get('/registroavance/(:idTema)',registroController.list);


module.exports = router;