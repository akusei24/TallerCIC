const express = require('express');
const router = express.Router();
const passport=require('passport');
const alumnoController = require('../controllers/alumnoController');
const temasController=require('../controllers/temasController');
const registroController=require('../controllers/registroController');
const userController=require('../controllers/userController');
const adminController=require('../controllers/adminController');
const authMiddleware=require('../middleware/auth');
//Pantalla principal
router.get('/',function (req,res){
	console.log(req.isAuthenticated());
	res.render('index',{isAuthenticated:req.isAuthenticated(),user:req.user});
});

//Pantalla alumnos

router.get('/alumnos', authMiddleware.isLogged,alumnoController.list);
router.post('/add', alumnoController.save);
router.get('/delete/(:id)',alumnoController.delete);
router.get('/update/(:id)',alumnoController.edit);
router.post('/update/(:id_alumno)',alumnoController.update);

//Pantalla temas
router.get('/tema/(:id)',authMiddleware.isLogged,temasController.addTema);
router.get('/temas/(:id)',authMiddleware.isLogged,temasController.listTema);
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

router.get('/registroavance/(:idTema)',authMiddleware.isLogged,registroController.list);
router.get('/registro/edit/(:id)',registroController.editRegistro);
router.post('/registro/update/(:id)/(:idTema)',registroController.updateRegistro);
router.get('/descargar/(:archivo)',registroController.download);
router.get('/registro/delete/(:id)',registroController.deleteRegistro);

//Usuarios
router.post('/signUp',userController.signUp);
router.get('/auth',userController.auth);
router.post('/auth/signin',passport.authenticate('local',{
	successRedirect :'/',
	failureRedirect :'/',
	failureFlash:true
}));
router.get('/auth/logout',userController.logout);
//Admin
router.get('/admin/usuarios',adminController.list);
router.get('/admin/delete/(:id)',adminController.delete);
router.get('/admin/update/(:id)',adminController.edit);
router.post('/admin/update/(:id_usuario)',adminController.update);
module.exports = router;