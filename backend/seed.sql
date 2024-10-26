CREATE TABLE roles (
    roleID VARCHAR(30) PRIMARY KEY,
    roleType CHAR(20) NOT NULL,
    FOREIGN KEY (roleType) REFERENCES roles(roleType)
);

CREATE TABLE accounts (
    accID VARCHAR(30) PRIMARY KEY,
    contactNo VARCHAR(10),
    password VARCHAR(30),
    email VARCHAR(50),
    roleType VARCHAR(50),
    FOREIGN KEY (roleType) REFERENCES roles(roleType)
);

INSERT INTO roles (roleID, roleType) VALUES
('1', 'Admin'),
('2', 'Operator'),
('3', 'Content Creator'),
('4', 'Analyst');

INSERT INTO accounts (accID, contactNo, password, email, roleType) VALUES
('user1', '1234567890', 'hashed_password', 'user1@example.com', 'Admin');