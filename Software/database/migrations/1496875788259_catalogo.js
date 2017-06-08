'use strict'

const Schema = use('Schema')

class CatalogoTableSchema extends Schema {

  up () {
    this.create('catalogo', (table) => {
      table.increments()
      table.timestamps()
      table.string('titulo').unique()
      table.string('descripcion')
      table.integer('estado') /* 0=borrador , 1=por catalogar ,2=publico */
    })
  }

  down () {
    this.drop('catalogo')
  }

}

/* TABLA CATALOGO (id, titulo, descripcion, estado(borrador,por catalogar y publico))  */

module.exports = CatalogoTableSchema
