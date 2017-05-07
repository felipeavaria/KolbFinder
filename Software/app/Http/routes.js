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

Route.on('/').render('home')
Route.on('/experto').render('welcome')
.middleware('auth')
Route.on('/calificador').render('calificador')
.middleware('auth')
Route.get('/test', 'ContentsController.scrape')
.middleware('auth')
//Route.get('/test2', 'ContentsController.renderview')
//.middleware('auth:basic')
Route.get('/test3', 'ContentsController.viewcontents')
.middleware('auth')
Route.post('/login', 'UsersController.login')
Route.post('/createuser', 'UsersController.create')
Route.get('/logout', 'UsersController.logout')

Route.get('/users', function * (request, response) {
  const users = yield User.all() 
  response.ok(users)
})
