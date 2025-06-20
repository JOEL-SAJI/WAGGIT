-- Create the Waggit database if it doesn't exist
CREATE DATABASE IF NOT EXISTS Waggit;

-- Use the Waggit database
USE Waggit;

-- Create the Users table
CREATE TABLE IF NOT EXISTS Users (
    Si_No INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);
