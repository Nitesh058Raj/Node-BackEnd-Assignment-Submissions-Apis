CREATE DATABASE IF NOT EXISTS assignmentdb;

USE assignmentdb;
DROP TABLE IF EXISTS new;
CREATE TABLE assignments (
    id BIGINT  UNSIGNED NOT NULL AUTO_INCREMENT,
    faculty_name VARCHAR(255) DEFAULT NULL,
    faculty_email   VARCHAR(255) DEFAULT NULL,
    description VARCHAR(255) DEFAULT NULL,
    title      VARCHAR(255) DEFAULT NULL,
    subject_name    VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_assignments_Title UNIQUE (title)
);

CREATE TABLE users (
    id BIGINT  UNSIGNED NOT NULL AUTO_INCREMENT,
    faculty_name VARCHAR(255) DEFAULT NULL,
    faculty_email   VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_users_Email UNIQUE (faculty_email)
);
