import jwt
from ... import app
import datetime

secret_key = app.config['SECRET_KEY']
jwt_expiry = app.config['JWT_EXPIRY']


def encode(user_id):
    return 'Bearer '+jwt.encode({'userId': user_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=jwt_expiry),
                       'iat': datetime.datetime.utcnow()}, key=secret_key)


def decode(payload):
    try:
        return jwt.decode(payload, secret_key, algorithms="HS256")
    except jwt.ExpiredSignatureError as e:
        return None
