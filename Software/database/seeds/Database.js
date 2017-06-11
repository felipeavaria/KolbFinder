'use strict'

const User = use('App/Model/User')

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

// const Factory = use('Factory')

class DatabaseSeeder {

  * run () {
    // yield Factory.model('App/Model/User').create(5)
	  var admin = new User()
	  admin.username = "Admin"
	  admin.email = "admin@kolbfinder.kf"
	  admin.password = "1234"
	  admin.type = 0
	  yield admin.save()

	  var catalogador = new User()
	  catalogador.username = "Conv"
	  catalogador.email = "conv@kolbfinder.kf"
	  catalogador.password = "1234"
	  catalogador.type = 1
	  yield catalogador.save()

	  var catalogador = new User()
	  catalogador.username = "Dive"
	  catalogador.email = "dive@kolbfinder.kf"
	  catalogador.password = "1234"
	  catalogador.type = 2
	  yield catalogador.save()

	  var catalogador = new User()
	  catalogador.username = "Asim"
	  catalogador.email = "asim@kolbfinder.kf"
	  catalogador.password = "1234"
	  catalogador.type = 3
	  yield catalogador.save()

	  var catalogador = new User()
	  catalogador.username = "Acom"
	  catalogador.email = "acom@kolbfinder.kf"
	  catalogador.password = "1234"
	  catalogador.type = 4
	  yield catalogador.save()
  }

}

module.exports = DatabaseSeeder
