'use strict'

const Lucid = use('Lucid')

class Catalogo extends Lucid {
	static get table() {
		return 'catalogo'
	}
}

module.exports = Catalogo
