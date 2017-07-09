'use strict'

const	fs 			= require('fs-extra')
const User = use('App/Model/User')
const Catalogo = use('App/Model/Catalogo')
const Contenido = use('App/Model/Contenido')
const Calificacion = use('App/Model/CalificacionContenido')
const CatalogoCatalogador = use('App/Model/CatalogoCatalogador')
const Database = use('Database')

class CalificacionController {
	* enviarcalificacion (request, response){
		var data = request.post()
		const user = yield request.auth.getUser()



			//const asd = yield Contenido.where({user_id: 2})
			const asd = yield Database.from('calificacion').where({user_id: user.id, contenido_id: data[0].id})
			if(asd.length === 0){ //Quiere decir, que no se encontro catalogo ya catalogado
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
			const qwerty = yield Database.from('contenido').where({id: data[0].id}).first()
			const catalogado = new CatalogoCatalogador()
			catalogado.catalogo_id = qwerty.catalogo_id
			catalogado.user_id = user.id
			yield catalogado.save()

				response.json(contenidos)
			}
			console.log("ya esta evaluado el catalogo -.-")
			response.json("ya lo creaste")

		}
}

module.exports = CalificacionController
