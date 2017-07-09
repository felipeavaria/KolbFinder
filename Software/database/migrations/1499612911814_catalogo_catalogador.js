'use strict'

const Schema = use('Schema')

class CatalogoCatalogadorTableSchema extends Schema {

  up () {
    this.create('catalogo_catalogador', (table) => {
      // alter catalogo_catalogador table
      table.increments()
      table.timestamps()
      table.integer('catalogo_id') /* foranean key */
      table.foreign('catalogo_id').references('id').on('catalogo')
      table.integer('user_id') /* foranean key */
      table.foreign('user_id').references('id').on('users')
    })
  }

  down () {
    this.drop('catalogo_catalogador')
  }

}

module.exports = CatalogoCatalogadorTableSchema
