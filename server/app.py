from flask import Flask
from flask_restful import Api
app = Flask(__name__)
env = app.config['ENV']

api = Api(app)

if env == 'development':
    from .config import DevelopmentConfig
    app.config.from_object(DevelopmentConfig)
    app.logger.info('Hello, Fitness App running in Development Mode :)')
elif env == 'Production':
    from .config import ProductionConfig
    app.config.from_object(ProductionConfig)


@app.route('/')
def func():
    return 'Hello from App'