'use strict'

const Lucid = use('Lucid')

class Catalogo extends Lucid {

	static get table() {
		return 'catalogo'
	}

  contenidos () {
		console.log("usando el metodo")
    return this.hasMany('App/Model/Contenido', 'id', 'catalogo_id')
    //return this.hasOne('App/Model/Contenido') 
  }
}

module.exports = Catalogo




