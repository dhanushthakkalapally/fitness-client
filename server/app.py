from flask import Flask
from flask_restful import Api, request
from flask_cors import CORS

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

CORS(app, resources={r"*": {"origins": "http://localhost:3000/*"}},
     methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
     allow_headers=['Authorization, Content-Type, Origin'])


@app.before_request
def log_requests():
   app.logger.info(request.json)


@app.route('/')
def func():
    return 'Hello from App'
