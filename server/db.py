from flask_sqlalchemy import SQLAlchemy
from .app import app

db = SQLAlchemy(app)

engine = db.engine

conn = engine.raw_connection()
cursor = conn.cursor()
cursor.execute('select 100')
for i in cursor:
    print(i)
cursor.close()
conn.close()
