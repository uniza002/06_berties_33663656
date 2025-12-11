# Create database script for Health site

# Create the database
CREATE DATABASE IF NOT EXISTS health_app_db;
USE health_app_db;

# Create routes tables
CREATE TABLE IF NOT EXISTS routes (
    id     INT AUTO_INCREMENT,
    name   VARCHAR(50),
    distance  DECIMAL(5, 2),
    PRIMARY KEY(id));

# Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    username VARCHAR(16),
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(254),
    hashedPassword VARCHAR(256),
    PRIMARY KEY(id));

# Create scoreboard table
CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT,
    routename    VARCHAR(50),
    runnername  VARCHAR(50),
    time        INT,
    PRIMARY KEY(id));
    
# Create the application user
CREATE USER IF NOT EXISTS 'health_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON health_app_db.* TO ' health_app'@'localhost';
