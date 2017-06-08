'use strict'

const Schema = use('Schema')

class ContenidoCatalogadorTableSchema extends Schema {

  up () {
    this.create('contenido_catalogador', (table) => {
      table.increments()
      table.timestamps()
      table.integer('catalogador_id')/* foranean key*/
      table.foreign('catalogador_id').references('id').on('catalogador')
      table.integer('contenido_id')/* foranean key*/
      table.foreign('contenido_id').references('id').on('contenido')
      table.integer('score').default('0') /* 0= no catalogado , 1=like , -1=dislike */
      table.integer('tipo_catalodador') /* idea almacenar el tipo del catalogador para hacer mas facil es estadistico */
    })
  }

  down () {
    this.drop('contenido_catalogador')
  }

}

module.exports = ContenidoCatalogadorTableSchema
