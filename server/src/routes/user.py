from ... import api
from ..resources.user import Signup, Login

api.add_resource(Signup, '/api/user/signup')
api.add_resource(Login, '/api/user/login')


