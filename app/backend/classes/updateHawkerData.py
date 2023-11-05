import googlemaps
import json
from flask import Blueprint, request, jsonify
from firebase_admin import firestore

import firebase_admin
from firebase_admin import credentials
cred = credentials.Certificate("config/key.json")
firebase_admin.initialize_app(cred)

def update_hawker_centre_locations(hawkerCentreLocationsColl, hawkerCentreLocations, gmaps):
    docs = hawkerCentreLocationsColl.stream()
    for doc in docs:
        doc.reference.delete()

    locations = hawkerCentreLocations['hawkerCentreLocations']
    for location in locations:
        longitude = location['longitude']
        latitude = location['latitude']
        results = gmaps.places_nearby(location=f"{latitude}, {longitude}", keyword='hawker centre', radius=100)
        
        if len(results['results']) != 0:
            hawker_centre = results['results'][0]
            
            if 'Centre' in hawker_centre['name']:
                location['name'] = hawker_centre['name']
                hawkerCentreLocationsColl.document(hawker_centre['place_id']).set(location)

db = firestore.client()
hawkerCentresColl = db.collection('centres')
hawkerStallsColl = db.collection('stalls')
hawkerCentreLocationsColl = db.collection('centreLocations')

with open('config/hawkerCentreLocations.json', 'r') as json_file:
    hawkerCentreLocations = json.load(json_file)

gmaps = googlemaps.Client(key='AIzaSyB4OexlmStr943doK3Cjo15V8FnSI0dNQk')

update_hawker_centre_locations(hawkerCentreLocationsColl, hawkerCentreLocations, gmaps)