'use strict'

const Schema = use('Schema')

class ContentsTableSchema extends Schema {

  up () {
    this.create('contents', (table) => {
      table.increments()
      table.timestamps()
      table.string('text')
      table.string('title')
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = ContentsTableSchema
