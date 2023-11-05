import requests
import json
from utils.functions import haversine
from flask import Blueprint, request, jsonify
from firebase_admin import firestore

#import firebase_admin
#from firebase_admin import credentials
#cred = credentials.Certificate("api/key.json")
#firebase_admin.initialize_app(cred)

#db = firestore.client()
#hawkerCentresColl = db.collection('centres')
#hawkerStallsColl = db.collection('stalls')

class HawkerManager:

    def __init__(self, db, gmaps):
        self.db = db
        self.gmaps = gmaps
    
    def getNearbyHawkerCentres(self, user_location, distance):
        nearby_hawker_centre_details = []

        hawkerCentreLocationsColl = self.db.collection('centreLocations')
        hawker_centre_locations_documents = hawkerCentreLocationsColl.stream()

        # Get the list of Hawker Centre IDs within specified radius
        for document in hawker_centre_locations_documents:
            place_id = document.id
            place_data = document.to_dict()

            lat1, long1 = float(place_data['latitude']), float(place_data['longitude'])
            lat2, long2 = float(user_location['latitude']), float(user_location['longitude'])
            dist = haversine(lat1, long1, lat2, long2)
            
            # If the distance is lower than specified, query the information and append to list
            if dist <= float(distance):
                place_details = self.gmaps.place(place_id = place_id)
                nearby_hawker_centre_details.append(place_details['result'])
        print(f"{len(nearby_hawker_centre_details)} hawker centres found nearby")
        return nearby_hawker_centre_details
    
    def getHawkerCentreInfo(self, centreID):
        centre_info = self.gmaps.place(place_id=centreID)
        return centre_info
    
    def getHawkerCentreStalls(self, centreID):
        hawkerCentreLocationsColl = self.db.collection('centreLocations')
        location = hawkerCentreLocationsColl.document(centreID).get().to_dict()

        results = self.gmaps.places_nearby(location=f"{location['latitude']}, {location['longitude']}", keyword='hawker', radius=50)
        return results
        return 
            
    def getStallInfo(self, stallID):
        stall_info = self.gmaps.place(place_id = stallID)
        return stall_info

    def getHawkerCentreLocation(self, placeID):
        hawkerCentreLocationsColl = self.db.collection('centreLocations')
        location = hawkerCentreLocationsColl.document(placeID).get()
        return location
    
    def getFavouriteStalls(self, userID):
        usersColl = self.db.collection('users')
        user_information = usersColl.document(userID).get().to_dict()
        favourite_ids = user_information['favourites']

        favourite_stalls = []
        for id in favourite_ids:
            favourite_stall = self.gmaps.place(place_id = id)
            favourite_stalls.append(favourite_stall)
        
        return favourite_stalls