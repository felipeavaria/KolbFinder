'use strict'

const Schema = use('Schema')

class ContenidoTableSchema extends Schema {

  up () {
    this.create('contenido', (table) => {
      table.increments()
      table.timestamps()
      table.string('titulo').unique()
      table.string('cuerpo') /* contenido u objeto */
      table.integer('estio') /* tipo de objeo */
    })
  }

  down () {
    this.drop('contenido')
  }

}

module.exports = ContenidoTableSchema