'use strict'

const	scrape	 	= require('website-scraper')
const	fs 			= require('fs-extra')
const User = use('App/Model/User')
const Catalogo = use('App/Model/Catalogo')
const Contenido = use('App/Model/Contenido')
const Database = use('Database')

class ContentsController {

  * scrape (request, response) {
		var data = request.only('pagelist').pagelist
		var pages = data.split('\r\n')
	  yield fs.remove('public/cache', scrape({
		  urls: pages,
		  directory: 'public/cache',
		  sources: [
			{selector: 'img', attr: 'src'}
			  //{selector: 'link[rel="stylesheet"]', attr: 'href'},
			  //{selector: 'script', attr: 'src'}
		  ],
		  /*
		  request: {
			  headers: {
				  'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
				}
		  }
		  */
	}, (error, result) => {
		if(result){ 
			//response.ok("Process Ready")
			response.redirect('/test3')
		}
		else if(error) console.log("error")
	}
	))
	  //yield response.sendView('test', { data: "sadfadsfds" });
  }

	* viewcontents (request, response){
		var arr = [];
		fs.readdir('public/cache/images', (err, files) => {
			files.forEach(file => {
				//Se parte en Cache, por que el Root de las views, es "public"
				arr.push('cache/images/'+file);
			})
		})
		yield response.sendView('experto/upload-content', {data: arr })

	}
  //

  /* Función de API, para entregar los archivos subidos actualmente */
  * sendimages (request, response){
	  var arr = [];
	  arr =	fs.readdirSync('public/cache/images')
	  arr.forEach(function(file,index,arra){arra[index] = 'cache/images/'+file});
	  response.send({ data: arr })
  }
  //

  * sendcontent (request, response){
		var data = request.post()
		var date = Date.now()
		var aux = []

		var dir = 'public/content';
		if (!fs.existsSync(dir)) fs.mkdirSync(dir) 

		data.contenido.forEach(asd => {
			if(asd.select === true) {
				try {
				fs.copySync("public/"+asd.src, dir+"/"+date+"_"+asd.key)
				aux.push(date+"_"+asd.key)
				} catch (err) {
				console.error(err)
				}
			}
		})
			
	//Agregar a la base de Datos	
	//vease documentacion para no caer en lo que he caido recien xD:
			//https://adonisjs.com/docs/3.2/lucid#_basic_example
		const catalog = new Catalogo()
		catalog.titulo = data.nombre
		catalog.estado = 1
		yield catalog.save()

		var contents_arr = []
		aux.forEach(a => {
			var as = {}
			as.catalogo_id = catalog.id
			as.cuerpo = a
			as.estilo = 0
			contents_arr.push(as)
		})
		const contents = yield Contenido.createMany(contents_arr)
		response.json(data)
  }

	* sendcatalogo (request, response){
		//	SEra un "GET", por lo que id lo tengo de arriba
	//	var data = request.post()
		const id = request.param('id')
		const contenidos = yield Contenido.query().where('catalogo_id', id)
		response.json(contenidos)
	}

	// Funcion para probar, si el agregar a la BD, funciona
	* yapo (request, response){
		var content = new Contenido()
		content.catalogo_id = 0
		content.cuerpo = "xxxxxxxxxx"
		yield content.save()
		response.send("ya")
	}

  //

  * renderview (request, response) {
	  //const user = request.param('user')
    yield response.sendView('test')
  }
	//
		
  * getcatalogos (request, response) {
		var catalogos = yield Catalogo.all()

		response.send(catalogos)
  }


  * getcontenidos (request, response) {
		const id = request.param('id')
		const contenidos = yield Contenido.query().where('catalogo_id', id)

		//var contea = catalogos[0].contenidos()

		yield response.sendView('calificador/vercatalogo', { contenidos: contenidos })
  }

	//

  * ingreso (request, response) {
    const email = request.input('email')
    const password = request.input('password')
    const login = yield request.auth.attempt(email, password) 

    if (login) {
      response.send('Logged In Successfully')
      return
    }

    response.unauthorized('Invalid credentails')
  }


  * publiccatalogoapi (request, response) {
		const catalogos = yield Catalogo.all()
		var catalogosPublicos = []
		catalogos.forEach(a => {
			console.log(a)
			if(a.estado == 2) catalogosPublicos.push(a)
		})
		console.log(catalogosPublicos)
		yield response.sendView('catalogos', {catalogos: catalogosPublicos})
  }
	

  * publiccontenidoapi (request, response) {
		const tipo = request.param('type')
		const id = request.param('id')

		switch(tipo){
			case 'convergente':
				var contenido =  yield Database.from('contenido').where({catalogo_id: id, publico_1: 1})
				break
			case 'divergente':
				var contenido =  yield Database.from('contenido').where({catalogo_id: id, publico_2: 1})
				break
			case 'asimilador':
				var contenido =  yield Database.from('contenido').where({catalogo_id: id, publico_3: 1})
				break
			case 'acomodador':
				var contenido =  yield Database.from('contenido').where({catalogo_id: id, publico_4: 1})
				break
			default:
				var contenido =  yield Database.from('contenido').where({catalogo_id: id, publico_0: 1})
				break
		}
		console.log(contenido)

		yield response.sendView('contenido', {id: id, tipo: tipo, contenido: contenido})
  }
}


module.exports = ContentsController
