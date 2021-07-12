from flask_restful import Resource
from ..decorators.request_manager import authorize_request
from ..dao.user_dao import User


class Initialize(Resource):
    @authorize_request(auth_optional=True)
    def post(self, user: User):
        if user:
            # Then we have a valid request send the details with new
            # refreshed token
            details = user.get_auth_details()
            details['isAuthenticated'] = True
            return details
        else:
            # This means we don't have the user may be anonymous
            # Now send all the data as undefined
            return {'isAuthenticated': False}
