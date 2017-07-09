'use strict'

const Hash = use('Hash')
const User = use('App/Model/User')
const Catalogo = use('App/Model/Catalogo')
const Contenido = use('App/Model/Contenido')
const CatalogoCatalogador = use('App/Model/CatalogoCatalogador')
const Database = use('Database')

class UsersController {

  * login (request, response) {
	  //La idea, es que se le pase los datos a esta función, y si efectivamente
	  //existe, redirija al proximo sitio
	  //const thepass = yield Hash.make(request.input('password'))
	  //console.log(thepass)
    const email = request.input('email')
    const password = request.input('password')
    const login = yield request.auth.attempt(email, password) 
    if (login) {
	  const user = yield request.auth.getUser()
		if(user.type == 0) response.redirect('/experto')
		else response.redirect('/calificador')
		//response.send('Logged In Successfully')
      return
    }

    response.unauthorized('Invalid credentails')
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
