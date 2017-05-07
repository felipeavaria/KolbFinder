'use strict'

const Hash = use('Hash')
const User = use('App/Model/User')

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
	console.log("Usuario registrado")	
	yield user.save().then(response.redirect('/'))

  }

  * logout (request, response) {
	  yield request.auth.logout()
	  response.redirect('/')
  }

}

module.exports = UsersController
