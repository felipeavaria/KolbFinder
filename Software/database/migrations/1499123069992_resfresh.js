'use strict'

const Schema = use('Schema')

class ResfreshTableSchema extends Schema {

  up () {
    this.table('resfresh', (table) => {
      // alter resfresh table
    })
  }

  down () {
    this.table('resfresh', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = ResfreshTableSchema
