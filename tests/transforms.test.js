const allContacts = require('./all-contacts.mock.json')

const { 
  transformContact,
  transformContacts,
} = require('../transforms.js')

it('should return a correctly transformed contact', () => {
  const result = transformContact(allContacts[0])
  expect(result).toMatchSnapshot()
})

it('should return an array of correctly transformed contacts', () => {
  const result = transformContacts(allContacts)
  expect(result).toMatchSnapshot()
})
