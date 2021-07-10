import jwt
from ... import app
import datetime
secret_key = app.config['SECRET_KEY']
jwt_expiry = app.config['JWT_EXPIRY']

print(secret_key)
def encode(user_id):
    return jwt.encode({'userId': user_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=jwt_expiry),
                       'iat': datetime.datetime.utcnow()}, key=secret_key)


def decode(payload):
    return jwt.decode(payload, secret_key)
