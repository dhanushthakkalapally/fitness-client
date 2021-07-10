from ... import api
from ..resources.user import Signup, Login

api.add_resource(Signup, '/user/signup')
api.add_resource(Login, '/user/login')


