const url = require('url');   
const controller = {};

controller.list = (req,res) =>{
	req.getConnection((err, conn)=>{
		console.log(req.user.rol);
		if(req.user.rol=='Estudiante'){
			var email=req.user.email;
		conn.query('SELECT * FROM alumnos WHERE correo = ?',email, (err, alumnos) =>{
			if (err){
				res.json(err);
			}
			console.log(alumnos);
			res.render('alumnos',{
				data: alumnos,
				isAuthenticated:req.isAuthenticated(),
				user:req.user
			});
		});	
		}else{
		conn.query('SELECT * FROM alumnos', (err, alumnos) =>{
			if (err){
				res.json(err);
			}
			console.log(alumnos);
			res.render('alumnos',{
				data: alumnos,
				isAuthenticated:req.isAuthenticated(),
				user:req.user
			});
		});
	}
	});
};

controller.save = (req,res) =>{
	const datos = req.body;
	req.getConnection((err,conn) =>{
		conn.query('INSERT INTO alumnos set ?',[datos],(err, alumno) => {
			console.log(alumno);
			res.redirect(url.format({
       				pathname:"/alumnos",
       				query: {
					"isAuthenticated": req.isAuthenticated,
          			"user":req.user
        }
     }));
		//	res.send("funciona");
		});
	});
};
controller.edit=(req,res)=>{
	const {id}=req.params;
	req.getConnection((err,conn)=>{
		conn.query('SELECT * FROM alumnos WHERE id_alumno = ?',[id],(err,alumno)=>{
			res.render('alumno_edit',{data:alumno[0],isAuthenticated:req.isAuthenticated,user:req.user});
		});
	});
};
controller.update=(req,res)=>{
	const{id_alumno}=req.params;
	const newAlumno=req.body;
	req.getConnection((err,conn)=>{
		conn.query('UPDATE alumnos set ? WHERE id_alumno = ?', [newAlumno,id_alumno],(err,rows)=>{
			res.redirect(url.format({
       				pathname:"/alumnos",
       				query: {
					"isAuthenticated": req.isAuthenticated,
          			"user":req.user
        }
     }));
			//res.redirect('/alumnos',{isAuthenticated:req.isAuthenticated,user:req.user});
		});
	});
};
controller.delete=(req,res)=>{
	console.log(req.params.id_alumno);
	const id=req.params.id;
	req.getConnection((err,conn)=>{
		conn.query('DELETE FROM alumnos WHERE id_alumno = ?',[id],(err,rows)=>{
			res.redirect('/alumnos',{isAuthenticated:req.isAuthenticated,user:req.user});
		});
	});
};
controller.addTema=(req,res)=>{
	const id=req.params.id;
	req.getConnection((err,conn)=>{
		conn.query('SELECT * FROM alumno WHERE id_alumno=?',[id],(err,rows)=>{
			res.redirect('/temas',{isAuthenticated:req.isAuthenticated,user:req.user});
		});
	});
};
controller.listTema=(req,res)=>{
	req.getConnection((err, conn)=>{
		const id=req.params.id;
		conn.query('SELECT * FROM temas WHERE id_alumno=?',[id], (err, alumnos) =>{
			if (err){
				res.json(err);
			}
			console.log(temas);
			res.render('temas',{
				data: temas,
				isAuthenticated:req.isAuthenticated,
				user:req.user
			});
		});
	});
};
module.exports = controller;