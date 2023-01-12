CREATE DATABASE IF NOT EXISTS assignmentdb;

USE assignmentdb;
DROP TABLE IF EXISTS new;

CREATE TABLE users (
    user_id BIGINT  UNSIGNED NOT NULL AUTO_INCREMENT ,
    name    VARCHAR(255) DEFAULT NULL,
    email   VARCHAR(255) DEFAULT NULL,
    role ENUM('teacher', 'student') DEFAULT NULL,
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id),
    -- CONSTRAINT UQ_users_Email UNIQUE (faculty_email)
);

CREATE TABLE Assignments (
    assignment_id BIGINT  UNSIGNED NOT NULL AUTO_INCREMENT ,
    title         VARCHAR(255) DEFAULT NULL,
    description   TEXT DEFAULT NULL,
    due_date      DATE NOT NULL,
    subject_name  VARCHAR(255) DEFAULT NULL,
    teacher_id    BIGINT  UNSIGNED NOT NULL,
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (assignment_id),
    FOREIGN KEY (teacher_id) REFERENCE Users(user_id)
    -- CONSTRAINT UQ_assignments_Title UNIQUE (title)
);

CREATE TABLE Submissions (
    submission_id BIGINT  UNSIGNED AUTO_INCREMENT ,
    assignment_id BIGINT  UNSIGNED NOT NULL,
    student_id    BIGINT  UNSIGNED NOT NULL,
    file VARCHAR(255) DEFAULT NULL,
    grade SMALLINT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (submission_id),
    FOREIGN KEY (assignment_id) REFERENCES Assignments(assignment_id),
    FOREIGN KEY (student_id) REFERENCES Users(user_id)
);

-- If we use any other method for Authentication we can use below table 
-- Or might want to go for eassy early Cryptografy (encryption/decryption algos) in project
-- CREATE TABLE Authentication (
--    token_id  BIGINT  UNSIGNED AUTO_INCREMENT,
--    user_id BIGINT  UNSIGNED NOT NULL,
--    token VARCHAR(255) NOT NULL,
--    expire_at TIMESTAMP NOT NULL,
--    PRIMARY KEY (token_id),
--    FOREIGN KEY (user_id) REFERENCES Users(user_id)
-- );


