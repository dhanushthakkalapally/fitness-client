from ... import api
from ..resources.user import Signup

api.add_resource(Signup, '/user/signup')


