from logging import basicConfig, INFO
basicConfig(level=INFO)
from .app import app, Api
from .db import db
