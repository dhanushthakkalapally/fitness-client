from logging import basicConfig, INFO
basicConfig(level=INFO)
from .app import app
from .db import db