'use strict'

const Lucid = use('Lucid')

class Contenido extends Lucid {
	static get table() {
		return 'contenido'
	}
}

module.exports = Contenido
