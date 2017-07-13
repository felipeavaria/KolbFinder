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
		var contenidos = yield Database.from('contenido')
			.where({catalogo_id: id})
		var buttons = ['','','','','']
		buttons[type] = 'active'
		var data = []

		var typestring = "Total"
		var calificaciones = yield Database.from('contenido') 
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
		data.push(contenidos)
		for(var i=1; i<=4; i++){
			var contenidos = yield Database.from('contenido')
				.where({catalogo_id: id})
			var calificaciones = yield Database.from('contenido') 
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
					if(a.id === b.contenido_id && i == b.type){ 
						if(b.calificacion === 1) a.likes++
						a.total++
					}
				})
			})
			data.push(contenidos)
		}
		response.json({ contenido: data, typestring: typestring, catalogo: catalogo, id: id, buttons: buttons })
	}

	* viewcatalogos(request, response){
		const catalogos = yield Catalogo.all()
		var catalogosActivos = []
		var catalogosPublicos = []
		catalogos.forEach(a => {
			if(a.estado == 2) catalogosPublicos.push(a)
			else catalogosActivos.push(a)
		})
		yield response.sendView('experto/catalogos', {catalogosact: catalogosActivos, catalogospublicos: catalogosPublicos})
	}

	* makepublic(request, response) {
		var data = request.post()
		// hacer aqui un for, o colocar las 4 operaciones para agregar a la BD, publicamente los contenidos

		console.log(data)
		console.log("1er for")
		for(var i=0; i<data.contenido[0].length; i++){
			var aux = yield Contenido.find(data.contenido[0][i].id)
			console.log("for")
			if(data.contenido[0][i].select === true) aux.publico_0 = 1
			yield aux.save()
		}
		console.log("1er for")
		for(var i=0; i<data.contenido[1].length; i++){
			var aux = yield Contenido.find(data.contenido[1][i].id)
			if(data.contenido[1][i].select === true) aux.publico_1 = 1
			yield aux.save()
		}
		console.log("Data que llega de la seleccion:")
		for(var i=0; i<data.contenido[2].length; i++){
			var aux = yield Contenido.find(data.contenido[2][i].id)
			if(data.contenido[2][i].select === true) aux.publico_2 = 1
			yield aux.save()
		}
		console.log("1er for")
		for(var i=0; i<data.contenido[3].length; i++){
			var aux = yield Contenido.find(data.contenido[3][i].id)
			if(data.contenido[3][i].select === true) aux.publico_3 = 1
			yield aux.save()
		}
		console.log("1er for")
		for(var i=0; i<data.contenido[4].length; i++){
			var aux = yield Contenido.find(data.contenido[4][i].id)
			if(data.contenido[4][i].select === true) aux.publico_4 = 1
			yield aux.save()
		}

		const catalogo = yield Catalogo.findBy('id', data.contenido[0][0].catalogo_id)
		catalogo.estado = 2


		yield catalogo.save()
		response.json("done")
	}

	* deletecatalogo(request, response) {
		var data = request.param('id')
		console.log(data)
		const catalogo = yield Catalogo.findBy('id', data)
		yield catalogo.delete()
		response.redirect('/catalogos')
	}

}

module.exports = AdminController
