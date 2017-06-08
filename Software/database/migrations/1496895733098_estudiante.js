'use strict'

const Schema = use('Schema')

class EstudianteTableSchema extends Schema {

/* aun no se si va o no va esta tabla pero por si es necesario... */
  up () {
    this.create('estudiante', (table) => {
      table.increments()
      table.timestamps()
      table.string('nombre')
      table.string('tipo')
      table.string('password')
      table.string('correo')
    })
  }

  down () {
    this.drop('estudiante')
  }

}

module.exports = EstudianteTableSchema
