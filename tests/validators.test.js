const validContact = require('./valid-contact.mock.json')
const invalidContact = require('./invalid-contact.mock.json')
const { validate, errors } = require('partial.lenses.validation')

const { Model, validateContact } = require('../validators.js')

it('should consider the name object to be valid', () => {
  const result = errors(Model.name, validContact.name)
  expect(result).toBeUndefined()
})

it('should return messages saying that "first" and "last" are not strings, and that "middle" is nil or empty', () => {
  const invalidName = { middle: '', last: 3 }
  const result = errors(Model.name, invalidName)
  expect(result).toMatchSnapshot()
})

it('should return a message saying that invalidName is not an object', () => {
  const invalidName = 'asdf'
  const result = errors(Model.name, invalidName)
  expect(result).toMatchSnapshot()
})

it('should consider the address object to be valid', () => {
  const result = errors(Model.address, validContact.address)
  expect(result).toBeUndefined()
})

it('should return messages describing the different errors in the invalid address object', () => {
  const invalidAddress = {
    street: '',
    city: 'cool city',
    state: {},
    zip: 23452
  }
  const result = errors(Model.address, invalidAddress)
  expect(result).toMatchSnapshot()
})

it('should return a message saying that invalidAddress is not an object', () => {
  const invalidAddress = 3
  const result = errors(Model.address, invalidAddress)
  expect(result).toMatchSnapshot()
})

it('should consider the phone array to be valid', () => {
  const result = errors(Model.phone, validContact.phone)
  expect(result).toBeUndefined()
})

it('should return an array that indicates which element in the invalid phone array is invalid, and why', () => {
  invalidPhoneArr = [
    {
      number: '13434243',
      type: 'work'
    },
    {
      number: '123123123123',
      type: 'banana'
    },
    {
      number: '13434243',
      type: 'home'
    },
  ]

  const result = errors(Model.phone, invalidPhoneArr)
  expect(result).toMatchSnapshot()
})

it('should consider the valid contact to be valid', () => {
  const result = validateContact(validContact)
  expect(result).toBeUndefined()
})

it('should return error messages describing the different errors in the invalid contact object', () => {
  const result = validateContact(invalidContact)
  expect(result).toMatchSnapshot()
})
