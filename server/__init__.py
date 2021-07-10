from logging import basicConfig, INFO
basicConfig(level=INFO)
from .app import app, api
from .db import engine
from .src import routes
from .src.dao import SecretKeyDao
app.config['SECRET_KEY'] = SecretKeyDao.get_jwt_key()
