from flask import Flask
app = Flask(__name__)
env = app.config['ENV']

if env == 'development':
    from .config import DevelopmentConfig
    app.config.from_object(DevelopmentConfig)
elif env == 'Production':
    from .config import ProductionConfig
    app.config.from_object(ProductionConfig)

@app.route('/')
def func():
    return 'Hello from App'


from .db import db