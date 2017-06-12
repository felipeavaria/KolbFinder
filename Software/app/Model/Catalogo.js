'use strict'

const Lucid = use('Lucid')

class Catalogo extends Lucid {

	static get table() {
		return 'catalogo'
	}

  contenidos () {
    return this.hasMany('App/Model/Contenido')
  }
}

module.exports = Catalogo
