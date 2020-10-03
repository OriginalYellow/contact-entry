const R = require('ramda')
const RA = require('ramda-adjunct')
const V = require('partial.lenses.validation')

const isString = [
  RA.isString,
  'value is not a string'
]

const isObject = [
  RA.isObject,
  'value is not an object'
]

const isNotNilOrEmpty = [
  RA.isNotNilOrEmpty,
  'value is nil or empty'
]

const isNotEmptyString = V.both(
  isString,
  isNotNilOrEmpty
)

const Model = {
  name: V.both(
    isObject,
    V.props({
      first: isNotEmptyString,
      middle: isNotEmptyString,
      last: isNotEmptyString
    })
  ),

  address: V.both(
    isObject,
    V.props({
      street: isNotEmptyString,
      city: isNotEmptyString,
      state: isNotEmptyString,
      zip: isNotEmptyString
    })
  ),

  phone: V.both(
    isObject,
    V.arrayIx(V.props({
      number: isNotEmptyString,
      type: [
        V.or(
          R.equals('mobile'),
          R.equals('work'),
          R.equals('home'),
        ),
        '"type" is not "mobile", "work", or "home"'
      ]
    }))
  ),

  email: isNotEmptyString
}

const validateContact = V.errors(V.both(
  isObject,
  V.props(Model)
))

module.exports = {
  Model,
  validateContact
}