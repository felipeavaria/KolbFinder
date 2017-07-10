'use strict'

const	fs 			= require('fs-extra')
const User = use('App/Model/User')
const Catalogo = use('App/Model/Catalogo')
const Contenido = use('App/Model/Contenido')
const Calificacion = use('App/Model/CalificacionContenido')
const CatalogoCatalogador = use('App/Model/CatalogoCatalogador')
const Database = use('Database')

class AdminController {

	* admindashboard(request, response){
		const catalogadores = yield Database.from('users').where('type','>',0)
		var catalogador_conteo = [0,0,0,0]
		catalogadores.forEach(a => {
			switch(a.type){
				case 1:
					catalogador_conteo[0]++
					break
				case 2:
					catalogador_conteo[1]++
					break
				case 3:
					catalogador_conteo[2]++
					break
				case 4:
					catalogador_conteo[3]++
					break
			}
		})
		const catalogos = yield Catalogo.all()
		yield response.sendView('experto/dashboard', { cat_conteo: catalogador_conteo, catalogos: catalogos.toJSON() })
	}

	* catalogoview(request, response){
		const id = request.param('id')
		const type = request.param('type')
		const catalogo = yield Database.from('catalogo').where({id: id}).first()
		const contenidos = yield Database.from('contenido')
			.where({catalogo_id: id})
		var buttons = ['','','','','']
		buttons[type] = 'active'

		var typestring = "Total"
		if(type === '0') {
			const calificaciones = yield Database.from('contenido') 
				 .where({catalogo_id: id}) 
				 .leftJoin('calificacion', 'contenido.id', 'calificacion.contenido_id');
			contenidos.forEach(a => {
				a.likes = 0
				a.total = 0
				calificaciones.forEach(b => {
					if(a.id === b.contenido_id){ 
						if(b.calificacion === 1) a.likes++
						a.total++
					}
				})
			})
		}

		else {
			const calificaciones = yield Database.from('contenido') 
				 .where({catalogo_id: id}) 
				 .leftJoin('calificacion', 'contenido.id', 'calificacion.contenido_id')
				 .leftJoin('users','calificacion.user_id','users.id');
			switch(type){
				case '1':
					typestring = "Convergente"
					break
				case '2':
					typestring = "Divergente"
					break
				case '3':
					typestring = "Asimilador"
					break
				case '4':
					typestring = "Acomodador"
					break
			}
			contenidos.forEach(a => {
				a.likes = 0
				a.total = 0
				calificaciones.forEach(b => {
					if(a.id === b.contenido_id && type == b.type){ 
						if(b.calificacion === 1) a.likes++
						a.total++
					}
				})
			})
		}
		yield response.sendView('experto/catalogo_view', {id_: id, type_:type, contenido: contenidos, typestring: typestring, catalogo: catalogo, id: id, buttons: buttons })
	}


	* catalogoviewapi(request, response){
		const id = request.param('id')
		const type = request.param('type')
		const catalogo = yield Database.from('catalogo').where({id: id}).first()
		const contenidos = yield Database.from('contenido')
			.where({catalogo_id: id})
		var buttons = ['','','','','']
		buttons[type] = 'active'

		var typestring = "Total"
		if(type === '0') {
			const calificaciones = yield Database.from('contenido') 
				 .where({catalogo_id: id}) 
				 .leftJoin('calificacion', 'contenido.id', 'calificacion.contenido_id');
			contenidos.forEach(a => {
				a.likes = 0
				a.total = 0
				calificaciones.forEach(b => {
					if(a.id === b.contenido_id){ 
						if(b.calificacion === 1) a.likes++
						a.total++
					}
				})
			})
		}

		else {
			const calificaciones = yield Database.from('contenido') 
				 .where({catalogo_id: id}) 
				 .leftJoin('calificacion', 'contenido.id', 'calificacion.contenido_id')
				 .leftJoin('users','calificacion.user_id','users.id');
			switch(type){
				case '1':
					typestring = "Convergente"
					break
				case '2':
					typestring = "Divergente"
					break
				case '3':
					typestring = "Asimilador"
					break
				case '4':
					typestring = "Acomodador"
					break
			}
			contenidos.forEach(a => {
				a.likes = 0
				a.total = 0
				calificaciones.forEach(b => {
					if(a.id === b.contenido_id && type == b.type){ 
						if(b.calificacion === 1) a.likes++
						a.total++
					}
				})
			})
		}
		response.json({ contenido: contenidos, typestring: typestring, catalogo: catalogo, id: id, buttons: buttons })
	}

}

module.exports = AdminController
