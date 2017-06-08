'use strict'

const Schema = use('Schema')

class ExpertoTableSchema extends Schema {

  up () {
    this.create('experto', (table) => {
      table.increments()
      table.timestamps()
      table.string('nombre').unique()
      table.string('password')
    })
  }

  down () {
    this.drop('experto')
  }

}

module.exports = ExpertoTableSchema
