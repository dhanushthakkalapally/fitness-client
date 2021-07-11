from ... import engine, app
from ..exceptions import user
from ..util import encode


class User:
    def __init__(self, user_id, first_name, last_name, dob_year, dob_month, role_id):
        self.user_id = user_id
        self.first_name = first_name
        self.last_name = last_name
        self.dob_year = dob_year
        self.dob_month = dob_month
        self.role_id = role_id

    def get_auth_details(self):
        token = encode(self.user_id)
        return {'firstName': self.first_name,
                'lastName': self.last_name,
                'roleId': self.role_id,
                'dobYear': self.dob_year,
                'dobMonth': self.dob_month,
                'token': token}

    @classmethod
    def create_user(cls, email, password):
        """This method validates the user and returns user object on successful login these method
            also need to send the JWT's"""
        conn = engine.raw_connection()
        try:
            cursor = conn.cursor()
            proc_name = 'User_ValidateUser'
            cursor.callproc(proc_name, [email, password])
            row = next(cursor.stored_results()).fetchone()
            cursor.close()
            if row:
                user_id = row[0]
                first_name = row[1]
                last_name = row[2]
                dob_year = row[3]
                dob_month = row[4]
                role_id = row[5]
                cursor.close()
                return cls(user_id, first_name, last_name, dob_year, dob_month, role_id)
            else:
                raise user.InvalidCredentials("Invalid credentials")
        except user.InvalidCredentials as e:
            raise user.InvalidCredentials(e)
        except Exception as e:
            raise e
        finally:
            conn.close()

    @classmethod
    def register_user(cls, first_name, last_name, email, password, dob_year, dob_month, role_id=1):
        """This method registers user and returns user object"""
        conn = engine.raw_connection()
        try:
            cursor = conn.cursor()
            # Check if the user already exists
            proc_name = 'UserLogin_CheckEmailExists'
            cursor.callproc(proc_name, [email])
            result_set = next(cursor.stored_results())
            row = result_set.fetchone()
            cursor.close()
            if row:
                # This means user already exists raise error
                raise user.UserAlreadyExists("User Already Exists")
            else:
                # Create the user
                proc_name = 'User_Signup'
                cursor = conn.cursor()
                cursor.callproc(proc_name, (first_name, last_name, email, password, dob_year, dob_month))
                result_set = next(cursor.stored_results())
                row = result_set.fetchone()
                cursor.close()
                conn.commit()
                user_id = row[0]
                first_name = row[1]
                last_name = row[2]
                dob_year = row[3]
                dob_month = row[4]
                role_id = row[5]
                return cls(user_id, first_name, last_name, dob_year, dob_month, role_id)
        except user.UserAlreadyExists as e:
            raise e
        except Exception as e:
            app.logger.exception(e)
        finally:
            conn.close()

    @classmethod
    def get_user(cls, user_id):
        conn = engine.raw_connection()
        try:
            cursor = conn.cursor()
            proc_name = "User_GetUserById"
            cursor.callproc(proc_name, [user_id, ])
            row = next(cursor.stored_results()).fetchone()
            cursor.close()
            if row:
                first_name = row[0]
                last_name = row[1]
                dob_year = row[2]
                dob_month = row[3]
                role_id = row[4]
                return cls(user_id, first_name, last_name, dob_year, dob_month, role_id)
            else:
                raise user.UserNotFound("user not fount")
        except user.UserNotFound as e:
            raise user.UserNotFound(e)
        except Exception as e:
            app.logger.exception(e)
        finally:
            conn.close()
