from flask import Flask
from firebase_admin import credentials,initialize_app
import os

current_dir = os.path.dirname(__file__)
key_path = os.path.join(current_dir, '..', 'config', 'key.json')

cred = credentials.Certificate(key_path)
default_app = initialize_app(cred)

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'qweasdqweasd'
    
    from .userAPI import userAPI
    from .reviewsAPI import reviewsAPI
    from .reportsAPI import reportsAPI
    from .hawkersAPI import hawkersAPI
    app.register_blueprint(userAPI,url_prefix='/user')
    app.register_blueprint(reviewsAPI,url_prefix='/reviews')
    app.register_blueprint(reportsAPI,url_prefix='/reports')
    app.register_blueprint(hawkersAPI,url_prefix='/hawkers')
    return app