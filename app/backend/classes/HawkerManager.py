import numpy as np
from utils.functions import haversine
from utils.functions import format_hawker_response
from firebase_admin import firestore

#import firebase_admin
#from firebase_admin import credentials
#cred = credentials.Certificate("api/key.json")
#firebase_admin.initialize_app(cred)

db = firestore.client()
hawkerCentresColl = db.collection('hawkercentres')

class HawkerManager:

    def __init__(self, db, gmaps):
        self.db = db
        self.gmaps = gmaps
    
    def getNearbyHawkerCentres(self, user_location, distance, format):
        nearby_hawker_centre_details = []
        distance_list = []

        hawkerCentreLocationsColl = self.db.collection('centreLocations')
        hawker_centre_locations_documents = hawkerCentreLocationsColl.stream()
        hawker_centre_locations_documents_list = [doc for doc in hawker_centre_locations_documents]

        found = 0

        # Get the list of Hawker Centre IDs within specified radius
        for document in hawker_centre_locations_documents_list:
            place_data = document.to_dict()
            lat1, long1 = float(place_data['latitude']), float(place_data['longitude'])
            lat2, long2 = float(user_location['latitude']), float(user_location['longitude'])
            dist = haversine(lat1, long1, lat2, long2)
            distance_list.append(dist)
            
            # If the distance is lower than specified, increase the found count by 1
            if dist <= float(distance):
                found += 1

        if found <= 3:
            nearby_place_index_list = np.argsort(distance_list)[:found]

        else:
            nearby_place_index_list = np.argsort(distance_list)[:3]

        for index in nearby_place_index_list:
            nearby_place_document = hawker_centre_locations_documents_list[index]
            place_id = nearby_place_document.id
            nearby_hawker_centre_details.append(self.getHawkerCentreInfo(place_id,format))      

        print(f"{len(nearby_hawker_centre_details)} hawker centres found nearby")
        return nearby_hawker_centre_details
    
    def getHawkerCentreInfo(self, centreID, format):
        response = self.gmaps.place(place_id=centreID)['result']
        if format:
            response = format_hawker_response(response)
        #user_rating = Get user rating from the database
        #user_review_count = Get user review count from database
        return response

    
    def getHawkerCentreStalls(self, centreID, format):
        hawker_stalls_list = []
        hawkerCentreLocationsColl = self.db.collection('centreLocations')
        location = hawkerCentreLocationsColl.document(centreID).get().to_dict()

        response = self.gmaps.places_nearby(location=f"{location['latitude']}, {location['longitude']}", keyword='hawker', radius=50)['results']
        for hawker_stall in response:
            hawker_stall_response = self.getStallInfo(hawker_stall['place_id'], format)
            hawker_stalls_list.append(hawker_stall_response)

        return hawker_stalls_list

    def getStallInfo(self, stallID, format):
        response = self.gmaps.place(place_id = stallID)['result']
        if format:
            format_hawker_response(response)
        #user_rating = Get user rating from the database
        #user_review_count = Get user review count from database
        return response
        

    def getHawkerCentreLocation(self, placeID):
        hawkerCentreLocationsColl = self.db.collection('centreLocations')
        location = hawkerCentreLocationsColl.document(placeID).get()
        return location
    
    def getFavouriteStalls(self, userID, format):
        usersColl = self.db.collection('users')
        user_information = usersColl.document(userID).get().to_dict()
        favourite_ids = user_information['favourites']

        favourite_stalls = []
        for id in favourite_ids:
            favourite_stalls.append(self.getStallInfo(id, format))
        
        return favourite_stalls
    
    def getPlaceIDFromLatLong(self, lat, long):
        distance_list = []

        hawkerCentreLocationsColl = self.db.collection('centreLocations')
        hawker_centre_locations_documents = hawkerCentreLocationsColl.stream()
        hawker_centre_locations_documents_list = [doc for doc in hawker_centre_locations_documents]

        # Get the list of Hawker Centre IDs within specified radius
        for document in hawker_centre_locations_documents_list:
            place_data = document.to_dict()

            lat1, long1 = float(place_data['latitude']), float(place_data['longitude'])
            lat2, long2 = float(lat), float(long)
            dist = haversine(lat1, long1, lat2, long2)
            
            # If the distance is lower than specified, query the information and append to list
            distance_list.append(dist)

        place_id = hawker_centre_locations_documents_list[np.argmin(distance_list)].id
        return place_id

    def addHawkerReview(centreID,reviewID):
        hawkerCentreLocationsColl = hawkerCentresColl.document(centreID).update({"reviews": firestore.ArrayUnion([reviewID])})
        return

    def deleteHawkerReview(centreID,reviewID):
        hawkerCentreLocationsColl = hawkerCentresColl.document(centreID).update({"reviews": firestore.ArrayRemove([reviewID])})
        return

    def addHawkerReport(centreID,reportID):
        hawkerCentreLocationsColl = hawkerCentresColl.document(centreID).update({"reports": firestore.ArrayUnion([reportID])})
        return

    def deleteHawkerReport(centreID,reportID):
        hawkerCentreLocationsColl = hawkerCentresColl.document(centreID).update({"reports": firestore.ArrayRemove([reportID])})
        return