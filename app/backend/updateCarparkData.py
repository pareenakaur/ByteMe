import json
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cwd = os.getcwd()
cred = credentials.Certificate(fr'{cwd}\app\backend\config\key.json')
firebase_admin.initialize_app(cred)

def update_carpark_information(carparksColl, carparks_dict):
    for key in carparks_dict:
        carparks_list = carparks_dict[key]
        for carpark in carparks_list:
            if carparksColl.document(carpark['CarParkID']).get().exists:
                carparksColl.document(carpark['CarParkID']).update(carpark)
            else:
                carparksColl.document(carpark['CarParkID']).set(carpark)
    

db = firestore.client()
carparksColl = db.collection('carparks')

with open(fr'{cwd}\app\backend\config\hawkerCarparkAvailability.json', 'r') as json_file:
    carparks_dict = json.load(json_file)

update_carpark_information(carparksColl, carparks_dict)