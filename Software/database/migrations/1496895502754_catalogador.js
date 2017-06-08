'use strict'

const Schema = use('Schema')

class CatalogadorTableSchema extends Schema {

  up () {
    this.create('catalogador', (table) => {
      table.increments()
      table.timestamps()
      table.string('nombre').unique()
      table.string('password')
      table.integer('tipo')
	
    })
  }

  down () {
    this.drop('catalogador')
  }

}

module.exports = CatalogadorTableSchema
