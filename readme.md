
# Erino-CRM

Welcom to Customer Relationship Management of Erino.

This is a basic application for managing the contacts of the organization.

### Functionalities:
  - Add a new contact.
  - Fetch the contacts in form of pages. Choose your preferred page size. 
  - Sort and filter contacts based on your preferences.
  - Update a contact.
  - Delete a contact.

## Tech Stack

**Client:** React, Typescript, MaterialUI

**Server:** Node, Typescript, NestJS


## Screenshots

![Create contacts Page](https://raw.githubusercontent.com/SumitDas2004/erino-crm/refs/heads/main/CreateContacts.png)

![Show contacts page](https://raw.githubusercontent.com/SumitDas2004/erino-crm/refs/heads/main/contacts.png)

![Update Contact Page](https://raw.githubusercontent.com/SumitDas2004/erino-crm/refs/heads/main/updateContacts.png)
## Run Locally

### Backend

Clone the project

```bash
  git clone git@github.com:SumitDas2004/erino-crm.git
```

Go to the backend directory

```bash
  cd erino-crm/backend
```

Install dependencies

```bash
  npm install
```

Create the .env file according to the instructions provided in .env.sample

Generate the prisma client and sync with database

```bash
  prisma generate
  prisma db push
```

Start the server

```bash
  npm run start
```

### Frontend

Go to the frontend directory

```bash
  cd ../frontend
```

Install dependencies

```bash
  npm install
```

Create the .env file according to the instructions provided in .env.sample

Start the server

```bash
  npm run dev
```
## API Reference

Find all the api collections here: https://documenter.getpostman.com/view/32803371/2sAYBPmECZ
