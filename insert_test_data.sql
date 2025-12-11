# Insert data into the tables

USE health_app_db;

INSERT INTO routes (name, distance)
VALUES
    ('Wandle Trail', 12.5),
    ('Regents Park Loop', 2.7),
    ('Battersea Park Circuit', 1.9),
    ('Thames Riverside Run', 15.3),
    ('Greenwich Park Hill Route', 4.2),
    ('Hyde Park Grand Loop', 7.8),
    ('Richmond Riverside Path', 18.6),
    ('Clapham Common Track', 3.1),
    ('Hampstead Heath Ridge Run', 6.4),
    ('Epping Forest Trail', 19.2),
    ('Victoria Park Inner Loop', 3.5),
    ('Dulwich Wood Path', 5.1),
    ('Finsbury Park Circuit', 2.3),
    ('Woolwich Riverside Stretch', 11.7),
    ('Alexandra Palace Climb', 8.9);

INSERT INTO scores (routename, runnername, time)
VALUES
    ('Regents Park Loop', 'Gold Smiths', 600),
    ('Wandle Trail', 'Joe Smith', 6000),
    ('Thames Riverside Run', 'Jane Doe',  8050);

INSERT INTO users (username, firstname, lastname, email, hashedPassword)VALUES('gold', 'Gold', 'Smiths', 'gold@smiths.ac.uk', '$2a$10$flvg5ad4ZampXOySio0vYOg7QyB2dLJFC3UN/aAO79Wa5mDDobxfK');