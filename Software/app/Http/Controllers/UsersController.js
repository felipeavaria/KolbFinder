'use strict'

const Hash = use('Hash')
const User = use('App/Model/User')
const Catalogo = use('App/Model/Catalogo')
const Contenido = use('App/Model/Contenido')
const CatalogoCatalogador = use('App/Model/CatalogoCatalogador')
const Database = use('Database')
const Validator = use('Validator')

class UsersController {
  * login (request, response) {
	  //La idea, es que se le pase los datos a esta función, y si efectivamente
	  //existe, redirija al proximo sitio
	  //const thepass = yield Hash.make(request.input('password'))
	  //console.log(thepass)
	const postData = request.only('email', 'password')

	const rules = {
		email: 'required',
		password: 'required'
	}

	const validation = yield Validator.validate(postData, rules)

    if (validation.fails()) {
      yield request
          .withOnly('email', 'password')
          .andWith({errors: [{message:"Debe rellenar todas las casillas"}]})
          .flash()
      response.redirect('back')
      return
    }

    const email = request.input('email')
    const password = request.input('password')

    try{
    	yield request.auth.attempt(email, password);
    	const user = yield request.auth.getUser()
		if(user.type == 0) response.redirect('/experto')
		else response.redirect('/calificador')
    } catch (e){
    		yield request.withAll().andWith({errors:[{message: "Correo o contraseña incorrecta"}]}).flash()
    		response.redirect('back')
    		return
    		//response.notFound('User not found');
	
    }

  }

  * profile (request, response) {
	const user = yield request.auth.getUser()
	if (user) {
	  response.ok(user)
	  return
	}
	response.unauthorized('You must login to view your profile')
  }

  * create (request, response) {
	const user = new User()
	switch(request.input('type')){
	  case 'Convergente':
		user.type = 1
		break
	  case 'Divergente':
		user.type = 2
		break
	  case 'Asimilador':
		user.type = 3
		break
	  case 'Acomodador':
		user.type = 4
		break
	}

	const postData = request.only('email', 'username', 'password')

	const rules = {
		email: 'required',
		username: 'required',
		password: 'required'
	}

	const validation = yield Validator.validate(postData, rules)

    if (validation.fails()) {
      yield request
          .withOnly('email', 'username', 'password')
          .andWith({errors: [{message:"Debe rellenar todas las casillas"}]})
          .flash()
      response.redirect('back')
      return
    }

	user.username = request.input('username')
	user.email = request.input('email')
	user.password = request.input('password')

	const usuarios = yield Database.from('users').where({email: user.email})
	const nombre_usuario = yield Database.from('users').where({username: user.username})

	if(usuarios.length == 0){
		if(nombre_usuario.length == 0){
			yield user.save()
			yield request.withAll().andWith({exito:[{message: "Usuario registrado correctamente."}]}).flash()
			response.redirect('back')
			return
		}
		yield request.withAll().andWith({errors:[{message: "Nombre de usuario existente."}]}).flash()
		response.redirect('back')
		return
	}

	yield request.withAll().andWith({errors:[{message: "Correo electrónico existente."}]}).flash()
	response.redirect('back')
	return	

  }

  * calificadordash (request, response) {
	const user = yield request.auth.getUser()
	switch(user.attributes.type){
	  case 1:
		var typestring = "Convergente"
		break
	  case 2:
		var typestring = "Divergente"
		break
	  case 3:
		var typestring = "Asimilador"
		break
	  case 4:
		var typestring = "Acomodador"
		break
	}
	const catalogos_ = yield Catalogo.all()
	const catalogados_ = yield Database.from('catalogo_catalogador').where({user_id: user.id})
	var newCatalogos = []
	var Catalogados = []
	var doit = false
	catalogos_.forEach(a => {
		doit = false
		catalogados_.forEach(b => {
			if(b.catalogo_id === a.id){
				doit = true
			}
		})
		if(doit) Catalogados.push(a)
		else newCatalogos.push(a)
	})
	yield response.sendView('calificador/dashboard', { type: typestring, catalogos: newCatalogos, catalogados: Catalogados })
  }

  * logout (request, response) {
	  yield request.auth.logout()
	  response.redirect('/')
  }

}

module.exports = UsersController
