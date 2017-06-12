'use strict'

const Lucid = use('Lucid')

class Contenido extends Lucid {
	static get table() {
		return 'contenido'
	}

  catalogo () {
    return this.belongsTo('App/Model/Catalogo')
  }
}

module.exports = Contenido
