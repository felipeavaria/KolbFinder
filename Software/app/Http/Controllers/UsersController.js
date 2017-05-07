'use strict'

const Hash = use('Hash')

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
		//response.send('Logged In Successfully')
	  response.redirect('/experto')
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

	* logout (request, response) {
		yield request.auth.logout()
		response.redirect('/')
	}


}

module.exports = UsersController
