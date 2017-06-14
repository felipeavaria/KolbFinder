'use strict'

const	fs 			= require('fs-extra')
const User = use('App/Model/User')
const Catalogo = use('App/Model/Catalogo')
const Contenido = use('App/Model/Contenido')
const Calificacion = use('App/Model/CalificacionContenido')

class CalificacionController {
	* enviarcalificacion (request, response){
		var data = request.post()

		const user = yield request.auth.getUser()

		var aux = []
		data.forEach(a => {
			var as = { 
				user_id: user.id,
				contenido_id: a.id
			}
			if(a.select) as.calificacion = 1
			else as.calificacion = 0
			aux.push(as)
		})
		const contenidos = yield Calificacion.createMany(aux)
		response.json(contenidos)
	}
}

module.exports = CalificacionController
