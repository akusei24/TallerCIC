const url=require('url');
const controller = {};
controller.addTema=(req,res)=>{
	const id=req.params.id;
	req.getConnection((err,conn)=>{
		if (err){
				res.json(err);
			}
		conn.query('SELECT * FROM temas WHERE id_alumno=?',[id],(err,rows)=>{
			res.redirect(url.format({
       				pathname:"/temas/"+id,
       				query: {
					"isAuthenticated": req.isAuthenticated,
          			"user":req.user
        }
     }));
			//res.redirect('/temas/'+id,{isAuthenticated:req.isAuthenticated,user:req.user});
		});
	});
};
function getAlumno(req,res){
	req.getConnection((err,conn)=>{
		const id=req.params.id;

	});
}

controller.listTema=(req,res)=>{
	req.getConnection((err, conn)=>{
		const id=req.params.id;
		conn.query('SELECT * FROM temas WHERE id_alumno=?',[id], (err, temas) =>{
			if (err){
				res.json(err);
			}
			console.log(temas);
			conn.query('SELECT * FROM alumnos WHERE id_alumno = ?',[id],(err,alumno)=>{
			res.render('temas',{data:temas, id_alumno:id, alumno:alumno[0], isAuthenticated:req.isAuthenticated,user:req.user});
		});

		});
	});
};
controller.saveTema = (req,res) =>{
	const datos = req.body;
	req.getConnection((err,conn) =>{
		conn.query('INSERT INTO temas SET ?',[datos],(err, temas) => {
			console.log(datos);
			res.redirect('back');
		});
	});
};
controller.deleteTema=(req,res)=>{
	console.log(req.params.id);
	const id=req.params.id;
	req.getConnection((err,conn)=>{
		conn.query('DELETE FROM temas WHERE id_tema = ?',[id],(err,rows)=>{
			res.redirect('back');
		});
	});
};
controller.editTema=(req,res)=>{
	const {id}=req.params;
	const {idAlumno}=req.params;
	req.getConnection((err,conn)=>{
		conn.query('SELECT * FROM temas WHERE id_tema = ?',[id],(err,tema)=>{
			console.log(tema[0]);
			res.render('temas_edit',{data:tema[0],idAl:idAlumno,isAuthenticated:req.isAuthenticated,user:req.user});
		});

	});
};
controller.updateTema=(req,res)=>{
	const{id}=req.params;
	const newTema=req.body;
	const idAlumno=req.body.id_alumno;
	console.log(newTema);
	req.getConnection((err,conn)=>{
		conn.query('UPDATE temas set ? WHERE id_tema = ?', [newTema,id],(err,rows)=>{
			res.redirect(url.format({
       				pathname:"/temas/"+idAlumno,
       				query: {
					"isAuthenticated": req.isAuthenticated,
          			"user":req.user
        }
     }));
			//res.redirect('/temas/'+idAlumno,{isAuthenticated:req.isAuthenticated,user:req.user});
		});
	});
};
controller.addObservacion=(req,res)=>{
	const id=req.params.id;
	req.getConnection((err,conn)=>{
		conn.query('SELECT * FROM observaciones WHERE id_tema=?',[id],(err,rows)=>{
			res.redirect('/observaciones/'+id,{isAuthenticated:req.isAuthenticated,user:req.user});
		});
	});
};
controller.listObservaciones=(req,res)=>{
	req.getConnection((err, conn)=>{
		const id=req.params.id;
		conn.query('SELECT * FROM observaciones WHERE id_tema=?',[id], (err, observaciones) =>{
			if (err){
				res.json(err);
			}
			console.log(observaciones);
			res.render('observaciones',{
				data: observaciones,
				id_tema: id,
				isAuthenticated:req.isAuthenticated,
				user:req.user
			});

		});
	});
};
controller.saveObservaciones = (req,res) =>{
	const datos = req.body;
	req.getConnection((err,conn) =>{
		conn.query('INSERT INTO observaciones SET ?',[datos],(err, observacion) => {
			console.log(datos);
			res.redirect('back');
		});
	});
};
controller.updateStatus=(req,res)=>{
	const{id}=req.params;
	const {idTema}=req.params;
	//const newTema=req.body;
	//console.log(newTema);
	req.getConnection((err,conn)=>{
		conn.query('UPDATE observaciones set status = ? WHERE id_observacion = ? AND id_tema=?', ['1',id,idTema],(err,rows)=>{
			console.log(rows);
			res.redirect('back');
		});
	});
};
controller.upload=(req,res)=>{
	
	const {idTema}=req.params;
	var datos=req.body;

	console.log(datos);
	let EDFile = req.files.archivo;
	console.log(EDFile.name);
    EDFile.mv(`../uploads/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })

        //return res.status(200).send({ message : 'File upload' })
    	datos["archivo"]=EDFile.name;
    	req.getConnection((err,conn)=>{
    		conn.query('INSERT  INTO registro set  ? ',[datos],(err,rows)=>{
    		res.redirect('/registroavance/'+idTema,{isAuthenticated:req.isAuthenticated,user:req.user});
    	});
    	
    	});
    	
    });
};
controller.subirArchivo=(req,res)=>{
	const {id}=req.params;
	const {idTema}=req.params;
	res.render('upload',{idTema:idTema});
};

module.exports = controller;