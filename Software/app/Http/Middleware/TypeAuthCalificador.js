'use strict'

class TypeAuthCalificador {

  * handle (request, response, next) {
		const isLoggedIn = yield request.auth.check()
		if (!isLoggedIn) {
			response.redirect('/')
		}
		const user = yield request.auth.getUser()
		if(user.attributes.type != 0) yield next
		else  response.redirect('/')
  }

}

module.exports = TypeAuthCalificador
