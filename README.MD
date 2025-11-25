# Berties Books Website

Bertie's Books Page

Uses node.js with Express and EJS.

To install and run:

```
npm install
node index.js
```

## dotenv

To protect my database credentials, I've moved them from index.js into a .env file. This file can then be added to .gitignore to ensure the file is only stored and used locally, and not synced to Github or elsewhere online. 

## Access Control

I have restricted access to addbook.ejs to logged-in users to prevent random users from spamming the page with bogus book add requests. I haven't added this access control elsewhere as other pages don't have any sensitive information contained on them, such as as searching or viewing existing books.

## Sanitisation

Sanitisation has been added to the username, name, and emails fields on the register page to prevent a XSS attack. Since the password is hashed and salted, it's not necessary to sanitise this input as it should simply be stored directly into the database without being displayed to the user. 