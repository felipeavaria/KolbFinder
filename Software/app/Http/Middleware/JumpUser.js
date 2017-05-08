'use strict'

class JumpUser {

  * handle (request, response, next) {
	const isLoggedIn = yield request.auth.check()
	if (!isLoggedIn) {
	  yield next
	}
	const user = yield request.auth.getUser()
	if(user.attributes.type == 0) response.redirect('/experto')
	else  response.redirect('/calificador')
  }



}

module.exports = JumpUser
