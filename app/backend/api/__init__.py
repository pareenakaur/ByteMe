from flask import Flask
from firebase_admin import firestore,credentials,initialize_app
from classes.HawkerManager import HawkerManager
import os
import googlemaps

current_dir = os.path.dirname(__file__)
# first server
# key_path = os.path.join(current_dir, '..', 'config', 'key.json')

# second server
key_path = os.path.join(current_dir, '..', 'config', 'key2.json')

cred = credentials.Certificate(key_path)
default_app = initialize_app(cred)

db = firestore.client()
gmaps = googlemaps.Client(key='AIzaSyB4OexlmStr943doK3Cjo15V8FnSI0dNQk')

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'qweasdqweasd'

    hawkerManager = HawkerManager(db, gmaps)
    print("Initializing database...")
    hawkerManager.initializeHawkerCentreCollection()
    
    from .userAPI import userAPI
    from .reviewsAPI import reviewsAPI
    from .reportsAPI import reportsAPI
    from .hawkersAPI import hawkersAPI
    app.register_blueprint(userAPI,url_prefix='/user')
    app.register_blueprint(reviewsAPI,url_prefix='/reviews')
    app.register_blueprint(reportsAPI,url_prefix='/reports')
    app.register_blueprint(hawkersAPI,url_prefix='/hawkers')
    return app