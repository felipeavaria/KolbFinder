'use strict'

const	scrape	 	= require('website-scraper')
const	fs 			= require('fs-extra')

class ContentsController {

  * scrape (request, response) {
	  //console.log(request.only('pagelist').pagelist)
		var data = request.only('pagelist').pagelist
		var pages = data.split('\r\n')
	  	console.log(pages);
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
			console.log("done")
			//response.ok("Process Ready")
			response.redirect('/test3')
		}
		else if(error) console.log("error")
		console.log("asdfdsafd")
	}
	))
	  //yield response.sendView('test', { data: "sadfadsfds" });
  }

	* viewcontents (request, response){
		var arr = [];
		fs.readdir('public/cache/images', (err, files) => {
			files.forEach(file => {
				//console.log(file);
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
			console.log('success!')
			aux.push(date+"_"+asd.key)
		  } catch (err) {
			console.error(err)
		  }
		}
	})
	console.log(aux)
	response.json(data)
  }
  //

  * renderview (request, response) {
	  //const user = request.param('user')
    yield response.sendView('test')
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
	//
}


module.exports = ContentsController
