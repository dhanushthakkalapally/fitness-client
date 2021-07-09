import os
class Config(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_POOL_SIZE = 25
    SQLALCHEMY_DATABASE_URI = os.environ['CONNECTION_STRING']

class DevelopmentConfig(Config):
    pass


class ProductionConfig(Config):
    pass

