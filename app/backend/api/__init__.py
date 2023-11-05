from flask import Flask
from firebase_admin import credentials,initialize_app

cred = credentials.Certificate("config/key.json")
default_app = initialize_app(cred)

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'qweasdqweasd'
    
    from .userAPI import userAPI
    from .reviewsAPI import reviewsAPI
    from .hawkersAPI import hawkersAPI
    app.register_blueprint(userAPI,url_prefix='/user')
    app.register_blueprint(reviewsAPI,url_prefix='/reviews')
    app.register_blueprint(hawkersAPI,url_prefix='/hawkers')
    return app