'use strict'

const Hash = use('Hash')
const User = use('App/Model/User')
const Catalogo = use('App/Model/Catalogo')
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
	user.username = request.input('username')
	user.email = request.input('email')
	user.password = request.input('password')
	console.log(user)
	console.log("Usuario registrado")	
	yield user.save()
	response.redirect('/')

  }

  * calificadordash (request, response) {
	const user = yield request.auth.getUser()
	console.log(user)
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
	console.log(typestring)

	const catalogos_ = yield Catalogo.all()
		console.log(catalogos_)

	yield response.sendView('calificador/dashboard', { type: typestring, catalogos: catalogos_.toJSON() })
  }

  * logout (request, response) {
	  yield request.auth.logout()
	  response.redirect('/')
  }

}

module.exports = UsersController
