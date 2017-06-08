'use strict'

const Schema = use('Schema')

class ReferenciaTableSchema extends Schema {

  up () {
    this.create('referencia', (table) => {
      table.increments()
      table.timestamps()
      table.integer('catalogo_id') /* foranean key*/
      table.foreign('catalogo_id').references('id').on('catalogo')
      table.string('url')	
    })
  }

  down () {
    this.drop('referencia')
  }

}

module.exports = ReferenciaTableSchema
