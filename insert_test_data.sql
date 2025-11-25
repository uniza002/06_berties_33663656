# Insert data into the tables

USE berties_books;

CREATE TABLE users (id INT AUTO_INCREMENT, username VARCHAR(16), firstname VARCHAR(20), lastname VARCHAR(20), email VARCHAR(254), hashedPassword VARCHAR(256), PRIMARY KEY(id));
INSERT INTO books (name, price)VALUES('Brighton Rock', 20.25),('Brave New World', 25.00), ('Animal Farm', 12.99);
INSERT INTO users (username, firstname, lastname, email, hashedPassword)VALUES('gold', 'Gold', 'Smiths', 'gold@smiths.ac.uk', 'smiths');