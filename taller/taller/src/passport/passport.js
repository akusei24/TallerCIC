var localStrategy = require('passport-local').Strategy;
const bcrypt=require('bcryptjs');
module.exports=function(passport){
	passport.serializeUser(function(user,done){
		done(null,user);
	});
	passport.deserializeUser(function(obj,done){
		done(null,obj);
	});
	passport.use(new localStrategy({
		passReqToCallback:true
	},function(req,email,password,done){
		req.getConnection((err,conn) =>{
		conn.query('SELECT * FROM  usuarios WHERE email = ?',email,(err, rows, fields) => {
			if(err) throw err;
			if(rows.length>0){
				console.log(rows[0]);
				var user=rows[0];
				console.log('password',password);
				if(bcrypt.compareSync(password,user.password)){
					console.log('success');
					return done(null,{
						id: user.id,
						nombre:user.nombre,
						email:user.email,
						rol:user.rol
					});
				}
			}
			console.log('fallo ');
			return done(null,false,req.flash('authmessage','Credenciales incorrectas'));
		//	res.send("funciona");
		});
	});
	}));
}