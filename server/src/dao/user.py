import datetime
from ... import engine
from ..exceptions import user


class User:
    def __init__(self, user_id, first_name, last_name, dob_year, dob_month, role_id):
        self.user_id = user_id
        self.first_name = first_name
        self.last_name = last_name
        self.dob_year = dob_year
        self.dob_month = dob_month
        self.role_id = role_id

    def get_auth_details(self):
        return {'firstName': self.first_name,
                'lastName': self.last_name,
                'roleId': self.role_id,
                'dobYear': self.dob_year,
                'dobMonth': self.dob_month}

    @classmethod
    def create_user(cls, email, password):
        """This method validates the user and returns user object"""
        conn = engine.raw_connection()
        try:
            cursor = conn.cursor()
            proc_name = 'User_ValidateUser'
            cursor.callproc(proc_name, [email, password])
            row = next(cursor.stored_results()).fetchone()
            cursor.close()
            if row:
                cursor = conn.cursor()
                user_id = row[0]
                proc_name = 'User_GetByUserIdForAuth'
                cursor.callproc(proc_name, [user_id])
                row = next(cursor.stored_results()).fetchone()
                first_name = row[0]
                last_name = row[1]
                dob_year = row[2]
                dob_month = row[2]
                role_id = row[4]
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
