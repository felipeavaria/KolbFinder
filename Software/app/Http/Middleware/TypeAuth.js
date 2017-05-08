'use strict'

class TypeAuth {

  * handle (request, response, next) {
	const isLoggedIn = yield request.auth.check()
	if (!isLoggedIn) {
	  response.redirect('/')
	}
	const user = yield request.auth.getUser()
	if(user.attributes.type == 0) yield next
	else  response.redirect('/')
    // here goes your middleware logic
    // yield next to pass the request to next middleware or controller
	  //yield next
  }

}

module.exports = TypeAuth
