from .secret_key_dao import SecretKeyDao
from ... import app
app.config['SECRET_KEY'] = SecretKeyDao.get_jwt_key()
from .user_dao import User
