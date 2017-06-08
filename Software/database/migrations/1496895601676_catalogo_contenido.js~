'use strict'

const Schema = use('Schema')

class CatalogoContenidoTableSchema extends Schema {

  up () {
    this.create('catalogo_contenido', (table) => {
      table.increments()
      table.timestamps()
      table.integer('catalogo_id') /* foranean key */
      table.foreign('catalogo_id').references('id').on('catalogo')
      table.integer('contenido_id') /* foranean key */
      table.foreign('contenido_id').references('id').on('contenido')
    })
  }

  down () {
    this.drop('catalogo_contenido')
  }

}

module.exports = CatalogoContenidoTableSchema
