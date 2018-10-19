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
				id_tema:id
			});
		});
	});
};



module.exports = controller;