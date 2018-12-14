module.exports={
	isLogged : function(req,res,next){
	if(req.isAuthenticated()){
	next();
	}
	else{
	res.redirect('/');
	}
	},
	esEstudiante: function(req,res){
		const {email}=req.params;
		req.getConnection((err,conn)=>{
		conn.query('SELECT * FROM alumnos WHERE email = ?',[email],(err,alumno)=>{
			res.redirect('/tema/'+ alumno[0].id,{data:alumno[0]});
		});
	});
	}
}