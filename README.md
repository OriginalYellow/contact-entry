# contact-entry
> a back-end coding assignment that I did for a job interview
## Setup
``` bash
# install dependencies
$ yarn install
# run server on localhost:3000
$ yarn run dev
# run tests
$ yarn run test
```
## API
```
| HTTP Method | Route          | Description            |
|-------------|----------------|------------------------|
| GET         | /contacts      | List all contacts      |
| POST        | /contacts      | Create a new contact   |
| PUT         | /contacts/{id} | Update a contact       |
| GET         | /contacts/{id} | Get a specific contact |
| DELETE      | /contacts/{id} | Delete a contact       |
```