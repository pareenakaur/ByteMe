import googlemaps
from classes.HawkerManager import HawkerManager
from flask import Blueprint, request, jsonify
from firebase_admin import firestore

db = firestore.client()
gmaps = googlemaps.Client(db.collection('admin').document('google_api_key').get().to_dict()['key'])

hawkerManager = HawkerManager(db, gmaps)

hawkersAPI = Blueprint('hawkersAPI',__name__)

@hawkersAPI.route('/getAllHawkerCentreInformation', methods=['GET'])
def getAllHawkerCentreInformation():
    filter = bool(request.args.get('filter'))
    vegetarian = request.args.get('vegetarian')
    minrating = request.args.get('minrating')

    if filter:
        hawker_centre_response = hawkerManager.getFilteredHawkerCentres(bool(vegetarian), float(minrating))
    else:
        hawker_centre_response = hawkerManager.getAllHawkerCentres()

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
    place_id =  request.args.get('id')
    format = request.args.get('format')

    if distance is None:
        return "Please provide a 'distance' query parameter", 400
    elif place_id is None:
        return "Please provide a 'place_id' query parameter", 400
    else:
        nearby_hawker_centre_details = hawkerManager.getNearbyHawkerCentres(place_id, distance, format)
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
    
@hawkersAPI.route('/updateHawkerCentreCrowdedness', methods=['GET'])
def updateHawkerCentreCrowdedness():
    try:
        hawkerManager.updateHawkerCentreCollection()
        return jsonify(True)
    
    except:
        return "Error while updating crowdedness, please try again later", 404