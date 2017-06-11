'use strict'

const Schema = use('Schema')

class CalificacionTableSchema extends Schema {

  up () {
      this.create('calificacion', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id') /* foranean key */
      table.foreign('user_id').references('id').on('create_users_table')
      table.integer('contenido_id') /* foranean key */
      table.foreign('contenido_id').references('id').on('contenido')
      table.integer('calificacion') 
    })   

    
  }

  down () {
    this.table('calificacion', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = CalificacionTableSchema
