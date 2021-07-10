DROP TABLE IF EXISTS Role;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS UserLogin;
DROP PROCEDURE IF EXISTS UserLogin_CheckEmailExists;
DROP PROCEDURE IF EXISTS User_ValidateUser;
DROP PROCEDURE IF EXISTS User_GetByUserIdForAuth;
DROP PROCEDURE IF EXISTS User_Signup;

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

delete from Role;

insert into Role(id, name)
values (1, 'User'),
       (2, 'SuperAdmin');

DELIMITER $$
CREATE PROCEDURE UserLogin_CheckEmailExists(
        IN email varchar(255)
)
BEGIN
    select 1
    from UserLogin
    where UserLogin.email = email;
END $$;
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE User_ValidateUser(
    IN  email varchar(255),
    IN  password varchar(512)
)
BEGIN
    select T1.userId userId,
           User.firstName firstName,
           User.lastName lastName,
           User.dobYear dobYear,
           User.dobMonth dobMonth,
           User.roleId roleId
    from (select UserLogin.userId userId
          from UserLogin
          where UserLogin.email = email
            and UserLogin.password = password) T1
    inner join User on T1.userId = User.id;
END $$;
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE User_GetByUserIdForAuth(
    IN userId int
)
BEGIN
    select User.firstName firstName,
           User.lastName lastName,
           User.dobYear dobYear,
           User.dobMonth dobMonth,
           User.roleId  roleId
    from User
    where User.id = userId
    and User.active = 1;

END $$;
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE User_Signup(
    IN firstName varchar(255),
    IN lastName varchar(255),
    IN email varchar(255),
    IN password varchar(512),
    IN dobYear int,
    IN dobMonth int
    )
BEGIN
    declare userId bigint;

    INSERT INTO User(User.firstName, User.lastName, User.dobYear, User.dobMonth, User.roleId)
                values(firstName, lastName, dobYear, dobMonth, 1);
    set userId = (SELECT LAST_INSERT_ID());

    INSERT INTO UserLogin(UserLogin.email, UserLogin.password, UserLogin.userId)
                values(email, password, userId);

    select userId;

END $$;
DELIMITER ;