const url= require('url');
const bcrypt=require('bcryptjs');
const controller = {};

controller.list = (req,res) =>{
	req.getConnection((err, conn)=>{
		//console.log(req.user.rol);
		conn.query('SELECT * FROM usuarios', (err, usuarios) =>{
			if (err){
				res.json(err);
			}
			console.log(usuarios);
			res.render('usuarios',{
				data: usuarios,
				isAuthenticated:req.isAuthenticated(),
				user:req.user
			});
		});
	
	});
};
controller.edit=(req,res)=>{
	const {id}=req.params;
	req.getConnection((err,conn)=>{
		conn.query('SELECT * FROM usuarios WHERE id_usuario = ?',[id],(err,usuario)=>{
			res.render('usuario_edit',{data:usuario[0],isAuthenticated:req.isAuthenticated,user:req.user});
		});
	});
};
controller.update=(req,res)=>{
	const{id_usuario}=req.params;
	var salt= bcrypt.genSaltSync(10);
	var password=bcrypt.hashSync(req.body.password,salt);
	const newUsuario={
		nombre:req.body.nombre,
		email:req.body.email,
		password:password,
		rol: req.body.rol
	}
	console.log("newUsuario:"+newUsuario);
	req.getConnection((err,conn)=>{
		conn.query('UPDATE usuarios set ? WHERE id_usuario = ?', [newUsuario,id_usuario],(err,rows)=>{
			res.redirect(url.format({
       				pathname:"/admin/usuarios",
       				query: {
					"isAuthenticated": req.isAuthenticated,
          			"user":req.user
        }
     }));
			//res.redirect('/admin/usuarios',{isAuthenticated:req.isAuthenticated,user:req.user});
		});
	});
};
controller.delete=(req,res)=>{
	console.log(req.params.id);
	const id=req.params.id;
	req.getConnection((err,conn)=>{
		conn.query('DELETE FROM usuarios WHERE id_usuario = ?',[id],(err,rows)=>{
			if (err){
				res.json(err);
			}
			res.redirect('back');
		});
	});
};
module.exports = controller;