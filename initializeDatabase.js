const loki = require('lokijs')
const contactsForSeeding = require('./seed-contacts.json')

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    var db = new loki('contact-entry.db', {
      autoload: true,
      autoloadCallback: seedDatabase,
      autosave: true,
      autosaveInterval: 4000
    });

    function seedDatabase() {
      var contacts = db.getCollection('contacts');

      if (contacts === null) {
        contacts = db.addCollection("contacts")
        contacts.insert(contactsForSeeding)
        db.close()
      }
      
      resolve(db)
    }
  })
}

module.exports = initializeDatabase