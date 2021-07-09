from logging import basicConfig, INFO
basicConfig(level=INFO)
from .app import app, api
from .db import db
from .src import routes
