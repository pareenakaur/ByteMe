import googlemaps
import json
import time
import os
from classes.HawkerManager import HawkerManager
from firebase_admin import firestore
from firebase_admin import credentials

cwd = os.getcwd()

cred = credentials.Certificate(fr'{cwd}\app\backend\config\key.json')
firebase_admin.initialize_app(cred)

def update_hawker_centre_locations(hawkerCentresColl, hawkerCentreLocations, gmaps):
    locations = hawkerCentreLocations['hawkerCentreLocations']
    for location in locations:
        longitude = location['longitude']
        latitude = location['latitude']
        results = gmaps.places_nearby(location=f"{latitude}, {longitude}", keyword='hawker centre', radius=20)
        
        if len(results['results']) != 0:
            hawker_centre = results['results'][0]
            
            if 'Centre' in hawker_centre['name']:
                location['name'] = hawker_centre['name']
                hawker_centre_response = gmaps.place(place_id=hawker_centre['place_id'])['result']
                location['formatted_address'] = hawker_centre_response['formatted_address']

                doc = hawkerCentresColl.document(hawker_centre['place_id']).get()
                if doc.exists:
                    hawkerCentresColl.document(hawker_centre['place_id']).update(location)
                else:
                    hawkerCentresColl.document(hawker_centre['place_id']).set(location)

def update_hawker_centre_stalls(hawkerCentresColl,hawkerManager):
    docs = hawkerCentresColl.stream()
    count = sum(1 for _ in docs)
    i = 1
    docs = hawkerCentresColl.stream()
    for doc in docs:
        print(f"Getting stalls for {i}/{count} hawker centres...")
        hawker_stall_ids = []
        hawker_centre_id = doc.id
        hawker_stalls = hawkerManager.updateHawkerCentreStalls(hawker_centre_id, True)
        for hawker_stall in hawker_stalls:
            hawker_stall_ids.append(hawker_stall['place_id'])

        doc_ref = hawkerCentresColl.document(hawker_centre_id)  
        doc_ref.update({
            'hawker_stalls' : hawker_stall_ids
        })
        i += 1

db = firestore.client()
hawkerCentres = db.collection('hawkercentres')

with open(fr'{cwd}\app\backend\config\hawkerCentreLocations.json', 'r') as json_file:
    hawkerCentreLocations = json.load(json_file)

gmaps = googlemaps.Client(key='AIzaSyB4OexlmStr943doK3Cjo15V8FnSI0dNQk')
hawkerManager = HawkerManager(db, gmaps)

start_time = time.time()
update_hawker_centre_locations(hawkerCentres, hawkerCentreLocations, gmaps)
update_hawker_centre_stalls(hawkerCentres, hawkerManager)
end_time = time.time()
print(f"Took {round(end_time-start_time)} seconds")