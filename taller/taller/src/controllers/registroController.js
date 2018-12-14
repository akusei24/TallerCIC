const url= require('url');
const controller = {};

controller.list = (req,res) =>{
	req.getConnection((err, conn)=>{
		const id=req.params.idTema;
		conn.query('SELECT * FROM registro WHERE id_tema=?',[id], (err, registro) =>{
			if (err){
				res.json(err);
			}
			res.render('registroavance',{
				data: registro,
				id_tema:id,
				isAuthenticated:req.isAuthenticated,user:req.user
			});
		});
	});
};
controller.editRegistro=(req,res)=>{
	const {id}=req.params;
	//const {idAlumno}=req.params;
	req.getConnection((err,conn)=>{
		conn.query('SELECT * FROM registro WHERE id_registro = ?',[id],(err,avance)=>{
			console.log(avance[0]);
			res.render('registro_edit',{data:avance[0],isAuthenticated:req.isAuthenticated,user:req.user});
		});

	});
};
controller.deleteRegistro=(req,res)=>{
	console.log(req.params.id);
	const id=req.params.id;
	req.getConnection((err,conn)=>{
		conn.query('DELETE FROM registro WHERE id_registro = ?',[id],(err,rows)=>{
			res.redirect('back');
		});
	});
};
controller.updateRegistro=(req,res)=>{
	const id=req.params.id;
	var newRegistro=req.body;
	const idTema=req.params.id_tema;
	console.log(newRegistro);
	let EDFile = req.files.archivo;
	console.log(EDFile.name);
    EDFile.mv(`../uploads/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })

        //return res.status(200).send({ message : 'File upload' })
    	newRegistro["archivo"]=EDFile.name;
    	console.log(newRegistro);
    	req.getConnection((err,conn)=>{
    		conn.query('UPDATE registro set ? WHERE id_registro = ?', [newRegistro,id],(err,rows)=>{
    		res.redirect(url.format({
       				pathname:"/registroavance/"+idTema,
       				query: {
					"isAuthenticated": req.isAuthenticated,
          			"user":req.user
        }
     }));
    		//res.redirect('/registroavance/'+idTema,{isAuthenticated:req.isAuthenticated,user:req.user});
    	});
    	
    	});
    	
    });
};
controller.download=(req,res)=>{
	const ruta=req.params.archivo;
	var file="../uploads/"+ruta;
	console.log(file);
	res.download(file);
};

module.exports = controller;