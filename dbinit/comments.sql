-- CONSTRAINT UQ_assignments_Title UNIQUE (title)
-- CONSTRAINT UQ_users_Email UNIQUE (faculty_email)

--    marks         SMALLINT DEFAULT 0,
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


