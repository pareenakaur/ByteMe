import uuid
import googlemaps
from classes.HawkerManager import HawkerManager
from flask import Blueprint, request, jsonify
from firebase_admin import firestore

db = firestore.client()
gmaps = googlemaps.Client(key='AIzaSyB4OexlmStr943doK3Cjo15V8FnSI0dNQk')

hawkerManager = HawkerManager(db, gmaps)

hawkersAPI = Blueprint('hawkersAPI',__name__)

@hawkersAPI.route('/getHawkerCentreLocations', methods=['GET'])
def getHawkerCentreLocations():
    placeID = request.args.get('id')

    if placeID is not None:
        location = hawkerManager.getHawkerCentreLocation(placeID)
        
        if location.exists:
            response = jsonify(location.to_dict())
            return response
        
        else:
            return "No such hawker with ID found", 404
    
    else:
        return "Please provide a 'id' query parameter", 400
    
@hawkersAPI.route('/getHawkerCentreInfo', methods=['GET'])
def getHawkerCentreInfo():
    placeID = request.args.get('id')

    if placeID is not None:
        try:
            place_details = hawkerManager.getHawkerCentreInfo(placeID)
            response = jsonify(place_details['result'])
            return response

        except:
            return "No information found with such hawker ID", 404
    
    else:
        return "Please provide a 'id' query parameter", 400
    
@hawkersAPI.route('/getStallInfo', methods=['GET'])
def getStallInfo():
    placeID = request.args.get('id')

    if placeID is not None:
        try:
            place_details = hawkerManager.getHawkerCentreInfor(placeID)
            response = jsonify(place_details['result'])
            return response
        
        except:
            return "No information found with such hawker ID", 404
        
    else:
        return "Please provide a 'id' query parameter", 400

@hawkersAPI.route('/getNearbyHawkerCentres', methods=['GET'])
def getNearbyHawkerCentres():
    distance = request.args.get('distance')
    longitude = request.args.get('longitude')
    latitude = request.args.get('latitude')
    user_location = {'longitude':longitude, 'latitude':latitude}

    if distance is None:
        return "Please provide a 'distance' query parameter", 400
    
    elif longitude is None:
        return "Please provide a 'longitude', query parameter", 400
    
    elif latitude is None:
        return "Please provide a 'latitude', query parameter", 400
    
    else:
        nearby_hawker_centre_details = hawkerManager.getNearbyHawkerCentres(user_location, distance)
        response = jsonify(nearby_hawker_centre_details)
        print(f"{len(nearby_hawker_centre_details)} nearby hawker centres found")
        return response
    
@hawkersAPI.route('/getHawkerCentreStalls', methods=['GET'])
def getHawkerCentreStalls():
    placeID = request.args.get('id')

    if placeID is None:
        return "Please provide a 'id' query parameter", 400
    
    else:
        hawker_centre_stall = hawkerManager.getHawkerCentreStalls(placeID)
        result = hawker_centre_stall['results']
        
        #Remove the hawker centre from the list of hawkers
        filtered_result = [item for item in result if item.get('place_id') != placeID]
        #print(f"{len(filtered_result)} hawker stalls found")
        #for result in filtered_result:
        #    print(result['name'])
        return jsonify(filtered_result)

@hawkersAPI.route('/getFavouriteStalls', methods=['GET'])
def getFavouriteStalls():
    userID = request.args.get('id')

    if userID is None:
        return "Please provide a 'id' query parameter", 400
    
    else:
        favourite_stalls = hawkerManager.getFavouriteStalls(userID)
        return jsonify(favourite_stalls)
    
# @hawkersAPI.route('/get', methods=['GET'])
# def get():
#     try:
#         id = uuid.uuid4()
#         usersColl.document(id.hex).set(request.json)
#         return jsonify({"success": True})
#    except Exception as e:
#         return f"An Error Occured: {e}"

# @reviewsAPI.route('/add', methods=['POST'])
# def create():
#     try:
#         id = uuid.uuid4()
#         usersColl.document(id.hex).set(request.json)
#         return jsonify({"success": True})
#     except Exception as e:
#         return f"An Error Occured: {e}"
    
# @reviewsAPI.route('/list') # by hawker id
# def read():
#     try:
#         all_users = [doc.to_dict() for doc in usersColl.stream()]
#         return jsonify(all_users)
#     except Exception as e:
#         return f"An Error has Occured: {e}"
    
        