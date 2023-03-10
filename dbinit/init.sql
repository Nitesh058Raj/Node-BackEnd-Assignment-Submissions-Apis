CREATE DATABASE IF NOT EXISTS assignmentdb;

USE assignmentdb;
DROP TABLE IF EXISTS new;

CREATE TABLE Users (
    user_id BIGINT  UNSIGNED NOT NULL AUTO_INCREMENT,
    name    VARCHAR(255) DEFAULT NULL,
    email   VARCHAR(255) DEFAULT NULL,
    role ENUM('teacher', 'student') DEFAULT NULL,
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT UQ_users_Email UNIQUE (email),
    PRIMARY KEY (user_id)
);

CREATE TABLE Assignments (
    assignment_id BIGINT  UNSIGNED NOT NULL AUTO_INCREMENT,
    title         VARCHAR(255) DEFAULT NULL,
    description   TEXT DEFAULT NULL,
    due_date      DATE NOT NULL,
    subject_name  VARCHAR(255) DEFAULT NULL,
    teacher_id    BIGINT  UNSIGNED NOT NULL,
    grade         SMALLINT DEFAULT NULL,
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (assignment_id),
    FOREIGN KEY (teacher_id) REFERENCES Users(user_id)
);

CREATE TABLE Asisgned (
    assignment_id  BIGINT  UNSIGNED NOT NULL,  
    student_id     BIGINT  UNSIGNED NOT NULL,
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assignment_id) REFERENCES Assignments(assignment_id),
    FOREIGN KEY (student_id) REFERENCES Users(user_id)
);

CREATE TABLE Submissions (
    submission_id BIGINT  UNSIGNED NOT NULL AUTO_INCREMENT,
    assignment_id BIGINT  UNSIGNED NOT NULL,
    student_id    BIGINT  UNSIGNED NOT NULL,
    docs          TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (submission_id),
    FOREIGN KEY (assignment_id) REFERENCES Assignments(assignment_id),
    FOREIGN KEY (student_id) REFERENCES Users(user_id)
);


