from logging import basicConfig, INFO
basicConfig(level=INFO, format='%(asctime)s:%(name)s:%(message)s')
from .app import app, api
from .db import engine
from .src import routes

