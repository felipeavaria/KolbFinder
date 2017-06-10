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
  }

}

module.exports = DatabaseSeeder
