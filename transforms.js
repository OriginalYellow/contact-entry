const L = require('partial.lenses')
const R = require('ramda')
const RA = require('ramda-adjunct')

const transformContact = R.pipe(
  R.omit(['meta']),
  RA.renameKeys({ $loki: 'id' })
)

const transformContacts = L.collect([L.elems, transformContact])

module.exports = {
  transformContact,
  transformContacts
}