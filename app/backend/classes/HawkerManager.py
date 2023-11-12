import numpy as np
import math
from firebase_admin import firestore
from classes.ReviewManager import ReviewManager
from classes.ReportManager import ReportManager
from utils.functions import haversine
from utils.functions import format_hawker_response
from utils.functions import get_carpark_availability
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

        hawkerCentresColl = self.db.collection('hawkercentres')
        hawker_centre_locations_documents = hawkerCentresColl.stream()
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
            nearby_hawker_centre_details.append(self.getHawkerCentreInfo(place_id, format))      

        print(f"{len(nearby_hawker_centre_details)} hawker centres found nearby")
        return nearby_hawker_centre_details
    
    def getHawkerCentreInfo(self, centreID, format):
        response = self.gmaps.place(place_id=centreID)['result']
        if format:
            response = format_hawker_response(response)

        response['user_rating'] = self.getHawkerCentreRating(centreID)
        response['user_review_count'] = self.getHawkerCentreReviewCount(centreID)
        response['user_report_count'] = self.getHawkerCentreReportCount(centreID)
        response['crowdedness'] = self.getHawkerCentreCrowdedness(centreID)
        return response

    
    def updateHawkerCentreStalls(self, centreID, format):
        hawker_stalls_list = []
        hawkerCentresColl = self.db.collection('hawkercentres')
        location = hawkerCentresColl.document(centreID).get().to_dict()

        response = self.gmaps.places_nearby(location=f"{location['latitude']}, {location['longitude']}", keyword='hawker', radius=20)['results']
        if len(response) == 0:
            return None
        for hawker_stall in response:
            hawker_stall_response = self.getStallInfo(hawker_stall['place_id'], format)
            hawker_stalls_list.append(hawker_stall_response)

        return hawker_stalls_list
    
    def getHawkerCentreStalls(self, centreID, format):
        hawker_stalls_list = []
        hawkerCentresColl = self.db.collection('hawkercentres')
        hawker_centre = hawkerCentresColl.document(centreID).get().to_dict()

        for hawker_stall_id in hawker_centre['hawker_stalls']:
            hawker_stall_response = self.getStallInfo(hawker_stall_id, format)
            hawker_stalls_list.append(hawker_stall_response)

        return hawker_stalls_list

    def getStallInfo(self, stallID, format):
        reviewManager = ReviewManager()
        
        response = self.gmaps.place(place_id = stallID)['result']
        if format:
            response = format_hawker_response(response)

        response['user_rating'] = ReviewManager.getAvgReviewRating(stallID)
        response['user_review_count'] = ReviewManager.getReviewCount(stallID)
        response['user_report_count'] = ReportManager.getReportCount(stallID)
        return response

    def getHawkerCentreLocation(self, placeID):
        hawkerCentresColl = self.db.collection('hawkercentres')
        location = hawkerCentresColl.document(placeID).get()
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

        hawkerCentresColl = self.db.collection('hawkercentres')
        hawker_centre_locations_documents = hawkerCentresColl.stream()
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

    def getHawkerCentreReviewCount(self, placeID):
        hawkerCentresColl = self.db.collection('hawkercentres')
        hawker_centre =  hawkerCentresColl.document(placeID).get().to_dict()
        if 'reviews' in hawker_centre:
            count = len(hawker_centre['reviews'])
        else:
            count = 0

        return count

    def getHawkerCentreReportCount(self, placeID):
        hawkerCentresColl = self.db.collection('hawkercentres')
        hawker_centre = hawkerCentresColl.document(placeID).get().to_dict()
        if 'reports' in hawker_centre:
            count = len(hawker_centre['reports'])
        else:
            count = 0

        return count

    def getHawkerCentreRating(self, placeID):
        hawkerCentresColl = self.db.collection('hawkercentres')
        reviewsColl = self.db.collection('reviews')
        hawker_centre = hawkerCentresColl.document(placeID).get().to_dict()
        if 'reviews' in hawker_centre:
            review_id_list = hawker_centre['reviews']
            total_rating = 0
            for review_id in review_id_list:
                review = reviewsColl.document(review_id).get().to_dict()
                total_rating += review['rating']
            return round(total_rating / len(review_id_list), 2)
        else:
            return None

        
    def getHawkerCentreCrowdedness(self, placeID):
        hawker_centre = self.db.collection('hawkercentres').document(placeID).get().to_dict()
        live_carpark_data = get_carpark_availability()['value']

        live_nearby_carparks = []
        # Get live carpark data for nearby carparks
        for live_carpark in live_carpark_data:
            carpark_coords = live_carpark['Location'].split()
            carpark_lat = float(carpark_coords[0])
            carpark_long = float(carpark_coords[1])
            distance = haversine(carpark_lat, carpark_long, hawker_centre['latitude'], hawker_centre['longitude'])
            #print(f"carpark: {carpark_lat}, {carpark_long} | hawker: {hawker_centre['latitude']}, {hawker_centre['longitude']} | distance: {distance}")
            if distance < 100:
                live_nearby_carparks.append(live_carpark)

        # Calculate the crowdedness
        total_lots = 0
        available_lots = 0
        for live_nearby_carpark in live_nearby_carparks:
            total_lots += self.db.collection('carparks').document(live_nearby_carpark['CarParkID']).get().to_dict()['TotalLots']
            available_lots += live_nearby_carpark['AvailableLots']
        if total_lots == 0:
            return 'not available'
        else:
            return available_lots / total_lots
        
    def addHawkerReview(self, centreID,reviewID):
        hawkerCentreLocationsColl = self.db.collection('hawkercentres').document(centreID).update({"reviews": firestore.ArrayUnion([reviewID])})
        return

    def deleteHawkerReview(self,centreID,reviewID):
        hawkerCentreLocationsColl = self.db.collection('hawkercentres').document(centreID).update({"reviews": firestore.ArrayRemove([reviewID])})
        return

    def addHawkerReport(self, centreID,reportID):
        hawkerCentreLocationsColl = self.db.collection('hawkercentres').document(centreID).update({"reports": firestore.ArrayUnion([reportID])})
        return

    def deleteHawkerReport(self, centreID,reportID):
        hawkerCentreLocationsColl = self.db.collection('hawkercentres').document(centreID).update({"reports": firestore.ArrayRemove([reportID])})
        return