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