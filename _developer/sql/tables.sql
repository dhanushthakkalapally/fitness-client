CREATE TABLE Role(
    id tinyint NOT NULL,
    name varchar(100),
    CONSTRAINT PK_Role PRIMARY KEY (id ASC),
    CONSTRAINT UQ_Role_id UNIQUE (name)
);

CREATE TABLE User(
    dateCreated datetime DEFAULT (current_timestamp()),
    dateModified datetime DEFAULT (current_timestamp()),
    id int AUTO_INCREMENT NOT NULL,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    dobYear int NOT NULL,
    active binary NOT NULL DEFAULT (1),
    dobMonth int NOT NULL,
    roleId tinyint NOT NULL,
    CONSTRAINT PK_User PRIMARY KEY (id ASC),
    CONSTRAINT FK_User_Role FOREIGN KEY (roleId) REFERENCES Role(id)
);

CREATE TABLE UserLogin(
    dateCreated datetime DEFAULT (current_timestamp()) NOT NULL,
    dateModified datetime DEFAULT (current_timestamp()) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(512) NOT NULL,
    userId int NOT NULL,
    CONSTRAINT PK_UserLogin PRIMARY KEY(email ASC),
    CONSTRAINT FK_User_userId FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE SecretKey
(
    type  varchar(10) UNIQUE ,
    value varchar(255)       NOT NULL
);
