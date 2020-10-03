const express = require('express')
const app = express()
const initializeDatabase = require('./initializeDatabase.js')
const { validateContact } = require('./validators.js')
const {
  transformContacts,
  transformContact
} = require('./transforms.js')

app.use(express.json());

(async function () {
  const db = await initializeDatabase()

  app.get('/contacts', (req, res) => {
    const allContacts = db.getCollection('contacts').find()
    res.send(transformContacts(allContacts))
  })

  app.get('/contacts/:id', (req, res) => {
    const contact = db.getCollection('contacts')
      .get(req.params.id)

    if (contact) {
      res.send(transformContact(contact))
    } else {
      res.status(400).send(
        `contact with id "${req.params.id}" not found`
      )
    }
  })

  app.post('/contacts', (req, res) => {
    const errors = validateContact(req.body)

    if (errors) {
      res.status(400).send(errors)
      return
    }

    const contacts = db.getCollection('contacts');
    const contact = contacts.insert(req.body)
    db.close()
    res.send(transformContact(contact))
  })

  app.put('/contacts/:id', (req, res) => {
    const contact = db.getCollection('contacts')
      .get(req.params.id)

    if (!contact) {
      res.status(400).send(
        `contact with id "${req.params.id}" not found`
      )
    }

    const errors = validateContact(req.body)

    if (errors) {
      res.status(400).send(errors)
      return
    }

    const contacts = db.getCollection('contacts');
    const updatedContact = contacts.update({
      ...contact,
      ...req.body
    })
    db.close()
    res.send(transformContact(updatedContact))
  })

  app.delete('/contacts/:id', (req, res) => {
    const contact = db.getCollection('contacts')
      .get(req.params.id)

    if (!contact) {
      res.status(400).send(
        `contact with id "${req.params.id}" not found`
      )
    }

    db.getCollection('contacts').remove(contact)
    db.close()
    res.send(transformContact(contact))
  })

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}`))
})();
