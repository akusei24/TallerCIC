const controller = {};

controller.list = (req,res) =>{
	req.getConnection((err, conn)=>{
		conn.query('SELECT * FROM registro', (err, registro) =>{
			if (err){
				res.json(err);
			}
			res.render('registroavance',{
				data: registro
			});
		});
	});
};



module.exports = controller;