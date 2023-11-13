import uuid
import googlemaps
from classes.HawkerManager import HawkerManager
from flask import Blueprint, request, jsonify
from firebase_admin import firestore

db = firestore.client()
gmaps = googlemaps.Client(key='AIzaSyB4OexlmStr943doK3Cjo15V8FnSI0dNQk')

hawkerManager = HawkerManager(db, gmaps)

hawkersAPI = Blueprint('hawkersAPI',__name__)

@hawkersAPI.route('/getAllHawkerCentreInformation', methods=['GET'])
def getAllHawkerCentreInformation():
    hawker_centre_response = []
    hawkerCentresColl = db.collection('hawkercentres')
    hawker_centres_documents = hawkerCentresColl.stream()
    for hawker_centre_document in hawker_centres_documents:
        hawker_centre = hawker_centre_document.to_dict()
        hawker_centre['place_id'] = hawker_centre_document.id
        hawker_centre['crowdedness'] = hawkerManager.getHawkerCentreCrowdedness(hawker_centre_document.id)
        hawker_centre_response.append(hawker_centre)

    return jsonify(hawker_centre_response)


@hawkersAPI.route('/getHawkerCentreLocation', methods=['GET'])
def getHawkerCentreLocation():
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
    format = request.args.get('format')

    if placeID is not None:
        place_details = hawkerManager.getHawkerCentreInfo(placeID, format)
        response = jsonify(place_details)
        return response
    
    else:
        return "Please provide a 'id' query parameter", 400
    
@hawkersAPI.route('/getStallInfo', methods=['GET'])
def getStallInfo():
    placeID = request.args.get('id')
    format = request.args.get('format')

    if placeID is not None:
        place_details = hawkerManager.getStallInfo(placeID, format)
        response = jsonify(place_details)
        return response
        
    else:
        return "Please provide a 'id' query parameter", 400

@hawkersAPI.route('/getNearbyHawkerCentres', methods=['GET'])
def getNearbyHawkerCentres():
    distance = request.args.get('distance')
    longitude = request.args.get('longitude')
    latitude = request.args.get('latitude')
    format = request.args.get('format')
    user_location = {'longitude':longitude, 'latitude':latitude}

    if distance is None:
        return "Please provide a 'distance' query parameter", 400
    
    elif longitude is None:
        return "Please provide a 'longitude', query parameter", 400
    
    elif latitude is None:
        return "Please provide a 'latitude', query parameter", 400
    
    else:
        nearby_hawker_centre_details = hawkerManager.getNearbyHawkerCentres(user_location, distance, format)
        response = jsonify(nearby_hawker_centre_details)
        print(f"{len(nearby_hawker_centre_details)} nearby hawker centres found")
        return response
    
@hawkersAPI.route('/getHawkerCentreStalls', methods=['GET'])
def getHawkerCentreStalls():
    placeID = request.args.get('id')
    format = request.args.get('format')

    if placeID is None:
        return "Please provide a 'id' query parameter", 400
    
    else:
        hawker_centre_stall = hawkerManager.getHawkerCentreStalls(placeID, format)
        result = hawker_centre_stall
        #Remove the hawker centre from the list of hawkers
        filtered_result = [item for item in result if item['place_id'] != placeID]
        print(f"{len(filtered_result)} hawker stalls found")
        return jsonify(filtered_result)
    
@hawkersAPI.route('/getPlaceIDFromLatLong', methods=['GET'])
def getPlaceIDFromLatLong():
    lat = request.args.get('lat')
    long = request.args.get('long')

    if lat is None:
        return "Please provide a 'lat' query parameter", 400
    
    elif long is None:
        return "Please provide a 'long' query parameter", 400
    
    else:
        place_id = hawkerManager.getPlaceIDFromLatLong(lat, long)
        return jsonify(place_id)
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
    
        