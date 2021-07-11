from flask_restful import request, abort
from ..util.security_util import decode
from ..dao.user_dao import User


def authorize_request(auth_required: bool = True, auth_optional: bool = False):
    def func(original_function):
        def wrapper_func(*args, **kwargs):
            # if auth required decode the token and
            # if valid get the user and pass it to the function
            # if auth invalid then send None to the auth
            token = request.headers.get('Authorization', None)
            if token:
                # This means we got the token
                identifier = token[:6]
                if identifier == 'Bearer':
                    token = token[7:]
                    auth_obj = decode(token)
                    if auth_obj:
                        # This means we actually got a valid user now go
                        # to db and get the user info
                        user_id = auth_obj.get('userId')
                        user = User.get_user(user_id)
                        kwargs['user'] = user
                        return original_function(*args, **kwargs)
                    else:
                        if auth_required:
                            return abort(400)
            if auth_optional:
                kwargs['user'] = None
                return original_function(*args, **kwargs)
            else:
                return abort(400)

        return wrapper_func

    return func
