const bcrypt=require('bcryptjs');
const controller = {};

controller.signUp = (req,res) =>{
	//const datos = req.body;
	var salt= bcrypt.genSaltSync(10);
	var password=bcrypt.hashSync(req.body.password,salt);
	const datos={
		nombre:req.body.nombre,
		email:req.body.email,
		password:password,
		rol: req.body.rol
	}
	req.getConnection((err,conn) =>{
		conn.query('INSERT INTO usuarios set ?',[datos],(err, usuario) => {
			console.log(usuario);
			req.flash('info', 'Se ha registrado correctamente puede iniciar sesion ')
			res.redirect('/);
		//	res.send("funciona");
		});
	});
};
controller.logout=(req,res)=>{
	req.logout();
	res.redirect('/');
};
controller.auth=(req,res)=>{
	res.render('login');
};
module.exports = controller;