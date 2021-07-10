from flask_restful import Resource, reqparse
from ..dao import User
from ..exceptions import user as user_exceptions


class Signup(Resource):
    def post(self):
        """This methods need to signup the user and
            return JWT and user related info
            if the user has successfully authenticated"""
        # TODO: Need to make a utility function for reqparser
        parser = reqparse.RequestParser(trim=True)
        parser.add_argument('firstName', type=str, required=True)
        parser.add_argument('lastName', type=str, required=True)
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        parser.add_argument('dobYear', type=int, required=True)
        parser.add_argument('dobMonth', type=int, required=True)
        args = parser.parse_args(strict=True)
        try:
            user = User.register_user(first_name=args['firstName'], last_name=args['lastName'], email=args['email'],
                                      password=args['password'], dob_year=args['dobYear'], dob_month=args['dobMonth'])
            return user.get_auth_details(), 200
        except user_exceptions.UserAlreadyExists as e:
            return {'message': str(e.message)}, e.error_code


class Login(Resource):
    def post(self):
        """This method validates the user and returns the user dict for client"""
        parser = reqparse.RequestParser(trim=True)
        parser.add_argument('email', type=str, required=True, help="email is required")
        parser.add_argument('password', type=str, required=True, help="password is required")
        args = parser.parse_args(strict=True, http_error_code=401)
        try:
            user = User.create_user(args['email'], args['password'])
            return user.get_auth_details(), 200
        except user_exceptions.InvalidCredentials as e:
            return {'message': str(e.message)}, e.error_code
