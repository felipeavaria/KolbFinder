'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')
const User = use('App/Model/User')
const Catalogo = use('App/Model/Catalogo')
const Contenido = use('App/Model/Contenido')
const Calificacion = use('App/Model/CalificacionContenido')
const Referencium = use('App/Model/Referencium')



/* Redirecciones*/
Route.on('/').render('home').middleware('jumpuser')
Route.on('/experto').render('experto/dashboard').middleware('typeauth')
Route.on('/catalogos').render('experto/catalogos').middleware('typeauth')
Route.on('/borradores').render('experto/borradores').middleware('typeauth')

Route.get('/calificador', 'UsersController.calificadordash').middleware('typeauthcal')

/* API */
Route.get('/test', 'ContentsController.scrape')
.middleware('auth')
Route.get('/test3', 'ContentsController.viewcontents')
.middleware('auth')
Route.post('/login', 'UsersController.login')
Route.post('/createuser', 'UsersController.create')
Route.get('/logout', 'UsersController.logout')
Route.get('/image', 'ContentsController.sendimages')
// Sendcontent: enviar formulario ordenado, a la base de datos
// y guardarlo, en el almacenamiento del sitio.
Route.post('/sendcontent', 'ContentsController.sendcontent')

//Route.get('/yapo', 'ContentsController.yapo')
Route.get('calificador/catalogo/:id', 'ContentsController.getcontenidos')
Route.get('calificador/catalogo/api/:id', 'ContentsController.sendcatalogo') //El q se usa de API
Route.get('calificador/catalogo', 'ContentsController.getcontenidos')

Route.get('/users', function * (request, response) {
  const users = yield User.all() 
  response.ok(users)
})

Route.get('/catalogo', function * (request, response) {
  const catalogo = yield Catalogo.all() 
  response.ok(catalogo)
})

Route.get('/contenido', function * (request, response) {
  const contenido = yield Contenido.all() 
  response.ok(contenido)
})

Route.get('/calificacion', function * (request, response) {
  const calificacion = yield Calificacion.all() 
  response.ok(calificacion)
})

Route.get('/referencia', function * (request, response) {
  const referencia = yield Referencium.all() 
  response.ok(referencia)
})


Route.post('/enviarcalificacion', 'CalificacionController.enviarcalificacion')
