'use strict'

const Schema = use('Schema')

class ContenidoTableSchema extends Schema {

  up () {
    this.create('contenido', (table) => {
      table.increments()
      table.timestamps()

      table.string('cuerpo') /* contenido u objeto */
      table.integer('estilo') /* tipo de objeo */
      table.integer('catalogo_id') /* tipo de objeo */
    })
  }

  down () {
    this.drop('contenido')
  }

}

module.exports = ContenidoTableSchema
